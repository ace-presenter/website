-- ACE launch waitlist
-- ---------------------------------------------------------------------------
-- Run once in the Supabase SQL editor (project bbphvwgwmqffzdbtivmg).
-- Backs the /waitlist page + /api/waitlist route. Writes go through the
-- site's service-role client (bypasses RLS); no anon/auth access is granted,
-- so email addresses are never readable from the browser.

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text,
  -- which product / list they're waiting on: presenter, windows, world, suite…
  product     text not null default 'presenter',
  -- free-form interest tags chosen on the form (e.g. "Windows version")
  interests   text[] not null default '{}',
  -- where the signup happened (page path / campaign)
  source      text,
  user_agent  text,
  created_at  timestamptz not null default now(),
  -- one row per (person, list); re-submitting updates interests + timestamp
  unique (email, product)
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_product_idx    on public.waitlist (product);

-- RLS on, no policies: only the service role (server-side) can read/write.
alter table public.waitlist enable row level security;
