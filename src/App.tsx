import { useEffect, useMemo, useRef, useState } from 'react'
import {
  WORKOUTS,
  getWorkout,
  youtubeThumb,
  type Exercise,
  type PersonId,
  type Workout,
} from './data/workouts'
import { CalendarView, StreakView } from './CalendarView'
import { CloudSave } from './CloudSave'
import { ConfettiCannons } from './Confetti'
import { VideoPlayer } from './VideoPlayer'
import { formatDayTitle } from './calendar'
import {
  fetchFamily,
  isCloudConfigured,
  loadFamilyCode,
  saveFamily,
  watchFamily,
} from './cloud'
import { clearWorkoutOnDay, doneKey, loadState, saveState, type AppState } from './storage'
import './App.css'

function displayName(names: AppState['names'], person: PersonId) {
  if (person === 'a') return names.a.trim() || 'Parent'
  return names.b.trim() || 'Kid'
}

function ExerciseRow({
  workout,
  exercise,
  names,
  done,
  onToggle,
}: {
  workout: Workout
  exercise: Exercise
  names: AppState['names']
  done: AppState['done']
  onToggle: (exerciseId: string, person: PersonId) => void
}) {
  const [showVideo, setShowVideo] = useState(false)
  const aDone = Boolean(done[doneKey(workout.id, exercise.id, 'a')])
  const bDone = Boolean(done[doneKey(workout.id, exercise.id, 'b')])
  const both = aDone && bDone

  return (
    <article className={`exercise${both ? ' exercise-done' : ''}`}>
      <div className="exercise-top">
        <div>
          <h3>{exercise.name}</h3>
          <p className="dose">{exercise.dose}</p>
        </div>
        <button
          type="button"
          className="text-btn"
          onClick={() => setShowVideo((value) => !value)}
          aria-expanded={showVideo}
        >
          {showVideo ? 'Hide how-to' : 'How to do it'}
        </button>
      </div>
      <p className="cue">{exercise.cue}</p>
      <p className="easier">
        <span>Easier option:</span> {exercise.easier}
      </p>
      {showVideo ? (
        <VideoPlayer
          videoId={exercise.howTo.videoId}
          start={exercise.howTo.start}
          title={`How to do ${exercise.name}`}
        />
      ) : null}
      <div className="checks">
        <button
          type="button"
          className={`check check-a${aDone ? ' is-on' : ''}`}
          onClick={() => onToggle(exercise.id, 'a')}
          aria-pressed={aDone}
        >
          <span className="check-mark" aria-hidden="true">
            {aDone ? '✓' : ''}
          </span>
          {displayName(names, 'a')}
        </button>
        <button
          type="button"
          className={`check check-b${bDone ? ' is-on' : ''}`}
          onClick={() => onToggle(exercise.id, 'b')}
          aria-pressed={bDone}
        >
          <span className="check-mark" aria-hidden="true">
            {bDone ? '✓' : ''}
          </span>
          {displayName(names, 'b')}
        </button>
      </div>
    </article>
  )
}

function WorkoutView({
  workout,
  state,
  onToggle,
  onComplete,
  onReset,
  onBack,
}: {
  workout: Workout
  state: AppState
  onToggle: (exerciseId: string, person: PersonId) => void
  onComplete: () => void
  onReset: () => void
  onBack: () => void
}) {
  const [showFollow, setShowFollow] = useState(true)
  const [celebrateOpen, setCelebrateOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const totalSlots = workout.exercises.length * 2
  const finished = workout.exercises.reduce((count, exercise) => {
    const a = state.done[doneKey(workout.id, exercise.id, 'a')] ? 1 : 0
    const b = state.done[doneKey(workout.id, exercise.id, 'b')] ? 1 : 0
    return count + a + b
  }, 0)
  const bothComplete = finished === totalSlots
  const percent = Math.round((finished / totalSlots) * 100)
  const parentName = displayName(state.names, 'a')
  const kidName = displayName(state.names, 'b')

  useEffect(() => {
    if (!celebrateOpen) return
    closeRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setCelebrateOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [celebrateOpen])

  function finishSession() {
    onComplete()
    setCelebrateOpen(true)
  }

  return (
    <div className="page">
      <header className="topbar">
        <button type="button" className="text-btn" onClick={onBack}>
          All workouts
        </button>
        <button type="button" className="text-btn" onClick={onReset}>
          {finished > 0 ? 'Undo this session' : 'Reset today'}
        </button>
      </header>

      <section className="hero-block">
        <p className="eyebrow">{workout.minutes} minutes · same moves</p>
        <h1>{workout.title}</h1>
        <p className="lede">{workout.blurb}</p>
        <div className="progress-meta">
          <span>
            {finished} / {totalSlots} checks
          </span>
          <span>{percent}%</span>
        </div>
        <div className="progress-track" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        {bothComplete ? (
          <p className="celebrate">You both finished this one. Nice work.</p>
        ) : null}
      </section>

      <section className="follow">
        <div className="follow-head">
          <div>
            <h2>Follow-along workout</h2>
            <p>{workout.followAlongTitle}</p>
          </div>
          <button
            type="button"
            className="text-btn"
            onClick={() => setShowFollow((value) => !value)}
          >
            {showFollow ? 'Hide' : 'Show'}
          </button>
        </div>
        {showFollow ? (
          <VideoPlayer
            videoId={workout.followAlongId}
            title={workout.followAlongTitle}
            large
          />
        ) : null}
      </section>

      <section className="list">
        <h2>Do these together</h2>
        <p className="list-note">
          These are the moves in the video above, in the same order.
        </p>
        {workout.exercises.map((exercise) => (
          <ExerciseRow
            key={exercise.id}
            workout={workout}
            exercise={exercise}
            names={state.names}
            done={state.done}
            onToggle={onToggle}
          />
        ))}
      </section>

      <section className="finish">
        <button type="button" className="finish-btn" onClick={finishSession}>
          {bothComplete ? 'Celebrate again' : 'We finished this'}
        </button>
        <p className="finish-note">
          Marks the whole session done for both of you, then fires the cannons.
        </p>
      </section>

      {celebrateOpen ? (
        <div
          className="celebrate-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="celebrate-title"
        >
          <ConfettiCannons />
          <div className="celebrate-card">
            <p className="eyebrow">Session complete</p>
            <h2 id="celebrate-title">You crushed it</h2>
            <p>
              {parentName} and {kidName} finished {workout.title}. High five.
            </p>
            <button
              ref={closeRef}
              type="button"
              className="finish-btn finish-btn-card"
              onClick={() => setCelebrateOpen(false)}
            >
              Nice one
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Home({
  state,
  familyCode,
  cloudStatus,
  onNames,
  onFamily,
  onRemoveWorkout,
  onOpen,
}: {
  state: AppState
  familyCode: string | null
  cloudStatus: string
  onNames: (person: PersonId, value: string) => void
  onFamily: (code: string | null, next?: AppState) => void
  onRemoveWorkout: (workoutId: string, date: string, title: string) => void
  onOpen: (id: string) => void
}) {
  const todayCounts = useMemo(() => {
    return WORKOUTS.map((workout) => {
      const total = workout.exercises.length * 2
      const finished = workout.exercises.reduce((count, exercise) => {
        const a = state.done[doneKey(workout.id, exercise.id, 'a')] ? 1 : 0
        const b = state.done[doneKey(workout.id, exercise.id, 'b')] ? 1 : 0
        return count + a + b
      }, 0)
      return { id: workout.id, finished, total }
    })
  }, [state.done])

  return (
    <div className="page">
      <header className="home-header">
        <p className="eyebrow">Family session</p>
        <h1>Workout together</h1>
        <p className="lede">
          You both do the same exercises. Every list below matches its
          follow-along video, move for move, in order.
        </p>
      </header>

      <section className="names">
        <label>
          Parent
          <input
            value={state.names.a}
            onChange={(event) => onNames('a', event.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label>
          Kid
          <input
            value={state.names.b}
            onChange={(event) => onNames('b', event.target.value)}
            placeholder="Their name"
            autoComplete="off"
          />
        </label>
      </section>

      <CloudSave
        state={state}
        familyCode={familyCode}
        status={cloudStatus}
        onFamily={onFamily}
      />

      <StreakView done={state.done} />
      <CalendarView done={state.done} onRemoveWorkout={onRemoveWorkout} />

      <section className="cards">
        {WORKOUTS.map((workout) => {
          const count = todayCounts.find((item) => item.id === workout.id)
          return (
            <button
              key={workout.id}
              type="button"
              className="workout-card"
              onClick={() => onOpen(workout.id)}
            >
              <img
                src={youtubeThumb(workout.followAlongId)}
                alt=""
                className="card-thumb"
              />
              <div className="card-body">
                <p className="card-mins">{workout.minutes} min</p>
                <h2>{workout.title}</h2>
                <p>{workout.blurb}</p>
                <p className="card-progress">
                  Today: {count?.finished ?? 0} / {count?.total ?? 0} checks
                </p>
              </div>
            </button>
          )
        })}
      </section>
    </div>
  )
}

export default function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [workoutId, setWorkoutId] = useState<string | null>(null)
  const [familyCode, setFamilyCode] = useState(loadFamilyCode)
  const [cloudStatus, setCloudStatus] = useState(
    loadFamilyCode() && isCloudConfigured() ? 'Loading…' : 'Not syncing',
  )
  const [hydrated, setHydrated] = useState(
    () => !isCloudConfigured() || !loadFamilyCode(),
  )
  const skipCloudSave = useRef(false)
  const workout = workoutId ? getWorkout(workoutId) : undefined

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    if (!isCloudConfigured() || !familyCode) {
      setHydrated(true)
      return
    }
    let cancelled = false
    setCloudStatus('Loading…')
    void fetchFamily(familyCode)
      .then((remote) => {
        if (cancelled) return
        if (remote) {
          skipCloudSave.current = true
          setState(remote)
        }
        setCloudStatus('Synced')
        setHydrated(true)
      })
      .catch(() => {
        if (cancelled) return
        setCloudStatus('Could not load cloud save')
        setHydrated(true)
      })
    return () => {
      cancelled = true
    }
  }, [familyCode])

  useEffect(() => {
    if (!isCloudConfigured() || !familyCode) return
    return watchFamily(familyCode, (remote) => {
      skipCloudSave.current = true
      setState(remote)
      setCloudStatus('Synced')
    })
  }, [familyCode])

  useEffect(() => {
    if (!hydrated || !isCloudConfigured() || !familyCode) return
    if (skipCloudSave.current) {
      skipCloudSave.current = false
      return
    }
    setCloudStatus('Saving…')
    const timer = window.setTimeout(() => {
      void saveFamily(familyCode, state)
        .then(() => setCloudStatus('Synced'))
        .catch(() => setCloudStatus('Could not save'))
    }, 700)
    return () => window.clearTimeout(timer)
  }, [state, familyCode, hydrated])

  function updateNames(person: PersonId, value: string) {
    setState((current) => ({
      ...current,
      names: { ...current.names, [person]: value },
    }))
  }

  function toggle(exerciseId: string, person: PersonId) {
    if (!workoutId) return
    const key = doneKey(workoutId, exerciseId, person)
    setState((current) => ({
      ...current,
      done: { ...current.done, [key]: !current.done[key] },
    }))
  }

  function completeWorkout() {
    if (!workout) return
    setState((current) => {
      const next = { ...current.done }
      for (const exercise of workout.exercises) {
        next[doneKey(workout.id, exercise.id, 'a')] = true
        next[doneKey(workout.id, exercise.id, 'b')] = true
      }
      return { ...current, done: next }
    })
  }

  function resetWorkout() {
    if (!workout) return
    setState((current) => {
      const next = { ...current.done }
      for (const exercise of workout.exercises) {
        delete next[doneKey(workout.id, exercise.id, 'a')]
        delete next[doneKey(workout.id, exercise.id, 'b')]
      }
      return { ...current, done: next }
    })
  }

  function removeWorkout(workoutId: string, date: string, title: string) {
    const when = formatDayTitle(date)
    if (!window.confirm(`Remove ${title} from ${when}?`)) return
    setState((current) => ({
      ...current,
      done: clearWorkoutOnDay(current.done, workoutId, date),
    }))
  }

  if (workout) {
    return (
      <WorkoutView
        workout={workout}
        state={state}
        onToggle={toggle}
        onComplete={completeWorkout}
        onReset={resetWorkout}
        onBack={() => setWorkoutId(null)}
      />
    )
  }

  return (
    <Home
      state={state}
      familyCode={familyCode}
      cloudStatus={cloudStatus}
      onNames={updateNames}
      onRemoveWorkout={removeWorkout}
      onFamily={(code, next) => {
        setFamilyCode(code)
        if (next) {
          skipCloudSave.current = true
          setState(next)
        }
        setCloudStatus(code ? 'Synced' : 'Not syncing')
        setHydrated(true)
      }}
      onOpen={setWorkoutId}
    />
  )
}
