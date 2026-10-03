'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError('Email ou senha incorretos.')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow"
      >
        <h1 className="text-xl font-bold text-gray-900">
          7 Publicidade — Login
        </h1>

        {error && (
          <p className="rounded bg-red-50 p-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <a
          href="/recuperar-senha"
          className="block text-center text-sm text-blue-600 hover:underline"
        >
          Esqueci minha senha
        </a>
      </form>
    </div>
  )
}