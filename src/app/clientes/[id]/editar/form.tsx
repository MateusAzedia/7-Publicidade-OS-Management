'use client'

import { useState } from 'react'
import { editarCliente } from '../../actions'

type Cliente = {
  id: string
  nome: string
  telefone: string
  endereco: string | null
}

export default function EditarClienteForm({ cliente }: { cliente: Cliente }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setLoading(true)

    const result = await editarCliente(cliente.id, formData)

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
          <label className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            name="nome"
            type="text"
            required
            defaultValue={cliente.nome}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            name="telefone"
            type="text"
            required
            defaultValue={cliente.telefone}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Endereço
          </label>
          <input
            name="endereco"
            type="text"
            defaultValue={cliente.endereco ?? ''}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>
    </>
  )
}