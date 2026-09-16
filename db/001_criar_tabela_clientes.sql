-- Tabela de clientes
create table clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text not null,
  endereco text,
  created_at timestamptz not null default now()
);

-- Ativa RLS (sem políticas ainda — isso vem na Fase 6)
alter table clientes enable row level security;