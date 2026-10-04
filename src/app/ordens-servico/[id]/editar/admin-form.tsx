'use client'

import { useState } from 'react'
import { editarOSCompleto } from '../../actions'

const STATUS_OPTIONS = ['pendente', 'produzindo', 'pronta', 'entregue', 'cancelada']

type OS = {
  id: string
  tipo: string
  quantidade: number
  material: string | null
  prazo: string | null
  descricao: string | null
  preco: number | null
  status: string
}

export default function EditarOSAdminForm({ os }: { os: OS }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setLoading(true)

    const result = await editarOSCompleto(os.id, formData)

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
            Tipo
          </label>
          <input
            name="tipo"
            type="text"
            required
            defaultValue={os.tipo}
            pattern="[A-Za-zÀ-ÿ\s]+"
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
            defaultValue={os.quantidade}
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
            defaultValue={os.material ?? ''}
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
            defaultValue={os.prazo ?? ''}
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
            defaultValue={os.descricao ?? ''}
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
            defaultValue={os.preco ?? ''}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            defaultValue={os.status}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
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