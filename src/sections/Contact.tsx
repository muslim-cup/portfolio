import { useEffect, useState } from "react";
import { projectTypes, site } from "../config/site";

type Err = Partial<Record<"name" | "contact" | "message", string>>;
type Result = null | { channel: "telegram" | "email" | "copy"; text: string };
type Field = "name" | "contact" | "type" | "message";

export default function Contact({ preset }: { preset: string }) {
  const [f, setF] = useState({
    name: "",
    contact: "",
    type: projectTypes[0],
    message: "",
  });
  const [err, setErr] = useState<Err>({});
  const [res, setRes] = useState<Result>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (preset) setF((s) => ({ ...s, type: preset }));
  }, [preset]);
  const set =
    (k: Field) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Err = {};
    if (f.name.trim().length < 2) x.name = "Укажите имя — минимум 2 символа.";
    if (f.contact.trim().length < 3)
      x.contact =
        "Укажите Telegram, e-mail или телефон, чтобы можно было ответить.";
    if (f.message.trim().length < 10)
      x.message = "Опишите задачу хотя бы в одном-двух предложениях.";
    setErr(x);
    if (Object.keys(x).length) return;
    const text = `Имя: ${f.name}\nКонтакт: ${f.contact}\nТип проекта: ${f.type}\n\n${f.message}`;
    if (site.telegram) {
      window.open(
        `https://t.me/${site.telegram}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener",
      );
      setRes({ channel: "telegram", text });
    } else if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Заявка: " + f.type)}&body=${encodeURIComponent(text)}`;
      setRes({ channel: "email", text });
    } else setRes({ channel: "copy", text });
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(res!.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const field = (k: "name" | "contact", label: string, ac: string) => (
    <div className="fld">
      <label htmlFor={k}>{label}</label>
      <input
        id={k}
        name={k}
        autoComplete={ac}
        value={f[k]}
        onChange={set(k)}
        aria-invalid={!!err[k]}
        aria-describedby={err[k] ? k + "-e" : undefined}
      />
      {err[k] && (
        <p id={k + "-e"} className="err" role="alert">
          {err[k]}
        </p>
      )}
    </div>
  );
  return (
    <section id="contact" className="sec contact">
      <p className="mono sec__no">06 / contact</p>
      <h2 className="big" data-reveal>
        Есть идея?
        <br />
        <span>Давайте сделаем её вместе.</span>
      </h2>
      <div className="contact__grid">
        <div>
          <p className="lead">
            Есть идея для сайта или нужно улучшить существующий проект? Расскажи
            о задаче — обсудим подход, объём работ и возможные решения.
          </p>
          <ul className="chan">
            <li>
              <span className="mono">GitHub</span>
              <a href={site.github} target="_blank" rel="noreferrer">
                github.com/{site.handle}
              </a>
            </li>
            <li>
              <span className="mono">Telegram</span>
              {site.telegram ? (
                <a
                  href={`https://t.me/${site.telegram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{site.telegram}
                </a>
              ) : (
                <em>скоро появится</em>
              )}
            </li>
            <li>
              <span className="mono">E-mail</span>
              {site.email ? (
                <a href={`mailto:${site.email}`}>{site.email}</a>
              ) : (
                <em>скоро появится</em>
              )}
            </li>
          </ul>
        </div>
        <form onSubmit={submit} noValidate aria-label="Заявка на проект">
          {field("name", "Имя", "name")}
          {field("contact", "Контакт для связи", "off")}
          <div className="fld">
            <label htmlFor="type">Тип проекта</label>
            <select id="type" value={f.type} onChange={set("type")}>
              {projectTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="fld">
            <label htmlFor="message">Коротко о задаче</label>
            <textarea
              id="message"
              rows={5}
              value={f.message}
              onChange={set("message")}
              aria-invalid={!!err.message}
              aria-describedby={err.message ? "message-e" : undefined}
            />
            {err.message && (
              <p id="message-e" className="err" role="alert">
                {err.message}
              </p>
            )}
          </div>
          <button className="btn" type="submit">
            Обсудить проект
          </button>
          {res && (
            <div className="ok" role="status">
              {res.channel === "copy" ? (
                <>
                  <p>
                    <b>Сообщение подготовлено, но не отправлено.</b> Каналы
                    связи пока не настроены — скопируйте текст и отправьте его
                    вручную.
                  </p>
                  <textarea
                    readOnly
                    rows={5}
                    value={res.text}
                    aria-label="Текст заявки"
                  />
                  <button type="button" className="link" onClick={copy}>
                    {copied ? "Скопировано" : "Скопировать текст"}
                  </button>
                </>
              ) : (
                <p>
                  <b>Сообщение подготовлено</b> и открыто в{" "}
                  {res.channel === "telegram" ? "Telegram" : "почтовом клиенте"}
                  . Оно уйдёт после нажатия «Отправить» там.
                </p>
              )}
            </div>
          )}
        </form>
      </div>
      <footer className="foot mono">
        <span>
          © {new Date().getFullYear()} {site.handle}
        </span>
        <a href="#home">Наверх</a>
      </footer>
    </section>
  );
}
