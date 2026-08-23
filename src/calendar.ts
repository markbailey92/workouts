import { WORKOUTS } from './data/workouts'
import { dateKey, parseDoneKey } from './storage'

export type WorkoutDayStatus = {
  id: string
  title: string
  finished: number
  total: number
  complete: boolean
}

export type DayStatus = {
  date: string
  workouts: WorkoutDayStatus[]
  completeCount: number
  hasActivity: boolean
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function weekdayLabels() {
  return WEEKDAYS
}

export function monthTitle(year: number, monthIndex: number) {
  return new Date(year, monthIndex, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

export function formatDayTitle(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function monthGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1)
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const cells: Array<{ date: string | null; day: number | null }> = []

  for (let i = 0; i < startPad; i += 1) {
    cells.push({ date: null, day: null })
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: dateKey(new Date(year, monthIndex, day)), day })
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, day: null })
  }
  return cells
}

export function summarizeDay(done: Record<string, boolean>, date: string): DayStatus {
  const workouts = WORKOUTS.map((workout) => {
    const total = workout.exercises.length * 2
    const finished = workout.exercises.reduce((count, exercise) => {
      const a = done[`${date}|${workout.id}|${exercise.id}|a`] ? 1 : 0
      const b = done[`${date}|${workout.id}|${exercise.id}|b`] ? 1 : 0
      return count + a + b
    }, 0)
    return {
      id: workout.id,
      title: workout.title,
      finished,
      total,
      complete: finished === total && total > 0,
    }
  }).filter((workout) => workout.finished > 0)

  return {
    date,
    workouts,
    completeCount: workouts.filter((workout) => workout.complete).length,
    hasActivity: workouts.length > 0,
  }
}

export function dayMap(done: Record<string, boolean>) {
  const dates = new Set<string>()
  for (const [key, value] of Object.entries(done)) {
    if (!value) continue
    const parsed = parseDoneKey(key)
    if (parsed) dates.add(parsed.date)
  }

  const map: Record<string, DayStatus> = {}
  for (const date of dates) {
    map[date] = summarizeDay(done, date)
  }
  return map
}

export function shiftDate(date: string, days: number) {
  const [year, month, day] = date.split('-').map(Number)
  return dateKey(new Date(year, month - 1, day + days))
}

export type StreakDay = {
  date: string
  weekday: string
  complete: boolean
  partial: boolean
  completeCount: number
}

export type StreakStats = {
  current: number
  best: number
  completeDays: number
  todayComplete: boolean
  openToday: boolean
  last14: StreakDay[]
}

export function streakStats(done: Record<string, boolean>, today = dateKey()): StreakStats {
  const map = dayMap(done)
  const completeDates = new Set(
    Object.values(map)
      .filter((day) => day.completeCount > 0)
      .map((day) => day.date),
  )

  let current = 0
  const todayComplete = completeDates.has(today)
  let cursor = todayComplete ? today : shiftDate(today, -1)
  while (completeDates.has(cursor)) {
    current += 1
    cursor = shiftDate(cursor, -1)
  }

  const sorted = [...completeDates].sort()
  let best = 0
  let run = 0
  let previous: string | null = null
  for (const date of sorted) {
    run = previous && shiftDate(previous, 1) === date ? run + 1 : 1
    best = Math.max(best, run)
    previous = date
  }

  const last14: StreakDay[] = []
  for (let offset = 13; offset >= 0; offset -= 1) {
    const date = shiftDate(today, -offset)
    const [year, month, day] = date.split('-').map(Number)
    last14.push({
      date,
      weekday: new Date(year, month - 1, day).toLocaleDateString(undefined, {
        weekday: 'narrow',
      }),
      complete: completeDates.has(date),
      partial: Boolean(map[date]?.hasActivity && !map[date]?.completeCount),
      completeCount: map[date]?.completeCount ?? 0,
    })
  }

  return {
    current,
    best,
    completeDays: completeDates.size,
    todayComplete,
    openToday: !todayComplete && current > 0,
    last14,
  }
}
