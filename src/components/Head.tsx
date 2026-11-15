import { Fragment, type CSSProperties } from 'react'

// Заголовок секции: номер, подпись и крупный заголовок.
// Слова заголовка выезжают по очереди, когда секция появляется на экране.
export default function Head({ no, label, title }: { no: string; label: string; title: string }) {
  return (
    <header className="head" data-reveal>
      <p className="label"><b>{no}</b>{label}</p>
      <h2>
        {title.split(' ').map((word, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className="w"><span style={{ '--i': i } as CSSProperties}>{word}</span></span>
          </Fragment>
        ))}
      </h2>
    </header>
  )
}
