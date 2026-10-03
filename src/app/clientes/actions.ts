'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function criarCliente(formData: FormData) {
  const supabase = await createClient()

  const nome = formData.get('nome') as string
  const telefone = formData.get('telefone') as string
  const endereco = formData.get('endereco') as string

  const { error } = await supabase
    .from('clientes')
    .insert({ nome, telefone, endereco })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/clientes')
  redirect('/clientes')
}

export async function editarCliente(id: string, formData: FormData) {
  const supabase = await createClient()

  const nome = formData.get('nome') as string
  const telefone = formData.get('telefone') as string
  const endereco = formData.get('endereco') as string

  const { error } = await supabase
    .from('clientes')
    .update({ nome, telefone, endereco })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/clientes')
  redirect('/clientes')
}

export async function excluirCliente(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('clientes').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/clientes')
}