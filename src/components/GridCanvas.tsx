import { useEffect, useRef } from 'react'
import { reducedMotion } from '../hooks/useSite'

// Живой фон первого экрана: архитектурная сетка, по линиям которой бегут синие импульсы.
// Пятно света подсвечивает сетку: следует за курсором, а без курсора (телефон) плавно блуждает само.
// Рисуется только пока первый экран виден. При prefers-reduced-motion — статичный кадр.
interface Pulse { vertical: boolean; line: number; pos: number; speed: number; len: number }

export default function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')
    if (!ctx) return
    const still = reducedMotion()
    let w = 0, h = 0, cell = 64, raf = 0, last = 0, visible = true
    let pulses: Pulse[] = []
    let grid = new Path2D()
    // свет: текущее положение (lx, ly) плавно догоняет цель (tx, ty)
    let lx = 0, ly = 0, tx = 0, ty = 0, lastMove = -1e9

    const spawn = (p: Pulse, anywhere: boolean) => {
      p.vertical = Math.random() < 0.5
      const span = p.vertical ? h : w
      p.line = Math.floor(Math.random() * (Math.ceil((p.vertical ? w : h) / cell) + 1))
      p.speed = (60 + Math.random() * 120) * (Math.random() < 0.5 ? -1 : 1)
      p.len = 80 + Math.random() * 160
      p.pos = anywhere ? Math.random() * span : p.speed > 0 ? -p.len : span + p.len
    }

    const draw = (dt: number, now: number) => {
      ctx.clearRect(0, 0, w, h)

      // базовая сетка
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(185,191,201,.09)'
      ctx.stroke(grid)

      // пятно света
      if (now - lastMove > 2500) {
        tx = w * (0.5 + 0.36 * Math.sin(now / 3100))
        ty = h * (0.45 + 0.28 * Math.cos(now / 4300))
      }
      const k = Math.min(1, dt * 5)
      lx += (tx - lx) * k
      ly += (ty - ly) * k
      const R = Math.max(170, Math.min(w, h) * 0.36)
      const light = ctx.createRadialGradient(lx, ly, 0, lx, ly, R)
      light.addColorStop(0, 'rgba(111,155,255,.6)')
      light.addColorStop(1, 'rgba(111,155,255,0)')
      ctx.strokeStyle = light
      ctx.stroke(grid)
      // узлы сетки рядом со светом
      for (let gx = Math.floor((lx - R) / cell); gx <= Math.ceil((lx + R) / cell); gx++) {
        for (let gy = Math.floor((ly - R) / cell); gy <= Math.ceil((ly + R) / cell); gy++) {
          const x = gx * cell + 0.5, y = gy * cell + 0.5
          const d = Math.hypot(x - lx, y - ly) / R
          if (d >= 1) continue
          ctx.fillStyle = `rgba(160,190,255,${((1 - d) ** 2 * 0.9).toFixed(3)})`
          ctx.fillRect(x - 1.5, y - 1.5, 3, 3)
        }
      }

      // импульсы
      ctx.lineWidth = 1.5
      for (const p of pulses) {
        p.pos += p.speed * dt
        const span = p.vertical ? h : w
        if (p.pos < -p.len - 10 || p.pos > span + p.len + 10) spawn(p, false)
        const a = p.line * cell + 0.5
        const head = p.pos
        const tail = head - Math.sign(p.speed) * p.len
        const g = p.vertical ? ctx.createLinearGradient(a, tail, a, head) : ctx.createLinearGradient(tail, a, head, a)
        g.addColorStop(0, 'rgba(47,107,255,0)')
        g.addColorStop(1, 'rgba(111,155,255,.9)')
        ctx.strokeStyle = g
        ctx.beginPath()
        if (p.vertical) { ctx.moveTo(a, tail); ctx.lineTo(a, head) } else { ctx.moveTo(tail, a); ctx.lineTo(head, a) }
        ctx.stroke()
        ctx.fillStyle = '#6f9bff'
        if (p.vertical) ctx.fillRect(a - 2.5, head - 2.5, 5, 5); else ctx.fillRect(head - 2.5, a - 2.5, 5, 5)
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const widthChanged = c.clientWidth !== w
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (widthChanged) {
        cell = w < 700 ? 44 : 64
        const count = Math.round(Math.min(22, Math.max(8, w / 70)))
        pulses = Array.from({ length: count }, () => {
          const p: Pulse = { vertical: false, line: 0, pos: 0, speed: 0, len: 0 }
          spawn(p, true)
          return p
        })
        lx = tx = w * 0.65; ly = ty = h * 0.4
      }
      grid = new Path2D()
      for (let x = 0.5; x <= w; x += cell) { grid.moveTo(x, 0); grid.lineTo(x, h) }
      for (let y = 0.5; y <= h; y += cell) { grid.moveTo(0, y); grid.lineTo(w, y) }
      draw(0, performance.now())
    }

    const tick = (t: number) => {
      draw(Math.min(0.05, (t - last) / 1000), t)
      last = t
      raf = requestAnimationFrame(tick)
    }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }
    const start = () => {
      if (raf || still || !visible || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onPointer = (e: PointerEvent) => {
      if (!visible) return
      const r = c.getBoundingClientRect()
      tx = e.clientX - r.left; ty = e.clientY - r.top
      lastMove = performance.now()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(c)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop() })
    io.observe(c)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointermove', onPointer, { passive: true })
    resize()
    start()
    return () => {
      stop(); ro.disconnect(); io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return <canvas ref={ref} />
}
