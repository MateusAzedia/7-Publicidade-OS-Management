create type user_role as enum ('admin', 'funcionario');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  role user_role not null default 'funcionario',
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Todo usuário autenticado pode ver seu próprio perfil
create policy "usuarios veem seu proprio perfil"
on profiles for select
to authenticated
using (auth.uid() = id);

-- Função auxiliar: verifica se o usuário logado é admin
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Admin pode ver todos os perfis
create policy "admin ve todos os perfis"
on profiles for select
to authenticated
using (is_admin());

-- Trigger: cria o profile automaticamente quando um usuário se cadastra
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', 'Sem nome'),
    coalesce((new.raw_user_meta_data->>'role')::user_role, 'funcionario')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();