import { useEffect, useRef, useState } from 'react'
import { navItems, sectionIds } from '../data/content'
import { useActive } from '../hooks/useSite'

const map: Record<string, string> = { skills: 'about', advantages: 'process' }

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const raw = useActive(sectionIds)
  const active = map[raw] ?? raw

  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      setScrolled(window.scrollY > 40)
      bar.current?.style.setProperty('--p', String(window.scrollY / Math.max(1, h.scrollHeight - h.clientHeight)))
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <header className={'nav' + (scrolled ? ' is-scrolled' : '')}>
      <div className="nav__progress" ref={bar} aria-hidden="true" />
      <a className="nav__logo" href="#home" onClick={() => setOpen(false)}>Muslim<span></span></a>
      <nav aria-label="Основная" className={'nav__links' + (open ? ' is-open' : '')} id="menu">
        {navItems.map((n, i) => (
          <a key={n.id} href={'#' + n.id} aria-current={active === n.id ? 'true' : undefined} onClick={() => setOpen(false)}>
            <i>{String(i + 1).padStart(2, '0')}</i>{n.label}
          </a>
        ))}
      </nav>
      <button className="nav__burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
        {open ? 'Закрыть' : 'Меню'}
      </button>
    </header>
  )
}
