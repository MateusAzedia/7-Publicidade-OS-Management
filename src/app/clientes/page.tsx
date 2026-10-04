import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { excluirCliente } from './actions'

export default async function ClientesPage() {
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

  const isAdmin = profile?.role === 'admin'

  const { data: clientes, error } = await supabase
    .from('clientes')
    .select('*')
    .order('nome')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        {isAdmin && (
          <Link
            href="/clientes/novo"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Novo cliente
          </Link>
        )}
      </div>

      {error && (
        <p className="rounded bg-red-50 p-3 text-red-600">
          Erro ao carregar clientes: {error.message}
        </p>
      )}

      {!error && clientes?.length === 0 && (
        <p className="text-gray-500">Nenhum cliente cadastrado ainda.</p>
      )}

      {clientes && clientes.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="py-2">Nome</th>
              <th className="py-2">Telefone</th>
              <th className="py-2">Endereço</th>
              {isAdmin && <th className="py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-b">
                <td className="py-3">{cliente.nome}</td>
                <td className="py-3">{cliente.telefone}</td>
                <td className="py-3">{cliente.endereco}</td>
                {isAdmin && (
                  <td className="py-3 text-right space-x-3">
                    <Link
                      href={`/clientes/${cliente.id}/editar`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <form
                      action={excluirCliente.bind(null, cliente.id)}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Excluir
                      </button>
                    </form>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}