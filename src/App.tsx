import { useEffect, useMemo, useRef, useState } from 'react'
import {
  WORKOUTS,
  getWorkout,
  youtubeEmbed,
  youtubeThumb,
  type Exercise,
  type PersonId,
  type Workout,
} from './data/workouts'
import { CalendarView, StreakView } from './CalendarView'
import { CloudSave } from './CloudSave'
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

function VideoPreview({
  videoId,
  title,
  large,
}: {
  videoId: string
  title: string
  large?: boolean
}) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        className={large ? 'video-poster video-poster-large' : 'video-poster'}
        onClick={() => setOpen(true)}
        aria-label={`Play preview: ${title}`}
      >
        <img src={youtubeThumb(videoId)} alt="" />
        <span className="play-badge">Preview</span>
      </button>
    )
  }

  return (
    <div className={large ? 'video-frame video-frame-large' : 'video-frame'}>
      <iframe
        src={`${youtubeEmbed(videoId)}&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
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
  const demoId = exercise.videoId

  return (
    <article className={`exercise${both ? ' exercise-done' : ''}`}>
      <div className="exercise-top">
        <div>
          <h3>{exercise.name}</h3>
          <p className="dose">{exercise.dose}</p>
        </div>
        {demoId ? (
          <button
            type="button"
            className="text-btn"
            onClick={() => setShowVideo((value) => !value)}
            aria-expanded={showVideo}
          >
            {showVideo ? 'Hide form clip' : 'How to do it'}
          </button>
        ) : null}
      </div>
      <p className="cue">{exercise.cue}</p>
      <p className="easier">
        <span>Easier option:</span> {exercise.easier}
      </p>
      {demoId && showVideo ? (
        <VideoPreview videoId={demoId} title={`${exercise.name} form clip`} />
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
  onReset,
  onBack,
}: {
  workout: Workout
  state: AppState
  onToggle: (exerciseId: string, person: PersonId) => void
  onReset: () => void
  onBack: () => void
}) {
  const [showFollow, setShowFollow] = useState(true)
  const totalSlots = workout.exercises.length * 2
  const finished = workout.exercises.reduce((count, exercise) => {
    const a = state.done[doneKey(workout.id, exercise.id, 'a')] ? 1 : 0
    const b = state.done[doneKey(workout.id, exercise.id, 'b')] ? 1 : 0
    return count + a + b
  }, 0)
  const bothComplete = finished === totalSlots
  const percent = Math.round((finished / totalSlots) * 100)

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
          <VideoPreview
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
