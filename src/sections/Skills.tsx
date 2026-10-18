import { skillGroups } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="sec skills" aria-labelledby="skills-t">
      <h2 id="skills-t" className="mono sec__no">Technology map</h2>
      <div className="skills__grid">
        {skillGroups.map((g, n) => (
          <div key={g.title} className={'skills__col c' + n} data-reveal>
            <h3>{g.title}</h3>
            <ul>{g.items.map(s => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="mono skills__note">Go — в процессе изучения</p>
    </section>
  )
}
