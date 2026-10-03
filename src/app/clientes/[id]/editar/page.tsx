import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditarClienteForm from './form'

export default async function EditarClientePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: cliente } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single()

  if (!cliente) {
    notFound()
  }

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar cliente</h1>
      <EditarClienteForm cliente={cliente} />
    </div>
  )
}