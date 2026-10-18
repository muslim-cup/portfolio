import { services } from "../data/content";

export default function Services({ onPick }: { onPick: (t: string) => void }) {
  return (
    <section id="services" className="sec light services">
      <p className="mono sec__no">03 / services</p>
      <h2 className="big" data-reveal>
        Что я<br />
        могу сделать.
      </h2>
      <p className="services__intro">
        Цены и сроки обсуждаются под задачу — после уточнения объёма работ.
      </p>
      <ul className="svc">
        {services.map((s) => (
          <li key={s.id} data-reveal>
            <h3>{s.title}</h3>
            <div>
              <p>{s.gets}</p>
              <p className="mono">Решает: {s.solves}</p>
            </div>
            <ul>
              {s.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
              {s.note && <li className="note">{s.note}</li>}
            </ul>
            <a
              className="btn btn--dark"
              href="#contact"
              onClick={() => onPick(s.type)}
            >
              Оставить заявку
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
