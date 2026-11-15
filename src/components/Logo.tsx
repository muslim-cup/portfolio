import Shot from './Shot'

// Знак студии в SVG: серебристая F и синий квадрат.
export function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="f-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f5f7" />
          <stop offset="1" stopColor="#8f96a3" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" fill="#050506" />
      <path d="M8 7h14v4H12v3h7v4h-7v7H8z" fill="url(#f-silver)" />
      <rect x="20" y="21" width="4" height="4" fill="#2f6bff" />
    </svg>
  )
}

// Если есть public/images/logo.png — показывается он, иначе SVG-знак.
export default function Logo() {
  return <span className="logo"><Shot src="images/logo.png"><Mark /></Shot></span>
}
