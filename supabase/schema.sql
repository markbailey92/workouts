-- Run this in the Supabase SQL editor (free project is enough).

create table if not exists family_workouts (
  code text primary key,
  names jsonb not null default '{"a":"","b":""}'::jsonb,
  done jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table family_workouts enable row level security;

drop policy if exists "anon read write by code" on family_workouts;
create policy "anon read write by code"
  on family_workouts
  for all
  to anon
  using (true)
  with check (true);

alter table family_workouts replica identity full;

do $$
begin
  begin
    execute 'alter publication supabase_realtime add table family_workouts';
  exception
    when duplicate_object then null;
  end;
end $$;
