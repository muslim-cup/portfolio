import { useEffect, useRef, type CSSProperties } from 'react'
import { site } from '../config/site'
import { reducedMotion } from '../hooks/useSite'
import GridCanvas from '../components/GridCanvas'

// Буквы заголовка появляются по очереди: --i задаёт задержку
const letters = (text: string, from: number) =>
  [...text].map((ch, i) => <span key={i} className="ch" style={{ '--i': from + i } as CSSProperties}>{ch}</span>)

export default function Hero() {
  const inner = useRef<HTMLDivElement>(null)

  // При прокрутке содержимое первого экрана плавно уходит вверх и растворяется
  useEffect(() => {
    if (reducedMotion()) return
    const el = inner.current!
    let raf = 0
    const run = () => { raf = 0; el.style.setProperty('--out', Math.min(1, window.scrollY / window.innerHeight).toFixed(3)) }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on) }
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__canvas" data-parallax="-0.3"><GridCanvas /></div>
        <i className="hero__glow" data-parallax="-0.15" />
      </div>
      <div className="wrap hero__in" ref={inner}>
        <div className="hero__top fade">
          <span className="label">{site.tagline}</span>
          <span className="status">
            <i className={'dot' + (site.available ? '' : ' off')} />
            {site.available ? 'Принимаю проекты' : 'Сейчас занят'}
          </span>
        </div>
        <h1 className="hero__title" aria-label={site.name}>
          <span className="ln" aria-hidden="true">{letters('FRAMEO', 0)}</span>
          <span className="ln" aria-hidden="true">
            <i className="ch sq" style={{ '--i': 6 } as CSSProperties} />{letters('STUDIO', 7)}
          </span>
        </h1>
        <div className="hero__bottom fade">
          <p className="lead">Сайты для вашего бизнеса: понятные клиенту, быстрые и удобные с телефона.</p>
          <div className="hero__cta">
            <a className="btn" href="#contact" data-magnet>Обсудить проект<span aria-hidden="true">→</span></a>
            <a className="link" href="#projects">Смотреть проекты</a>
          </div>
        </div>
        <a className="cue" href="#services" aria-label="Прокрутить к услугам"><i /></a>
      </div>
    </section>
  )
}
