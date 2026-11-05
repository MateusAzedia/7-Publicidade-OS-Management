import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import EditarUsuarioForm from './form'

export default async function EditarUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  const { data: funcionario } = await supabase
    .from('profiles')
    .select('id, nome, role')
    .eq('id', id)
    .single()

  if (!funcionario) {
    notFound()
  }

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Editar funcionário</h1>
      <EditarUsuarioForm funcionario={funcionario} />
    </div>
  )
}