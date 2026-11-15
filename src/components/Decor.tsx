// Фоновый декор секции: фрагмент сетки и синее свечение с параллаксом.
export default function Decor({ side = 'r' }: { side?: 'l' | 'r' }) {
  return (
    <div className={'decor decor--' + side} aria-hidden="true">
      <i className="decor__grid" data-parallax="0.12" />
      <i className="decor__glow" data-parallax="-0.18" />
    </div>
  )
}
