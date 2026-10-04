'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function criarOS(formData: FormData) {
  const supabase = await createClient()

  const cliente_id = formData.get('cliente_id') as string
  const tipo = (formData.get('tipo') as string).toLowerCase().trim()
  const quantidade = Number(formData.get('quantidade'))
  const material = formData.get('material') as string
  const prazo = formData.get('prazo') as string
  const descricao = formData.get('descricao') as string
  const precoRaw = formData.get('preco') as string
  const preco = precoRaw ? Number(precoRaw) : null

  const { error } = await supabase.from('ordens_servico').insert({
    cliente_id,
    tipo,
    quantidade,
    material: material || null,
    prazo: prazo || null,
    descricao: descricao || null,
    preco,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/ordens-servico')
  redirect('/ordens-servico')
}

export async function editarOSCompleto(id: string, formData: FormData) {
  const supabase = await createClient()

  const tipo = (formData.get('tipo') as string).toLowerCase().trim()
  const quantidade = Number(formData.get('quantidade'))
  const material = formData.get('material') as string
  const prazo = formData.get('prazo') as string
  const descricao = formData.get('descricao') as string
  const precoRaw = formData.get('preco') as string
  const preco = precoRaw ? Number(precoRaw) : null
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('ordens_servico')
    .update({
      tipo,
      quantidade,
      material: material || null,
      prazo: prazo || null,
      descricao: descricao || null,
      preco,
      status,
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/ordens-servico')
  redirect('/ordens-servico')
}

export async function atualizarStatus(id: string, formData: FormData) {
  const supabase = await createClient()

  const status = formData.get('status') as string

  const { error } = await supabase
    .from('ordens_servico')
    .update({ status })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/ordens-servico')
  redirect('/ordens-servico')
}

export async function excluirOS(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('ordens_servico').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/ordens-servico')
}