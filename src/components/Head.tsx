// Заголовок секции: номер, подпись и крупный заголовок.
export default function Head({ no, label, title }: { no: string; label: string; title: string }) {
  return (
    <header className="head" data-reveal>
      <p className="label"><b>{no}</b>{label}</p>
      <h2>{title}</h2>
    </header>
  )
}
