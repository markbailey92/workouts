import type { PersonId } from './data/workouts'

const KEY = 'together-workouts-v1'

export type AppState = {
  names: Record<PersonId, string>
  done: Record<string, boolean>
}

const DEFAULT_STATE: AppState = {
  names: { a: '', b: '' },
  done: {},
}

export function dateKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function doneKey(
  workoutId: string,
  exerciseId: string,
  person: PersonId,
  day = dateKey(),
) {
  return `${day}|${workoutId}|${exerciseId}|${person}`
}

export function clearWorkoutOnDay(
  done: AppState['done'],
  workoutId: string,
  day: string,
) {
  const prefix = `${day}|${workoutId}|`
  const next = { ...done }
  for (const key of Object.keys(next)) {
    if (key.startsWith(prefix)) delete next[key]
  }
  return next
}

export function parseDoneKey(key: string) {
  const date = key.slice(0, 10)
  const parts = key.slice(11).split('|')
  if (parts.length !== 3 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  const [workoutId, exerciseId, person] = parts
  if (person !== 'a' && person !== 'b') return null
  return { date, workoutId, exerciseId, person: person as PersonId }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return structuredClone(DEFAULT_STATE)
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      names: {
        a: parsed.names?.a ?? '',
        b: parsed.names?.b ?? '',
      },
      done: parsed.done ?? {},
    }
  } catch {
    return structuredClone(DEFAULT_STATE)
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}
