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

