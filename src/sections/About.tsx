import { principles, stackLine } from '../data/content'
import { site } from '../config/site'
import Head from '../components/Head'
import Decor from '../components/Decor'
import Shot from '../components/Shot'
import { Mark } from '../components/Logo'

export default function About() {
  return (
    <section id="about" className="sec">
      <Decor side="l" />
      <div className="wrap">
        <Head no="05" label="О студии" title="Студия одного разработчика" />
        <div className="about">
          <div data-reveal>
            <p className="lead">
              {site.founder && <>Меня зовут {site.founder}. </>}
              {site.name} — моя студия в городе {site.city}. Я сам обсуждаю задачу, продумываю дизайн и собираю сайт.
            </p>
            <ul className="points">
              {principles.map(t => <li key={t}>{t}</li>)}
            </ul>
            <p className="about__stack">{stackLine}</p>
          </div>
          {/* Слот под фото: site.photo в src/config/site.ts */}
          <figure className="about__photo" data-reveal>
            <Shot src={site.photo} alt={site.founder || 'Основатель студии'}>
              <span className="about__mark" aria-hidden="true"><Mark /></span>
            </Shot>
          </figure>
        </div>
      </div>
    </section>
  )
}
