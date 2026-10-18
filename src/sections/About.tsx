import { useState } from "react";
import { layers } from "../data/content";

const code = `type MessageStatus =
  | 'sending' | 'sent' | 'read' | 'failed'

// illustrative snippet
function badge(s: MessageStatus) {
  return s === 'failed' ? 'retry' : s
}`;

export default function About() {
  const [i, setI] = useState(3);
  return (
    <section id="about" className="sec about">
      <p className="mono sec__no">02 / about</p>
      <h2 className="big" data-reveal>
        Создаю продукты
        <br />
        для интернета.
      </h2>
      <div className="about__grid">
        <p className="about__text" data-reveal>
          Я frontend-разработчик, который работает над современными
          веб-интерфейсами и стремится превращать идеи в удобные цифровые
          продукты. В работе уделяю внимание не только внешнему виду, но и
          структуре проекта, качеству кода, взаимодействию с API и поведению
          интерфейса в реальных условиях. Работаю с React и TypeScript,
          использую современные инструменты frontend-разработки и продолжаю
          расширять технические компетенции. Мне важно, чтобы сайт был не просто
          красивым изображением, а полноценным инструментом, которым удобно
          пользоваться.
        </p>
        <aside className="about__side" data-reveal>
          <pre className="code" aria-label="Пример кода на TypeScript">
            <code>{code}</code>
          </pre>
          <div className="fsd">
            <p className="mono">Feature-Sliced Design — нажмите на слой</p>
            <div className="fsd__layers" role="group" aria-label="Слои FSD">
              {layers.map((l, n) => (
                <button
                  key={l.name}
                  aria-pressed={i === n}
                  onClick={() => setI(n)}
                  style={{ marginInlineStart: `${n * 8}px` }}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <p className="fsd__text" aria-live="polite">
              {layers[i].text}
            </p>
          </div>
          <p className="mono goal">
            Сейчас изучаю Go · цель — от Frontend к Fullstack
          </p>
          <p className="mono goal">
            ГГНТУ им. М. Д. Миллионщикова · Информационные системы и технологии
          </p>
        </aside>
      </div>
    </section>
  );
}
