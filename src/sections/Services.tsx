import type { CSSProperties } from 'react'
import { services } from '../data/content'
import { site } from '../config/site'
import Head from '../components/Head'
import Decor from '../components/Decor'

// Клик по карточке ведёт к форме и подставляет услугу в поле «Что нужно».
export default function Services({ onPick }: { onPick: (title: string) => void }) {
  return (
    <section id="services" className="sec">
      <Decor />
      <div className="wrap">
        <Head no="01" label="Услуги" title="Что можно заказать" />
        <ul className="cards">
          {services.map((s, i) => (
            <li key={s.id} data-reveal style={{ '--d': `${(i % 3) * 80}ms` } as CSSProperties}>
              <a className="card" href="#contact" onClick={() => onPick(s.title)}>
                <span className="card__no">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.gets}</p>
                <p className="card__solves"><b>Когда нужно.</b> {s.solves}</p>
                <span className="card__foot">
                  {site.prices[s.id] && <b>{site.prices[s.id]}</b>}
                  <span className="card__go">Выбрать<i aria-hidden="true">→</i></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
