import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { pruneDone, type AppState } from './storage'

const FAMILY_KEY = 'together-workouts-family-code'
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

type FamilyRow = {
  code: string
  names: AppState['names']
  done: AppState['done']
  updated_at: string
}

let client: SupabaseClient | null | undefined

export function isCloudConfigured() {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
  )
}

function getClient() {
  if (client !== undefined) return client
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  client = url && key ? createClient(url, key) : null
  return client
}

export function loadFamilyCode() {
  return localStorage.getItem(FAMILY_KEY)
}

export function saveFamilyCode(code: string | null) {
  if (code) localStorage.setItem(FAMILY_KEY, code)
  else localStorage.removeItem(FAMILY_KEY)
}

function randomCode() {
  const bytes = new Uint8Array(6)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('')
}

function asState(row: FamilyRow): AppState {
  return {
    names: {
      a: row.names?.a ?? '',
      b: row.names?.b ?? '',
    },
    done: pruneDone(row.done ?? {}),
  }
}

export async function fetchFamily(code: string) {
  const supabase = getClient()
  if (!supabase) throw new Error('Supabase is not configured.')
  const { data, error } = await supabase
    .from('family_workouts')
    .select('code, names, done, updated_at')
    .eq('code', code)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  return asState(data as FamilyRow)
}

export async function saveFamily(code: string, state: AppState) {
  const supabase = getClient()
  if (!supabase) throw new Error('Supabase is not configured.')
  const { error } = await supabase.from('family_workouts').upsert({
    code,
    names: state.names,
    done: state.done,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

export async function createFamily(state: AppState) {
  const supabase = getClient()
  if (!supabase) throw new Error('Supabase is not configured.')
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const code = randomCode()
    const { error } = await supabase.from('family_workouts').insert({
      code,
      names: state.names,
      done: state.done,
    })
    if (!error) {
      saveFamilyCode(code)
      return code
    }
    if (error.code !== '23505') throw error
  }
  throw new Error('Could not create a family code. Try again.')
}

export async function joinFamily(rawCode: string) {
  const code = rawCode.trim().toUpperCase()
  if (code.length < 4) throw new Error('Enter the family code from the other device.')
  const state = await fetchFamily(code)
  if (!state) throw new Error('No family found for that code.')
  saveFamilyCode(code)
  return { code, state }
}

export function leaveFamily() {
  saveFamilyCode(null)
}

export function watchFamily(
  code: string,
  onRow: (state: AppState) => void,
) {
  const supabase = getClient()
  if (!supabase) return () => undefined
  const channel = supabase
    .channel(`family-${code}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'family_workouts',
        filter: `code=eq.${code}`,
      },
      (payload) => {
        const row = payload.new as FamilyRow | undefined
        if (row?.code) onRow(asState(row))
      },
    )
    .subscribe()
  return () => {
    void supabase.removeChannel(channel)
  }
}
