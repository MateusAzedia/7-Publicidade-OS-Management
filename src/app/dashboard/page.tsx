import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('nome, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        Olá, {profile?.nome ?? user.email}
      </h1>
      <p className="text-gray-600">Você está logado como: {profile?.role}</p>
    </div>
  )
}