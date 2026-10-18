import { useState } from "react";
import { projects } from "../data/projects";
import Preview from "../components/Preview";
import { site } from "../config/site";

export default function Projects() {
  const [open, setOpen] = useState<string | null>("taskin");
  return (
    <section id="projects" className="sec projects">
      <p className="mono sec__no">04 / selected work</p>
      <h2 className="big" data-reveal>
        Работы
        <br />и концепты.
      </h2>
      <div className="projects__grid">
        {projects.map((p, n) => {
          const on = open === p.id;
          return (
            <article
              key={p.id}
              className={"proj p" + n + (on ? " is-open" : "")}
              data-reveal
            >
              <Preview v={p.variant} />
              <div className="proj__body">
                <p className={"mono proj__cat" + (p.real ? " real" : "")}>
                  {p.category}
                </p>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <ul className="chips">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <button
                  className="link"
                  aria-expanded={on}
                  aria-controls={"d-" + p.id}
                  onClick={() => setOpen(on ? null : p.id)}
                >
                  {on ? "Скрыть детали" : "Роль и задача"}
                </button>
                <div id={"d-" + p.id} className="proj__more" hidden={!on}>
                  <dl>
                    <dt className="mono">Моя роль</dt>
                    <dd>{p.role}</dd>
                    <dt className="mono">Задача</dt>
                    <dd>{p.task}</dd>
                  </dl>
                  <p className="mono muted">
                    {p.real
                      ? "Приватный проект: публичной ссылки и кода нет."
                      : "Демонстрационный концепт — не выполненный заказ."}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <a className="link" href={site.github} target="_blank" rel="noreferrer">
        Больше кода — GitHub (новая вкладка)
      </a>
    </section>
  );
}
