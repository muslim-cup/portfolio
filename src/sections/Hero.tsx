import { useRef, useState } from 'react'
import { site } from '../config/site'

const faces = ['f0', 'f1', 'f2', 'f3', 'f4', 'f5']

function Cube({ cls }: { cls: string }) {
  return <div className={'cube ' + cls}>{faces.map(f => <b key={f} className={'face ' + f} />)}</div>
}

export default function Hero() {
  const tilt = useRef<HTMLDivElement>(null)
  const [info, setInfo] = useState(false)
  const move = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    tilt.current?.style.setProperty('--ry', `${x * 50}deg`)
    tilt.current?.style.setProperty('--rx', `${-y * 40}deg`)
  }
  const reset = () => { tilt.current?.style.setProperty('--ry', '0deg'); tilt.current?.style.setProperty('--rx', '0deg') }
  return (
    <section id="home" className="hero">
      <div className="hero__top">
        <span className="mono">Самостоятельный разработчик</span>
        <button className="status" aria-expanded={info} onClick={() => setInfo(!info)}>
          <span className={'dot' + (site.available ? '' : ' off')} />
          {site.available ? 'Готов к проектам' : 'Сейчас занят'}
        </button>
      </div>
      {info && <p className="status__info">Открыт к новым проектам: сайты-визитки, лендинги, интерфейсы на React и TypeScript, доработка существующих сайтов.</p>}
      <h1 className="hero__title" aria-label="Цифровой интерфейс, который движется">
        <span className="ln" aria-hidden="true"><span>Цифровой</span></span>
        <span className="ln ln--out" aria-hidden="true"><span>интерфейс</span></span>
        <span className="ln" aria-hidden="true"><span>в движении<em>.</em></span></span>
      </h1>
      <div className="stage" onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
        <div className="tilt" ref={tilt}><div className="spin"><Cube cls="big" /><Cube cls="small" /></div></div>
        <span className="mono tag t1">React · TypeScript</span>
        <span className="mono tag t2">REST / WebSocket</span>
        <span className="mono tag t3">двигай курсор</span>
      </div>
      <div className="hero__bottom">
        <p className="lead">Разрабатываю современные сайты и интерфейсы, которые помогают бизнесу выглядеть убедительно в цифровой среде.</p>
        <p className="mono hero__spec">Frontend · Сайты и лендинги<br />Интерфейсы магазинов · API</p>
        <div className="hero__cta">
          <a className="btn" href="#contact">Обсудить проект</a>
          <a className="link" href="#projects">Смотреть работы</a>
        </div>
        <a className="scroll mono" href="#about" aria-label="Прокрутить к разделу «Обо мне»"><span />вниз</a>
      </div>
    </section>
  )
}
