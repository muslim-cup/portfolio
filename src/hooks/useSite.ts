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
