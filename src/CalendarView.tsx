import { useEffect, useMemo, useState } from 'react'
import {
  dayMap,
  formatDayTitle,
  monthGrid,
  monthTitle,
  streakStats,
  summarizeDay,
  weekdayLabels,
  type DayStatus,
} from './calendar'
import { WORKOUTS } from './data/workouts'
import { dateKey, type AppState } from './storage'

function streakLabel(days: number) {
  return days === 1 ? '1 day' : `${days} days`
}

export function StreakView({ done }: { done: AppState['done'] }) {
  const stats = useMemo(() => streakStats(done), [done])
  const message = stats.todayComplete
    ? 'Session finished today. Streak is safe.'
    : stats.openToday
      ? `Do a session today to keep the ${streakLabel(stats.current)} streak.`
      : stats.current > 0
        ? 'Keep going. Finish a session together today.'
        : 'Finish a whole session together to start a streak.'

  return (
    <section className="streak" aria-label="Workout streak">
      <p className="eyebrow">Streak</p>
      <div className="streak-stats">
        <div>
          <p className="streak-value">{stats.current}</p>
          <p className="streak-label">Current</p>
        </div>
        <div>
          <p className="streak-value">{stats.best}</p>
          <p className="streak-label">Best</p>
        </div>
        <div>
          <p className="streak-value">{stats.completeDays}</p>
          <p className="streak-label">Days finished</p>
        </div>
      </div>
      <p className="streak-copy">{message}</p>
      <div className="streak-weeks" aria-hidden="true">
        {stats.last14.map((day) => (
          <span
            key={day.date}
            className={`streak-day${day.complete ? ' is-complete' : day.partial ? ' is-partial' : ''}${day.date === dateKey() ? ' is-today' : ''}`}
            title={day.date}
          >
            <i>{day.completeCount > 1 ? day.completeCount : null}</i>
            <b>{day.weekday}</b>
          </span>
        ))}
      </div>
      <p className="streak-hint">Last 14 days. Green means you finished a session.</p>
    </section>
  )
}

function workoutMinutes(id: string) {
  return WORKOUTS.find((workout) => workout.id === id)?.minutes
}

function DayWorkouts({
  status,
  onRemove,
}: {
  status: DayStatus
  onRemove: (workoutId: string, title: string) => void
}) {
  if (status.workouts.length === 0) {
    return <p className="cal-empty">No exercises checked off this day.</p>
  }

  return (
    <ul className="day-workout-list">
      {status.workouts.map((workout) => {
        const minutes = workoutMinutes(workout.id)
        return (
          <li key={workout.id}>
            <div>
              <p className="day-workout-title">{workout.title}</p>
              <p className="day-workout-meta">
                {minutes ? `${minutes} min · ` : ''}
                {workout.complete
                  ? 'Completed together'
                  : `${workout.finished} / ${workout.total} checks`}
              </p>
            </div>
            <button
              type="button"
              className="text-btn"
              onClick={() => onRemove(workout.id, workout.title)}
            >
              Remove
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function CalendarView({
  done,
  onRemoveWorkout,
}: {
  done: AppState['done']
  onRemoveWorkout: (workoutId: string, date: string, title: string) => void
}) {
  const today = dateKey()
  const now = new Date()
  const [cursor, setCursor] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  })
  const [selected, setSelected] = useState(today)
  const [sheetOpen, setSheetOpen] = useState(false)
  const byDate = useMemo(() => dayMap(done), [done])
  const cells = monthGrid(cursor.year, cursor.month)
  const selectedStatus = byDate[selected] ?? summarizeDay(done, selected)
  const sessionLabel =
    selectedStatus.completeCount > 0
      ? `${selectedStatus.completeCount} finished`
      : selectedStatus.hasActivity
        ? 'Started'
        : 'No session'

  function shiftMonth(delta: number) {
    const next = new Date(cursor.year, cursor.month + delta, 1)
    setCursor({ year: next.getFullYear(), month: next.getMonth() })
  }

  function openDay(date: string) {
    setSelected(date)
    if (window.matchMedia('(max-width: 720px)').matches) {
      setSheetOpen(true)
    }
  }

  useEffect(() => {
    if (!sheetOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSheetOpen(false)
    }
    document.body.classList.add('sheet-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('sheet-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [sheetOpen])

  return (
    <section className="calendar" aria-label="Workout calendar">
      <div className="calendar-head">
        <div>
          <p className="eyebrow">This month</p>
          <h2>{monthTitle(cursor.year, cursor.month)}</h2>
        </div>
        <div className="calendar-nav">
          <button type="button" className="nav-btn" onClick={() => shiftMonth(-1)}>
            Previous
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={() => {
              setCursor({ year: now.getFullYear(), month: now.getMonth() })
              openDay(today)
            }}
          >
            Today
          </button>
          <button type="button" className="nav-btn" onClick={() => shiftMonth(1)}>
            Next
          </button>
        </div>
      </div>

      <div className="cal-weekdays">
        {weekdayLabels().map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="cal-grid">
        {cells.map((cell, index) => {
          if (!cell.date) {
            return <span key={`empty-${index}`} className="cal-cell is-empty" />
          }
          const status = byDate[cell.date]
          const kind = status?.completeCount
            ? 'complete'
            : status?.hasActivity
              ? 'partial'
              : 'none'
          const isToday = cell.date === today
          const isSelected = cell.date === selected
          return (
            <button
              key={cell.date}
              type="button"
              className={`cal-cell is-${kind}${isToday ? ' is-today' : ''}${isSelected ? ' is-selected' : ''}`}
              onClick={() => openDay(cell.date!)}
              aria-pressed={isSelected}
              aria-label={`${formatDayTitle(cell.date)}${kind === 'complete' ? ', session completed' : kind === 'partial' ? ', started' : ', no checks'}`}
            >
              <span className="cal-num">{cell.day}</span>
              {kind !== 'none' ? <span className="cal-dot" aria-hidden="true" /> : null}
            </button>
          )
        })}
      </div>

      <div className="cal-legend">
        <span>
          <i className="swatch complete" /> Finished a session
        </span>
        <span>
          <i className="swatch partial" /> Started
        </span>
        <span>
          <i className="swatch none" /> No checks
        </span>
      </div>

      <div className="cal-detail">
        <h3>{formatDayTitle(selected)}</h3>
        <p className="day-sub">{sessionLabel}</p>
        <DayWorkouts
          status={selectedStatus}
          onRemove={(workoutId, title) =>
            onRemoveWorkout(workoutId, selected, title)
          }
        />
      </div>

      {sheetOpen ? (
        <div className="sheet-root">
          <button
            type="button"
            className="sheet-backdrop"
            aria-label="Close day details"
            onClick={() => setSheetOpen(false)}
          />
          <div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-day-title"
          >
            <div className="sheet-handle" aria-hidden="true" />
            <div className="sheet-head">
              <div>
                <p className="eyebrow">{selected === today ? 'Today' : 'Session'}</p>
                <h3 id="sheet-day-title">{formatDayTitle(selected)}</h3>
                <p className="day-sub">{sessionLabel}</p>
              </div>
              <button
                type="button"
                className="nav-btn"
                onClick={() => setSheetOpen(false)}
              >
                Close
              </button>
            </div>
            <DayWorkouts
              status={selectedStatus}
              onRemove={(workoutId, title) =>
                onRemoveWorkout(workoutId, selected, title)
              }
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
