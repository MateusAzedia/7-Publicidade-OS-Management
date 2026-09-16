-- Status continua como lista fechada (fluxo operacional fixo)
create type status_os as enum ('pendente', 'produzindo', 'pronta', 'entregue', 'cancelada');

-- Tabela de ordens de serviço
create table ordens_servico (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references clientes(id) on delete restrict,
  tipo text not null check (tipo = lower(tipo) and tipo ~ '^[[:alpha:] ]+$'),
  quantidade integer not null check (quantidade > 0),
  material text,
  prazo date,
  descricao text,
  preco numeric(10, 2),
  status status_os not null default 'pendente',
  created_at timestamptz not null default now()
);

-- Ativa RLS (sem políticas ainda — isso vem na Fase 6)
alter table ordens_servico enable row level security;