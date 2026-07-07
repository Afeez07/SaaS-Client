'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  // For the UI prototype, we bypass actual authentication
  // and send the user straight to the dashboard.
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  // For the UI prototype, we bypass actual authentication
  // and send the user straight to the dashboard.
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
