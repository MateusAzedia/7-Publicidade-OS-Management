alter table ordens_servico
add constraint prazo_nao_pode_ser_passado
check (prazo is null or prazo >= created_at::date);