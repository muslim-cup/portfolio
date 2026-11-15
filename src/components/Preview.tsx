import type { Project, Variant } from '../data/projects'
import Shot from './Shot'

// Превью проекта: рамка браузера и рамка телефона.
// Если в projects.ts указаны image / imageMobile — внутри показываются ваши скриншоты,
// иначе макет интерфейса, свёрстанный кодом.

const n = (c: number) => Array.from({ length: c }, (_, i) => i)

const MockNav = ({ links }: { links: string[] }) => (
  <div className="m-nav"><b className="m-logo" /><span>{links.map(l => <i key={l}>{l}</i>)}</span></div>
)

function Desktop({ v }: { v: Variant }) {
  if (v === 'chat') return (
    <div className="m-chat">
      <div className="m-side">{n(5).map(i => <span key={i}><b /><i /></span>)}</div>
      <div className="m-talk">
        <span className="m-bub" /><span className="m-bub me" /><span className="m-bub w" /><span className="m-bub me s" />
        <span className="m-input"><i /><b /></span>
      </div>
    </div>
  )
  if (v === 'shop') return (
    <>
      <MockNav links={['Каталог', 'Новинки', 'Доставка']} />
      <div className="m-hero"><p className="m-h">Новая<br />коллекция</p><span className="m-btn">Смотреть</span></div>
      <div className="m-grid">{n(4).map(i => <div key={i}><span className="m-img" /><i /><i className="s" /></div>)}</div>
    </>
  )
  if (v === 'barber') return (
    <>
      <MockNav links={['Услуги', 'Мастера', 'Контакты']} />
      <div className="m-split">
        <div><p className="m-h">Стрижки<br />и бритьё</p><span className="m-btn">Записаться</span></div>
        <ul>{['Стрижка', 'Борода', 'Комплекс', 'Детская'].map(s => <li key={s}>{s}<i /></li>)}</ul>
      </div>
    </>
  )
  return (
    <>
      <MockNav links={['Меню', 'Бронь', 'Контакты']} />
      <div className="m-center"><p className="m-h">Меню</p><span className="m-tabs"><i>Завтраки</i><i>Основное</i><i>Десерты</i></span></div>
      <div className="m-grid m-grid--3">{n(3).map(i => <div key={i}><span className="m-img round" /><i /><i className="s" /></div>)}</div>
    </>
  )
}

const phone: Record<Exclude<Variant, 'chat'>, [string, string]> = {
  shop: ['Каталог', 'В корзину'],
  barber: ['Запись', 'Записаться'],
  resto: ['Меню', 'Забронировать'],
}

function Mobile({ v }: { v: Variant }) {
  if (v === 'chat') return (
    <div className="m-talk"><span className="m-bub" /><span className="m-bub me" /><span className="m-bub w" /><span className="m-input"><i /><b /></span></div>
  )
  const [title, cta] = phone[v]
  return (
    <div className="m-phone">
      <div className="m-nav"><b className="m-logo" /><span><i className="m-burger" /></span></div>
      <span className={'m-img' + (v === 'resto' ? ' round' : '')} />
      <p className="m-h">{title}</p><i /><i className="s" />
      <span className="m-btn">{cta}</span>
    </div>
  )
}

export default function Preview({ p }: { p: Project }) {
  return (
    <div className={'pv pv--' + p.variant} aria-hidden="true">
      <div className="pv__browser">
        <div className="pv__bar"><i /><i /><i /><span /></div>
        <div className="pv__screen"><Shot src={p.image}><Desktop v={p.variant} /></Shot></div>
      </div>
      <div className="pv__phone">
        <div className="pv__screen"><Shot src={p.imageMobile}><Mobile v={p.variant} /></Shot></div>
      </div>
    </div>
  )
}
