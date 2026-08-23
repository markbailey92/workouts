import { useMemo, useState } from 'react'
import {
  dayMap,
  formatDayTitle,
  monthGrid,
  monthTitle,
  streakStats,
  summarizeDay,
  weekdayLabels,
} from './calendar'
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
            <i />
            <b>{day.weekday}</b>
          </span>
        ))}
      </div>
      <p className="streak-hint">Last 14 days. Green means you finished a session.</p>
    </section>
  )
}

export function CalendarView({ done }: { done: AppState['done'] }) {
  const today = dateKey()
  const now = new Date()
  const [cursor, setCursor] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  })
  const [selected, setSelected] = useState(today)
  const byDate = useMemo(() => dayMap(done), [done])
  const cells = monthGrid(cursor.year, cursor.month)
  const selectedStatus = byDate[selected] ?? summarizeDay(done, selected)

  function shiftMonth(delta: number) {
    const next = new Date(cursor.year, cursor.month + delta, 1)
    setCursor({ year: next.getFullYear(), month: next.getMonth() })
  }

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
              setSelected(today)
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
              onClick={() => setSelected(cell.date!)}
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
        {selectedStatus.workouts.length === 0 ? (
          <p className="cal-empty">No exercises checked off this day.</p>
        ) : (
          <ul>
            {selectedStatus.workouts.map((workout) => (
              <li key={workout.id}>
                <span>{workout.title}</span>
                <span>
                  {workout.complete
                    ? 'Completed'
                    : `${workout.finished} / ${workout.total} checks`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
