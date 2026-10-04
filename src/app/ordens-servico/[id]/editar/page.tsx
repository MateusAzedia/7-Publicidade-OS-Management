import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditarOSAdminForm from './admin-form'
import EditarOSStatusForm from './status-form'

export default async function EditarOSPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single()

  const isAdmin = profile?.role === 'admin'

  const { data: os } = await supabase
    .from('ordens_servico')
    .select('*, clientes(nome)')
    .eq('id', id)
    .single()

  if (!os) {
    notFound()
  }

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-2">
        {isAdmin ? 'Editar Ordem de Serviço' : 'Atualizar Status'}
      </h1>
      <p className="text-gray-600 mb-6">
        Cliente: {(os.clientes as { nome: string } | null)?.nome}
      </p>

      {isAdmin ? (
        <EditarOSAdminForm os={os} />
      ) : (
        <EditarOSStatusForm os={os} />
      )}
    </div>
  )
}