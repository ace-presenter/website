-- ACE Suite — entitlement grant/revoke functions
--
-- Matched to the real ACE Account schema:
--   entitlements(id, subject_type entitlement_subject, subject_id uuid, product text,
--                tier text, status entitlement_status, source text, external_ref text,
--                started_at, expires_at, created_at, updated_at)
--   status enum: active | trialing | past_due | cancelled | expired
--   members(org_id, uid); organizations(id, plan, status, trial_*)  -- 'manager' is derived
--
-- Called by the site (src/lib/grants.ts → src/app/api/stripe/webhook). Signatures
-- are exact — do not rename params. Paste-and-run as-is.

-- Unique key for upserts (the table only had PK(id)).
create unique index if not exists entitlements_subject_product_uniq
  on public.entitlements (subject_type, subject_id, product);

-- GRANT — subscription.created/.updated. Writes per-user products only; manager
-- is derived from organizations.plan in ace_resolve_entitlements, so skip it here.
create or replace function public.ace_grant_entitlement(
  p_uid                 uuid,
  p_product             text,
  p_tier                text,
  p_status              text,
  p_stripe_customer     text,
  p_stripe_subscription text,
  p_period_end          timestamptz
) returns void
language plpgsql security definer set search_path = public as $$
declare v_status entitlement_status;
begin
  if p_product = 'manager' then return; end if;

  v_status := case lower(coalesce(p_status,'active'))
    when 'active'    then 'active'
    when 'trialing'  then 'trialing'
    when 'past_due'  then 'past_due'
    when 'canceled'  then 'cancelled'   -- Stripe uses one L
    when 'cancelled' then 'cancelled'
    when 'expired'   then 'expired'
    else 'active'
  end::entitlement_status;

  insert into public.entitlements
    (subject_type, subject_id, product, tier, status, source, external_ref, expires_at, updated_at)
  values
    ('user'::entitlement_subject, p_uid, p_product, coalesce(p_tier,'free'),
     v_status, 'stripe', p_stripe_subscription, p_period_end, now())
  on conflict (subject_type, subject_id, product) do update
    set tier = excluded.tier, status = excluded.status,
        source = excluded.source, external_ref = excluded.external_ref,
        expires_at = excluded.expires_at, updated_at = now();
end; $$;

-- REVOKE — subscription.deleted.
create or replace function public.ace_revoke_entitlement(p_uid uuid, p_product text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_product = 'manager' then return; end if;
  update public.entitlements
     set status = 'cancelled'::entitlement_status, updated_at = now()
   where subject_type = 'user' and subject_id = p_uid and product = p_product;
end; $$;

grant execute on function public.ace_grant_entitlement(uuid,text,text,text,text,text,timestamptz) to service_role;
grant execute on function public.ace_revoke_entitlement(uuid,text) to service_role;
