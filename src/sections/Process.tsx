import { useEffect, useRef } from 'react'
import { steps } from '../data/content'
import { reducedMotion } from '../hooks/useSite'
import Head from '../components/Head'
import Decor from '../components/Decor'

export default function Process() {
  const box = useRef<HTMLDivElement>(null)

  // Синяя линия заполняется по мере прокрутки шагов
  useEffect(() => {
    const el = box.current!
    if (reducedMotion()) { el.style.setProperty('--p', '1'); return }
    let raf = 0
    const run = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = (window.innerHeight * 0.6 - r.top) / r.height
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, p))))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on) }
  }, [])

  return (
    <section id="process" className="sec sec--alt">
      <Decor />
      <div className="wrap">
        <Head no="04" label="Этапы" title="Как идёт работа" />
        <div className="steps" ref={box}>
          <div className="steps__line" aria-hidden="true"><i /></div>
          <ol>
            {steps.map(([title, text], i) => (
              <li key={title} data-reveal>
                <span className="steps__no" aria-hidden="true">{i + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
