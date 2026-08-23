import { useCallback, useEffect, useRef, useState } from 'react'
import { youtubeThumb } from './data/workouts'
import {
  BUFFERING,
  PLAYING,
  canGoNativeFullscreen,
  loadYouTubeApi,
  type YTPlayer,
} from './youtube'

// YouTube's control bar is all or nothing, so it is switched off entirely with
// controls=0 and we supply just play/pause and fullscreen. The buttons sit below
// the player rather than over it, which YouTube's terms require.
export function VideoPlayer({
  videoId,
  title,
  start,
  large,
}: {
  videoId: string
  title: string
  start?: number
  large?: boolean
}) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        type="button"
        className={large ? 'video-poster video-poster-large' : 'video-poster'}
        onClick={() => setOpen(true)}
        aria-label={`Play: ${title}`}
      >
        <img src={youtubeThumb(videoId)} alt="" />
        <span className="play-badge">Play</span>
      </button>
    )
  }

  return <ActivePlayer videoId={videoId} title={title} start={start} large={large} />
}

function ActivePlayer({
  videoId,
  title,
  start,
  large,
}: {
  videoId: string
  title: string
  start?: number
  large?: boolean
}) {
  const shellRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    let cancelled = false
    const frame = frameRef.current
    let player: YTPlayer | null = null

    void loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !frame) return
        // The API replaces the node it is handed with an iframe, so give it a
        // throwaway child rather than anything React is tracking.
        const mount = document.createElement('div')
        frame.append(mount)
        player = new YT.Player(mount, {
          videoId,
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            controls: 0,
            enablejsapi: 1,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
            autoplay: 1,
            ...(start && start > 0 ? { start } : {}),
          },
          events: {
            onReady: (event) => {
              if (cancelled) return
              setReady(true)
              event.target.playVideo()
            },
            onStateChange: (event) => {
              if (cancelled) return
              setPlaying(event.data === PLAYING || event.data === BUFFERING)
            },
          },
        })
        playerRef.current = player
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      player?.destroy()
      playerRef.current = null
      frame?.replaceChildren()
    }
  }, [videoId, start])

  // Keep the button label honest if the user leaves fullscreen with Escape or
  // the system gesture rather than our button.
  useEffect(() => {
    function onChange() {
      if (!document.fullscreenElement) setExpanded(false)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  useEffect(() => {
    if (!expanded) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  const togglePlay = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (playing) player.pauseVideo()
    else player.playVideo()
  }, [playing])

  const toggleFullscreen = useCallback(() => {
    const shell = shellRef.current
    if (!shell) return

    if (document.fullscreenElement) {
      void document.exitFullscreen()
      setExpanded(false)
      return
    }

    // iPhone Safari does not allow arbitrary elements into native fullscreen, so
    // fall back to filling the viewport ourselves.
    if (canGoNativeFullscreen(shell)) {
      shell.requestFullscreen().then(
        () => setExpanded(true),
        () => setExpanded(true),
      )
      return
    }
    setExpanded((value) => !value)
  }, [])

  if (failed) {
    return (
      <p className="video-fallback">
        The player could not load.{' '}
        <a
          href={`https://www.youtube.com/watch?v=${videoId}${start ? `&t=${start}` : ''}`}
          target="_blank"
          rel="noreferrer"
        >
          Open on YouTube
        </a>
        .
      </p>
    )
  }

  return (
    <div
      className={`video-shell${expanded ? ' is-expanded' : ''}`}
      ref={shellRef}
    >
      <div
        className={large ? 'video-frame video-frame-large' : 'video-frame'}
        ref={frameRef}
      />
      <div className="video-controls">
        <button
          type="button"
          className="video-btn"
          onClick={togglePlay}
          disabled={!ready}
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        >
          <span aria-hidden="true">{playing ? '❙❙' : '▶'}</span>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          className="video-btn"
          onClick={toggleFullscreen}
          aria-label={expanded ? 'Exit full screen' : 'Full screen'}
        >
          <span aria-hidden="true">{expanded ? '⤡' : '⤢'}</span>
          {expanded ? 'Exit' : 'Full screen'}
        </button>
      </div>
    </div>
  )
}
