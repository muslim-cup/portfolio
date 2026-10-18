import { advantages, process } from "../data/content";

export default function Process() {
  return (
    <>
      <section id="process" className="sec process">
        <p className="mono sec__no">05 / process</p>
        <h2 className="big" data-reveal>
          От идеи
          <br />
          до интерфейса.
        </h2>
        <ol className="steps">
          {process.map(([t, d], i) => (
            <li key={t} data-reveal>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>
      <section id="advantages" className="sec adv" aria-label="Принципы работы">
        {advantages.map(([t, d, tag], i) => (
          <div key={t} className={"adv__row r" + (i % 2)} data-reveal>
            <h3>{t}</h3>
            <p>{d}</p>
            <span className="mono">{tag}</span>
          </div>
        ))}
      </section>
    </>
  );
}
