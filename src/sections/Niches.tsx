import { niches } from '../data/content'
import Head from '../components/Head'
import Decor from '../components/Decor'

export default function Niches() {
  return (
    <section id="niches" className="sec sec--alt">
      <Decor side="l" />
      <div className="wrap">
        <Head no="02" label="Для кого" title="Сайты для вашей сферы" />
        <ul className="niches">
          {niches.map(([title, text]) => (
            <li key={title} data-reveal>
              <div className="niche">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
