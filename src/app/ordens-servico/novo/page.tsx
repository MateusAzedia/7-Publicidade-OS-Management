import { createClient } from '@/lib/supabase/server'
import NovaOSForm from './form'

export default async function NovaOSPage() {
  const supabase = await createClient()

  const { data: clientes } = await supabase
    .from('clientes')
    .select('id, nome')
    .order('nome')

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Nova Ordem de Serviço</h1>
      <NovaOSForm clientes={clientes ?? []} />
    </div>
  )
}