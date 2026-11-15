import { useEffect } from 'react'

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Появление блоков при прокрутке: элементам с data-reveal добавляется класс .in
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.12 })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])
}

// Эффекты для мыши: наклон карточек ([data-tilt]) и «магнитные» кнопки ([data-magnet]).
// Хук только записывает CSS-переменные, само движение описано в global.css.
export function usePointerFx() {
  useEffect(() => {
    if (reducedMotion()) return
    const vars = ['--rx', '--ry', '--mx', '--my', '--bx', '--by']
    let current: HTMLElement | null = null
    const reset = () => { if (current) vars.forEach(v => current!.style.removeProperty(v)); current = null }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const el = (e.target as Element).closest<HTMLElement>('[data-tilt],[data-magnet]')
      if (el !== current) reset()
      if (!el) return
      current = el
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      if (el.hasAttribute('data-tilt')) {
        el.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg')
        el.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg')
        el.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px')
        el.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px')
      } else {
        el.style.setProperty('--bx', (x * r.width * 0.25).toFixed(1) + 'px')
        el.style.setProperty('--by', (y * r.height * 0.4).toFixed(1) + 'px')
      }
    }
    document.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    return () => { document.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', reset) }
  }, [])
}

// Параллакс: элемент с data-parallax="0.2" сдвигается относительно своего родителя.
// Отрицательное число — отстаёт от прокрутки, положительное — обгоняет.
export function useParallax() {
  useEffect(() => {
    if (reducedMotion()) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let raf = 0
    const run = () => {
      raf = 0
      const vh = window.innerHeight
      els.forEach(el => {
        const r = el.parentElement!.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) return
        const y = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax)
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
}
