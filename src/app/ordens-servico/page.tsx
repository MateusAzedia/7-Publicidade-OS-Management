import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { excluirOS } from './actions'

const STATUS_LABELS: Record<string, string> = {
  pendente: 'Pendente',
  produzindo: 'Produzindo',
  pronta: 'Pronta',
  entregue: 'Entregue',
  cancelada: 'Cancelada',
}

const STATUS_COLORS: Record<string, string> = {
  pendente: 'bg-gray-100 text-gray-700',
  produzindo: 'bg-blue-100 text-blue-700',
  pronta: 'bg-green-100 text-green-700',
  entregue: 'bg-emerald-100 text-emerald-700',
  cancelada: 'bg-red-100 text-red-700',
}

export default async function OrdensServicoPage() {
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

  const { data: ordens, error } = await supabase
    .from('ordens_servico')
    .select('*, clientes(nome)')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ordens de Serviço</h1>
        {isAdmin && (
          <Link
            href="/ordens-servico/novo"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + Nova OS
          </Link>
        )}
      </div>

      {error && (
        <p className="rounded bg-red-50 p-3 text-red-600">
          Erro ao carregar ordens: {error.message}
        </p>
      )}

      {!error && ordens?.length === 0 && (
        <p className="text-gray-500">Nenhuma ordem de serviço cadastrada.</p>
      )}

      {ordens && ordens.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-sm text-gray-500">
              <th className="py-2">Cliente</th>
              <th className="py-2">Tipo</th>
              <th className="py-2">Qtd</th>
              <th className="py-2">Prazo</th>
              <th className="py-2">Status</th>
              {isAdmin && <th className="py-2">Preço</th>}
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {ordens.map((os) => (
              <tr key={os.id} className="border-b">
                <td className="py-3">{(os.clientes as { nome: string } | null)?.nome ?? '—'}</td>
                <td className="py-3 capitalize">{os.tipo}</td>
                <td className="py-3">{os.quantidade}</td>
                <td className="py-3">
                  {os.prazo
                    ? new Date(os.prazo).toLocaleDateString('pt-BR')
                    : '—'}
                </td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${STATUS_COLORS[os.status]}`}
                  >
                    {STATUS_LABELS[os.status]}
                  </span>
                </td>
                {isAdmin && (
                  <td className="py-3">
                    {os.preco
                      ? `R$ ${Number(os.preco).toFixed(2)}`
                      : '—'}
                  </td>
                )}
                <td className="py-3 text-right space-x-3">
                  <Link
                    href={`/ordens-servico/${os.id}/editar`}
                    className="text-blue-600 hover:underline"
                  >
                    {isAdmin ? 'Editar' : 'Status'}
                  </Link>
                  {isAdmin && (
                    <form
                      action={excluirOS.bind(null, os.id)}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Excluir
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}