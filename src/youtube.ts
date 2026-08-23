// Minimal typings for the bits of the YouTube IFrame Player API we use, so the
// app does not need an extra @types dependency.
export type YTPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  getPlayerState: () => number
  destroy: () => void
}

type YTPlayerEvent = { target: YTPlayer; data: number }

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string
      host?: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (event: YTPlayerEvent) => void
        onStateChange?: (event: YTPlayerEvent) => void
      }
    },
  ) => YTPlayer
  PlayerState: {
    UNSTARTED: number
    ENDED: number
    PLAYING: number
    PAUSED: number
    BUFFERING: number
    CUED: number
  }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

export const PLAYING = 1
export const BUFFERING = 3

let pending: Promise<YTNamespace> | null = null

// The API script is global and can only be loaded once, so every player shares
// this promise.
export function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (pending) return pending

  pending = new Promise<YTNamespace>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT?.Player) resolve(window.YT)
      else reject(new Error('YouTube API loaded without a Player constructor.'))
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => reject(new Error('Could not load the YouTube player.'))
    document.head.append(script)
  })

  return pending
}

export function canGoNativeFullscreen(element: HTMLElement) {
  return typeof element.requestFullscreen === 'function' && document.fullscreenEnabled
}
