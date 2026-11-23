-- Esquire Diversity website leads, in their own `esquire` schema.
-- Run once in the kitchenandall Supabase project: Dashboard > SQL Editor > New query > paste > Run.
-- Safe to re-run (uses IF NOT EXISTS / DROP POLICY IF EXISTS).

create schema if not exists esquire;

create table if not exists esquire.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  status        text not null default 'new',   -- for follow-up: new / contacted / site_visit / quoted / won / lost
  name          text not null,
  phone         text not null,
  service       text,
  property_type text,
  budget_range  text,
  timeline      text,
  site_location text,                           -- area / estate, e.g. "Kileleshwa"
  notes         text,
  page_path     text,                           -- page the form was sent from
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text
);

create index if not exists leads_created_at_idx on esquire.leads (created_at desc);

-- Security: the website (anon/publishable key) may ONLY insert. It can never read, edit or delete leads.
-- Read leads in the Supabase dashboard (Table Editor > schema "esquire").
alter table esquire.leads enable row level security;

grant usage on schema esquire to anon, authenticated, service_role;
revoke all on esquire.leads from anon, authenticated;
grant insert on esquire.leads to anon;
grant all on esquire.leads to service_role;

drop policy if exists "website can insert leads" on esquire.leads;
create policy "website can insert leads"
  on esquire.leads
  for insert
  to anon
  with check (
    status = 'new'
    and char_length(name) between 1 and 120
    and char_length(phone) between 7 and 30
    and coalesce(char_length(notes), 0) <= 2000
  );
