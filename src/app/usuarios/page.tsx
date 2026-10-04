import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import NovoUsuarioForm from './form'
import { excluirUsuario } from './actions'

export default async function UsuariosPage() {
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

  const { data: funcionarios } = await supabase
    .from('profiles')
    .select('id, nome, role, created_at')
    .order('nome')

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Funcionários</h1>

      <table className="w-full border-collapse mb-8">
        <thead>
          <tr className="border-b text-left text-sm text-gray-500">
            <th className="py-2">Nome</th>
            <th className="py-2">Papel</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {funcionarios?.map((f) => (
            <tr key={f.id} className="border-b">
              <td className="py-3">{f.nome}</td>
              <td className="py-3 capitalize">{f.role}</td>
              <td className="py-3 text-right space-x-3">
                <Link
                  href={`/usuarios/${f.id}/editar`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                {f.id !== user.id && (
                  <form action={excluirUsuario.bind(null, f.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      Excluir
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mb-4">Novo funcionário</h2>
      <NovoUsuarioForm />
    </div>
  )
}