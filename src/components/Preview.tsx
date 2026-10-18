import type { Variant } from '../data/projects'

const n = (c: number) => Array.from({ length: c }, (_, i) => i)

export default function Preview({ v }: { v: Variant }) {
  return (
    <div className={'pv pv--' + v} aria-hidden="true">
      {v === 'chat' && <>
        <div className="pv__side">{n(5).map(i => <span key={i} />)}</div>
        <div className="pv__main">
          <span className="b l" /><span className="b r" /><span className="b l w" /><span className="b r s" />
          <span className="pv__input"><i />sent</span>
        </div>
      </>}
      {v === 'shop' && n(6).map(i => <div key={i} className="tile"><span /><i /></div>)}
      {v === 'card' && <><div className="hd" /><div className="ln1" /><div className="ln2" /><div className="cols"><span /><span /><span /></div></>}
      {v === 'saas' && <><div className="pv__side">{n(4).map(i => <span key={i} />)}</div>
        <div className="pv__main"><div className="bars">{[40, 70, 50, 90, 60, 80].map((h, i) => <span key={i} style={{ height: h + '%' }} />)}</div></div></>}
    </div>
  )
}
