import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  spin: number
  angle: number
  w: number
  h: number
  color: string
  shape: 'rect' | 'circle'
  life: number
}

const COLORS = ['#c45c26', '#2f6f4e', '#1c2430', '#e8b923', '#245c8c', '#fffdf8', '#b45309']

function burst(width: number, height: number) {
  const pieces: Particle[] = []
  const cannons = [
    { x: 28, y: height - 12, dir: -Math.PI / 2.6 },
    { x: width - 28, y: height - 12, dir: -Math.PI + Math.PI / 2.6 },
    { x: width / 2, y: height - 8, dir: -Math.PI / 2 },
  ]

  for (const cannon of cannons) {
    const count = cannon.x === width / 2 ? 42 : 70
    for (let i = 0; i < count; i += 1) {
      const spread = (Math.random() - 0.5) * 0.9
      const speed = 11 + Math.random() * 16
      pieces.push({
        x: cannon.x,
        y: cannon.y,
        vx: Math.cos(cannon.dir + spread) * speed,
        vy: Math.sin(cannon.dir + spread) * speed,
        spin: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI,
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() > 0.82 ? 'circle' : 'rect',
        life: 1,
      })
    }
  }
  return pieces
}

export function ConfettiCannons() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const maybeCtx = canvas.getContext('2d')
    if (!maybeCtx) return
    const ctx: CanvasRenderingContext2D = maybeCtx

    let width = 0
    let height = 0
    let pieces: Particle[] = []
    let frame = 0
    let raf = 0
    let running = true

    function resize() {
      const next = canvasRef.current
      if (!next) return
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      next.width = Math.floor(width * dpr)
      next.height = Math.floor(height * dpr)
      next.style.width = `${width}px`
      next.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    pieces = burst(width, height)

    function tick() {
      if (!running) return
      ctx.clearRect(0, 0, width, height)
      frame += 1
      if (frame === 18 || frame === 40) {
        pieces.push(...burst(width, height).slice(0, 80))
      }

      const next: Particle[] = []
      for (const p of pieces) {
        p.vy += 0.28
        p.vx *= 0.992
        p.x += p.vx
        p.y += p.vy
        p.angle += p.spin
        p.life -= 0.0065
        if (p.life <= 0 || p.y > height + 40) continue

        ctx.save()
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.fillStyle = p.color
        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        }
        ctx.restore()
        next.push(p)
      }
      pieces = next
      raf = window.requestAnimationFrame(tick)
    }

    raf = window.requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="confetti-canvas" ref={canvasRef} aria-hidden="true" />
}
