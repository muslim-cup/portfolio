import { useEffect, useState } from 'react'
import { site } from '../config/site'
import { services } from '../data/content'
import Head from '../components/Head'
import Logo from '../components/Logo'

const types = [...services.map(s => s.title), 'Другое']

type Err = Partial<Record<'name' | 'contact' | 'message', string>>
type Result = null | { channel: 'telegram' | 'email' | 'copy'; text: string }
type Field = 'name' | 'contact' | 'type' | 'message'

export default function Contact({ preset }: { preset: string }) {
  const [f, setF] = useState({ name: '', contact: '', type: types[0], message: '' })
  const [err, setErr] = useState<Err>({})
  const [res, setRes] = useState<Result>(null)
  const [copied, setCopied] = useState(false)

  // Услуга, выбранная в блоке «Услуги»
  useEffect(() => { if (preset) setF(s => ({ ...s, type: preset })) }, [preset])

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value })

  // Сервера нет: форма собирает текст и открывает Telegram (или почту) с готовым сообщением
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const x: Err = {}
    if (f.name.trim().length < 2) x.name = 'Укажите имя — минимум 2 символа.'
    if (f.contact.trim().length < 3) x.contact = 'Укажите Telegram, телефон или e-mail, чтобы я мог ответить.'
    if (f.message.trim().length < 10) x.message = 'Опишите задачу хотя бы в одном-двух предложениях.'
    setErr(x)
    if (Object.keys(x).length) return
    const text = `Имя: ${f.name}\nКонтакт: ${f.contact}\nЧто нужно: ${f.type}\n\n${f.message}`
    if (site.telegram) {
      window.open(`https://t.me/${site.telegram}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
      setRes({ channel: 'telegram', text })
    } else if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Заявка: ' + f.type)}&body=${encodeURIComponent(text)}`
      setRes({ channel: 'email', text })
    } else setRes({ channel: 'copy', text })
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(res!.text); setCopied(true) } catch { setCopied(false) }
  }

  const field = (k: 'name' | 'contact', label: string, ac: string) => (
    <div className="fld">
      <label htmlFor={k}>{label}</label>
      <input id={k} name={k} autoComplete={ac} value={f[k]} onChange={set(k)}
        aria-invalid={!!err[k]} aria-describedby={err[k] ? k + '-e' : undefined} />
      {err[k] && <p id={k + '-e'} className="err" role="alert">{err[k]}</p>}
    </div>
  )

  const githubLabel = site.github.replace(/^https?:\/\//, '')

  return (
    <section id="contact" className="sec sec--alt contact">
      <div className="wrap">
        <Head no="06" label="Контакты" title="Обсудим ваш проект" />
        <div className="contact__grid">
          <div data-reveal>
            <p className="lead">Напишите пару слов о задаче. Отвечу лично и подскажу, с чего начать.</p>
            <ul className="chan">
              {site.telegram && (
                <li><span>Telegram</span>
                  <a href={`https://t.me/${site.telegram}`} target="_blank" rel="noreferrer">@{site.telegram}</a></li>
              )}
              {site.instagram && (
                <li><span>Instagram</span>
                  <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noreferrer">@{site.instagram}</a></li>
              )}
              {site.email && (
                <li><span>E-mail</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
              )}
              {site.city && <li><span>Город</span><b>{site.city}</b></li>}
            </ul>
          </div>

          <form onSubmit={submit} noValidate aria-label="Заявка на проект" data-reveal>
            {field('name', 'Имя', 'name')}
            {field('contact', 'Как с вами связаться', 'off')}
            <div className="fld">
              <label htmlFor="type">Что нужно</label>
              <select id="type" value={f.type} onChange={set('type')}>
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="fld">
              <label htmlFor="message">Коротко о задаче</label>
              <textarea id="message" rows={4} value={f.message} onChange={set('message')}
                aria-invalid={!!err.message} aria-describedby={err.message ? 'message-e' : undefined} />
              {err.message && <p id="message-e" className="err" role="alert">{err.message}</p>}
            </div>
            <button className="btn" type="submit" data-magnet>Обсудить проект<span aria-hidden="true">→</span></button>
            {res && (
              <div className="ok" role="status">
                {res.channel === 'copy' ? (
                  <>
                    <p><b>Сообщение подготовлено, но не отправлено.</b> Скопируйте текст и отправьте его вручную.</p>
                    <textarea readOnly rows={5} value={res.text} aria-label="Текст заявки" />
                    <button type="button" className="link" onClick={copy}>{copied ? 'Скопировано' : 'Скопировать текст'}</button>
                  </>
                ) : (
                  <p>
                    <b>Сообщение подготовлено</b> и открыто в {res.channel === 'telegram' ? 'Telegram' : 'почтовом клиенте'}.
                    Оно уйдёт после нажатия «Отправить» там.
                  </p>
                )}
              </div>
            )}
          </form>
        </div>

        <footer className="foot">
          <span className="foot__brand"><Logo />© {new Date().getFullYear()} {site.name}</span>
          {site.github && <a href={site.github} target="_blank" rel="noreferrer">{githubLabel}</a>}
          <a href="#home">Наверх ↑</a>
        </footer>
      </div>
    </section>
  )
}
