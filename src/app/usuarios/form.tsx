'use client'

import { useState } from 'react'
import { criarUsuario } from './actions'

const SENHA_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

export default function NovoUsuarioForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)

    const password = formData.get('password') as string
    if (!SENHA_REGEX.test(password)) {
      setError('Senha precisa ter 8+ caracteres, 1 maiúscula e 1 caractere especial.')
      return
    }

    setLoading(true)
    const result = await criarUsuario(formData)
    setLoading(false)

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <>
      {error && (
        <p className="rounded bg-red-50 p-3 text-red-600 mb-4">{error}</p>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            name="nome"
            type="text"
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
          <p className="mt-1 text-xs text-gray-500">
            Mínimo 8 caracteres, 1 maiúscula e 1 caractere especial.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Papel</label>
          <select
            name="role"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="funcionario">Funcionário</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Criando...' : 'Criar usuário'}
        </button>
      </form>
    </>
  )
}