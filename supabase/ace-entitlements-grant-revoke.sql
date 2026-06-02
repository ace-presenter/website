-- ACE Suite — entitlement grant/revoke functions (REFERENCE)
--
-- ⚠️ This is a REFERENCE, not a blind migration. You already have a working
-- `ace_resolve_entitlements(p_uid)` and an entitlements table (the live demo
-- returns rows from it). DO NOT re-run the table / resolve definitions below if
-- they'd clobber yours — adapt the table name + columns in the grant/revoke
-- functions to YOUR existing schema.
--
-- The ONE thing that must be exact: these function signatures, because the site
-- already calls them (src/lib/grants.ts → src/app/api/stripe/webhook):
--
--   ace_grant_entitlement(p_uid uuid, p_product text, p_tier text, p_status text,
--                         p_stripe_customer text, p_stripe_subscription text,
--                         p_period_end timestamptz) returns void
--   ace_revoke_entitlement(p_uid uuid, p_product text) returns void
--
-- Subject-agnostic model (per the architecture discussion): an entitlement
-- belongs to a USER or an ORG; resolve = personal ∪ orgs-I-belong-to. The grant
-- below writes a user-subject row; for org plans, route p_uid → the org the
-- payer administers before inserting an org-subject row.

-- ── Schema (skip if you already have an equivalent table) ──────────────────────
create table if not exists public.ace_entitlements (
  id                     uuid primary key default gen_random_uuid(),
  subject_type           text not null check (subject_type in ('user','org')),
  subject_id             uuid not null,
  product                text not null check (product in ('presenter','world','schedule','notes','manager')),
  tier                   text not null default 'free',
  status                 text not null default 'active',
  stripe_customer_id     text,
  stripe_subscription_id text,
  expires_at             timestamptz,
  updated_at             timestamptz not null default now(),
  unique (subject_type, subject_id, product)
);

create table if not exists public.ace_org_members (
  org_id  uuid not null,
  user_id uuid not null,
  role    text not null default 'member',
  primary key (org_id, user_id)
);

-- ── Resolve (reference — only replace if yours matches this output shape) ──────
-- Output columns must stay { product, tier, status, expires_at } — the site maps
-- them in src/lib/entitlements.ts.
create or replace function public.ace_resolve_entitlements(p_uid uuid)
returns table (product text, tier text, status text, expires_at timestamptz)
language sql security definer set search_path = public as $$
  select e.product, e.tier, e.status, e.expires_at
  from public.ace_entitlements e
  where e.status = 'active'
    and (
      (e.subject_type = 'user' and e.subject_id = p_uid)
      or (e.subject_type = 'org' and e.subject_id in (
            select m.org_id from public.ace_org_members m where m.user_id = p_uid))
    );
$$;

-- ── Grant (upsert) — called from the Stripe subscription.created/.updated webhook
create or replace function public.ace_grant_entitlement(
  p_uid                uuid,
  p_product            text,
  p_tier               text,
  p_status             text,
  p_stripe_customer    text,
  p_stripe_subscription text,
  p_period_end         timestamptz
) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.ace_entitlements
    (subject_type, subject_id, product, tier, status,
     stripe_customer_id, stripe_subscription_id, expires_at, updated_at)
  values
    ('user', p_uid, p_product, coalesce(p_tier, 'free'), coalesce(p_status, 'active'),
     p_stripe_customer, p_stripe_subscription, p_period_end, now())
  on conflict (subject_type, subject_id, product) do update
    set tier                   = excluded.tier,
        status                 = excluded.status,
        stripe_customer_id     = excluded.stripe_customer_id,
        stripe_subscription_id = excluded.stripe_subscription_id,
        expires_at             = excluded.expires_at,
        updated_at             = now();
end;
$$;

-- ── Revoke (mark inactive) — called from subscription.deleted ─────────────────
create or replace function public.ace_revoke_entitlement(p_uid uuid, p_product text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  update public.ace_entitlements
    set status = 'inactive', updated_at = now()
    where subject_type = 'user' and subject_id = p_uid and product = p_product;
end;
$$;

-- Grant execute to the service role (the webhook calls these with the service key).
grant execute on function public.ace_grant_entitlement(uuid,text,text,text,text,text,timestamptz) to service_role;
grant execute on function public.ace_revoke_entitlement(uuid,text) to service_role;
