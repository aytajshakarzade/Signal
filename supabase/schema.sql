-- Optional profile mirror for the Signal Studio custom UI.
-- Auth identities are stored in Supabase's Authentication -> Users.
-- This table gives you a safe, non-password profile table in Table Editor.
create table if not exists public.signal_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null default '',
  profile_type text not null default 'creator',
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.signal_users enable row level security;
revoke all on table public.signal_users from anon, authenticated;
grant all on table public.signal_users to service_role;

create or replace function public.signal_sync_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.signal_users (
    id, email, name, profile_type, email_verified, created_at, updated_at
  ) values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'profile_type', 'creator'),
    new.email_confirmed_at is not null,
    coalesce(new.created_at, now()),
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    name = excluded.name,
    profile_type = excluded.profile_type,
    email_verified = excluded.email_verified,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists signal_sync_auth_user_trigger on auth.users;
create trigger signal_sync_auth_user_trigger
after insert or update on auth.users
for each row execute function public.signal_sync_auth_user();

-- Backfill accounts that existed before this trigger was created.
insert into public.signal_users (id, email, name, profile_type, email_verified, created_at, updated_at)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data ->> 'name', u.raw_user_meta_data ->> 'full_name', ''),
  coalesce(u.raw_user_meta_data ->> 'profile_type', 'creator'),
  u.email_confirmed_at is not null,
  coalesce(u.created_at, now()),
  now()
from auth.users u
on conflict (id) do update set
  email = excluded.email,
  name = excluded.name,
  profile_type = excluded.profile_type,
  email_verified = excluded.email_verified,
  updated_at = now();
