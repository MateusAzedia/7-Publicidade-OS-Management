-- CLIENTES: todo usuário autenticado pode ler
create policy "autenticados leem clientes"
on clientes for select
to authenticated
using (true);

-- CLIENTES: só admin cria
create policy "admin cria clientes"
on clientes for insert
to authenticated
with check (is_admin());

-- CLIENTES: só admin edita
create policy "admin edita clientes"
on clientes for update
to authenticated
using (is_admin());

-- CLIENTES: só admin exclui
create policy "admin exclui clientes"
on clientes for delete
to authenticated
using (is_admin());

-- ORDENS_SERVICO: todo usuário autenticado pode ler
create policy "autenticados leem os"
on ordens_servico for select
to authenticated
using (true);

-- ORDENS_SERVICO: só admin cria
create policy "admin cria os"
on ordens_servico for insert
to authenticated
with check (is_admin());

-- ORDENS_SERVICO: admin edita qualquer campo;
-- funcionário só pode mudar o status (preco, tipo, etc. ficam travados pra ele)
create policy "admin edita os completo"
on ordens_servico for update
to authenticated
using (is_admin())
with check (is_admin());

create policy "funcionario edita status da os"
on ordens_servico for update
to authenticated
using (not is_admin())
with check (
  not is_admin()
  and cliente_id = (select cliente_id from ordens_servico os where os.id = id)
  and tipo = (select tipo from ordens_servico os where os.id = id)
  and quantidade = (select quantidade from ordens_servico os where os.id = id)
  and material is not distinct from (select material from ordens_servico os where os.id = id)
  and prazo is not distinct from (select prazo from ordens_servico os where os.id = id)
  and descricao is not distinct from (select descricao from ordens_servico os where os.id = id)
  and preco is not distinct from (select preco from ordens_servico os where os.id = id)
);

-- ORDENS_SERVICO: só admin exclui
create policy "admin exclui os"
on ordens_servico for delete
to authenticated
using (is_admin());