import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { navItems, sectionIds } from '../data/content'
import { site } from '../config/site'
import Logo from './Logo'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(sectionIds[0])
  const close = () => setOpen(false)

  // Фон шапки, полоса прогресса прокрутки и активный пункт меню
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      setScrolled(window.scrollY > 40)
      bar.current?.style.setProperty('--p', String(window.scrollY / Math.max(1, h.scrollHeight - h.clientHeight)))
      // активна последняя секция, верх которой поднялся выше середины экрана
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = id
      }
      setActive(current)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])

  // Мобильное меню: блокируем прокрутку, закрываем по Esc и при переходе на широкий экран
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    const wide = () => { if (window.innerWidth >= 900) close() }
    window.addEventListener('keydown', esc)
    window.addEventListener('resize', wide)
    return () => { window.removeEventListener('keydown', esc); window.removeEventListener('resize', wide) }
  }, [open])

  return (
    <header className={'nav' + (scrolled ? ' is-scrolled' : '') + (open ? ' is-open' : '')}>
      <div className="nav__progress" ref={bar} aria-hidden="true" />
      <a className="nav__logo" href="#home" onClick={close} aria-label={site.name + ' — наверх'}>
        <Logo /><span>FRAMEO<i>.</i>STUDIO</span>
      </a>
      <nav aria-label="Основная" className="menu" id="menu">
        {navItems.map((n, i) => (
          <a key={n.id} href={'#' + n.id} style={{ '--i': i } as CSSProperties}
            aria-current={active === n.id ? 'true' : undefined} onClick={close}>
            {n.label}
          </a>
        ))}
        <p className="menu__social" style={{ '--i': navItems.length } as CSSProperties}>
          {site.telegram && <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noreferrer">Telegram</a>}
          {site.instagram && <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noreferrer">Instagram</a>}
        </p>
      </nav>
      <button className="burger" aria-expanded={open} aria-controls="menu"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
    </header>
  )
}
