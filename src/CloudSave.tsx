import { useState } from 'react'
import {
  createFamily,
  isCloudConfigured,
  joinFamily,
  leaveFamily,
} from './cloud'
import type { AppState } from './storage'

type Props = {
  state: AppState
  familyCode: string | null
  status: string
  onFamily: (code: string | null, next?: AppState) => void
}

export function CloudSave({ state, familyCode, status, onFamily }: Props) {
  const [joinCode, setJoinCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (!isCloudConfigured()) {
    return (
      <section className="cloud">
        <p className="eyebrow">Cloud save</p>
        <h2>Not connected yet</h2>
        <p>
          Create a free Supabase project, run <code>supabase/schema.sql</code>,
          then put the project URL and anon key in <code>.env.local</code>.
        </p>
        <pre>{`VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key`}</pre>
        <p className="cloud-hint">
          Restart the app after saving the file. The free plan is enough for
          this.
        </p>
      </section>
    )
  }

  async function startFamily() {
    setBusy(true)
    setError('')
    try {
      const code = await createFamily(state)
      onFamily(code)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not create a save.')
    } finally {
      setBusy(false)
    }
  }

  async function join() {
    setBusy(true)
    setError('')
    try {
      const result = await joinFamily(joinCode)
      onFamily(result.code, result.state)
      setJoinCode('')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not join.')
    } finally {
      setBusy(false)
    }
  }

  function disconnect() {
    leaveFamily()
    onFamily(null)
  }

  return (
    <section className="cloud">
      <p className="eyebrow">Cloud save</p>
      {familyCode ? (
        <>
          <h2>Family code {familyCode}</h2>
          <p>
            Enter this code on another phone or laptop to share names, checks,
            calendar, and streak.
          </p>
          <p className="cloud-status">{status}</p>
          <button type="button" className="nav-btn" onClick={disconnect}>
            Stop syncing this device
          </button>
        </>
      ) : (
        <>
          <h2>Sync across devices</h2>
          <p>
            Create a family save, then type the same code on your other device.
            No login needed.
          </p>
          <div className="cloud-actions">
            <button type="button" className="nav-btn" onClick={startFamily} disabled={busy}>
              Create family save
            </button>
            <div className="cloud-join">
              <input
                value={joinCode}
                onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
                placeholder="Family code"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="nav-btn" onClick={join} disabled={busy}>
                Join
              </button>
            </div>
          </div>
        </>
      )}
      {error ? <p className="cloud-error">{error}</p> : null}
    </section>
  )
}
