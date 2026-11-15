import { niches, services } from '../data/content'

// Бегущая строка: услуги и сферы. Список повторён дважды, чтобы лента шла без шва.
const items = [...services.map(s => s.title), ...niches.map(([title]) => title)]

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...items, ...items].map((t, i) => <span key={i}>{t}<i /></span>)}
      </div>
    </div>
  )
}
