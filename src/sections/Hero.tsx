import { site } from '../config/site'
import GridCanvas from '../components/GridCanvas'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__canvas" data-parallax="-0.3"><GridCanvas /></div>
        <i className="hero__glow" data-parallax="-0.15" />
      </div>
      <div className="wrap hero__in">
        <div className="hero__top fade">
          <span className="label">{site.tagline}</span>
          <span className="status">
            <i className={'dot' + (site.available ? '' : ' off')} />
            {site.available ? 'Принимаю проекты' : 'Сейчас занят'}
          </span>
        </div>
        <h1 className="hero__title" aria-label={site.name}>
          <span className="ln" aria-hidden="true"><span>FRAMEO</span></span>
          <span className="ln" aria-hidden="true"><span><i className="sq" />STUDIO</span></span>
        </h1>
        <div className="hero__bottom fade">
          <p className="lead">Сайты для вашего бизнеса: понятные клиенту, быстрые и удобные с телефона.</p>
          <div className="hero__cta">
            <a className="btn" href="#contact">Обсудить проект<span aria-hidden="true">→</span></a>
            <a className="link" href="#projects">Смотреть проекты</a>
          </div>
        </div>
        <a className="cue" href="#services" aria-label="Прокрутить к услугам"><i /></a>
      </div>
    </section>
  )
}
