-- Remove a policy problemática
drop policy "funcionario edita status da os" on ordens_servico;

-- Policy mais simples: funcionário pode tentar atualizar (trigger valida os campos)
create policy "funcionario atualiza os"
on ordens_servico for update
to authenticated
using (not is_admin())
with check (not is_admin());

-- Trigger: bloqueia funcionário de mudar qualquer campo que não seja status
create or replace function check_funcionario_so_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_admin() then
    if new.cliente_id is distinct from old.cliente_id
       or new.tipo is distinct from old.tipo
       or new.quantidade is distinct from old.quantidade
       or new.material is distinct from old.material
       or new.prazo is distinct from old.prazo
       or new.descricao is distinct from old.descricao
       or new.preco is distinct from old.preco
    then
      raise exception 'Funcionário só pode alterar o status da OS';
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_funcionario_so_status
  before update on ordens_servico
  for each row execute function check_funcionario_so_status();