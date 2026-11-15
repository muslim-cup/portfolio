import type { CSSProperties } from 'react'
import { projects } from '../data/projects'
import Preview from '../components/Preview'
import Head from '../components/Head'
import Decor from '../components/Decor'

export default function Projects() {
  return (
    <section id="projects" className="sec">
      <Decor />
      <div className="wrap">
        <Head no="03" label="Проекты" title="Проект и концепты" />
        <div className="projects">
          {projects.map((p, i) => (
            <article key={p.id} className="proj" data-reveal style={{ '--d': `${(i % 2) * 100}ms` } as CSSProperties}>
              <Preview p={p} />
              <div className="proj__body">
                <span className={'tag' + (p.real ? ' tag--real' : '')}>{p.real ? 'Реальный проект' : 'Концепт'}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
