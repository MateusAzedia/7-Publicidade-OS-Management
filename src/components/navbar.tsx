import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './logout-button'

export default async function Navbar() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('nome, role')
    .eq('id', user.id)
    .single()

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="font-bold text-gray-900">7 Publicidade</span>
          <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          {profile?.role === 'admin' && (
            <Link href="/usuarios" className="text-sm text-gray-600 hover:text-gray-900">
              Funcionários
            </Link>
          )}
          <Link href="/clientes" className="text-sm text-gray-600 hover:text-gray-900">
            Clientes
          </Link>
          <Link href="/ordens-servico" className="text-sm text-gray-600 hover:text-gray-900">
            Ordens de Serviço
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {profile?.nome} ({profile?.role})
          </span>
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}