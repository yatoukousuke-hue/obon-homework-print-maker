-- MVP production schema. Run this in the Supabase SQL editor.
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
  grade smallint not null check (grade between 1 and 6), subject text not null, difficulty text not null,
  volume text not null, purpose text not null, selected_units jsonb not null default '[]'::jsonb,
  notes text, generated_print_content jsonb, status text not null default 'generated' check (status in ('generated','reviewed','edited','downloaded'))
);
create table if not exists public.units (
  id uuid primary key default gen_random_uuid(), grade smallint not null, subject text not null, name text not null,
  available_month smallint not null, available_by_obon boolean not null default true, prerequisites jsonb not null default '[]'::jsonb,
  difficulty_level text not null default '標準', description text
);
create table if not exists public.problem_templates (
  id uuid primary key default gen_random_uuid(), grade smallint not null, subject text not null, unit_name text not null,
  difficulty text not null, problem_type text not null, template_text text not null, answer_template text, explanation_template text
);
create table if not exists public.admins (id uuid primary key references auth.users(id), email text unique not null, role text not null default 'admin', created_at timestamptz not null default now());
alter table public.requests enable row level security; alter table public.units enable row level security; alter table public.problem_templates enable row level security;
create policy "units public read" on public.units for select using (true);
-- Add authenticated admin policies after configuring Supabase Auth.
