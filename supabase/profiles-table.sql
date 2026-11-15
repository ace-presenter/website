-- ACE Suite — user profiles table
--
-- Stores extended user info collected at sign-up (organization, city, country).
-- Linked 1:1 to auth.users; row is auto-created on user creation via trigger.
-- Run once in the ACE Account Supabase project (SQL editor or migration).

-- ── Table ────────────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  full_name    text,
  organization text,            -- church, ministry, school, nonprofit, etc.
  city         text,
  country      text,
  phone        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Re-runnable: add phone to installs created before it existed.
-- Re-runnable: every column the sign-up trigger writes. The live table once
-- lacked "organization" (2026-11-15) and every sign-up failed with
-- "Database error saving new user".
alter table public.profiles add column if not exists full_name    text;
alter table public.profiles add column if not exists organization text;
alter table public.profiles add column if not exists city         text;
alter table public.profiles add column if not exists country      text;
alter table public.profiles add column if not exists phone        text;

-- ── Row-level security ────────────────────────────────────────────────────────

alter table public.profiles enable row level security;

-- Policies are dropped first so this file is safe to re-run (CREATE POLICY
-- has no IF NOT EXISTS).

-- Users can read and update their own profile.
drop policy if exists "profiles: own read" on public.profiles;
create policy "profiles: own read"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles: own update" on public.profiles;
create policy "profiles: own update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Service role (webhooks, edge functions) can do anything.
drop policy if exists "profiles: service role full access" on public.profiles;
create policy "profiles: service role full access"
  on public.profiles
  using (auth.role() = 'service_role');

-- ── Auto-create profile on user sign-up ──────────────────────────────────────
-- Copies full_name / organization / city / country from raw_user_meta_data
-- (populated by supabase.auth.signUp options.data on the client).

create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  -- Saving the extra details must never block a new account: a failure here
  -- used to abort the whole sign-up. It is logged as a warning instead.
  begin
  insert into public.profiles (id, full_name, organization, city, country, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'organization',
    new.raw_user_meta_data ->> 'city',
    new.raw_user_meta_data ->> 'country',
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;
  exception when others then
    raise warning 'handle_new_user: profile not saved for %: %', new.id, sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── updated_at maintenance ────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ── Service-role helpers ─────────────────────────────────────────────────────
-- Grant read access so entitlements queries can join profiles if needed.

grant select, insert, update on public.profiles to service_role;
