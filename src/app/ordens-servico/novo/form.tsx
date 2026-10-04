'use client'

import { useState } from 'react'
import { criarOS } from '../actions'

type Cliente = { id: string; nome: string }

export default function NovaOSForm({ clientes }: { clientes: Cliente[] }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setLoading(true)

    const result = await criarOS(formData)

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
            Cliente
          </label>
          <select
            name="cliente_id"
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo (ex: banner, flyer, cartão pessoal)
          </label>
          <input
            name="tipo"
            type="text"
            required
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Apenas letras e espaços, sem números ou símbolos"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantidade
          </label>
          <input
            name="quantidade"
            type="number"
            min="1"
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Material
          </label>
          <input
            name="material"
            type="text"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prazo
          </label>
          <input
            name="prazo"
            type="date"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            name="descricao"
            rows={3}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preço (R$)
          </label>
          <input
            name="preco"
            type="number"
            step="0.01"
            min="0"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </>
  )
}