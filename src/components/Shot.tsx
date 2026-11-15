import { useState, type ReactNode } from 'react'

// Слот под картинку из public/. Пока src пустой или файл не найден,
// показывается заглушка (children) — битой картинки не будет.
export default function Shot({ src, alt = '', children }: { src: string; alt?: string; children: ReactNode }) {
  const [ok, setOk] = useState(false)
  const [fail, setFail] = useState(false)
  if (!src || fail) return <>{children}</>
  return (
    <>
      {!ok && children}
      <img className="shot" src={src} alt={alt} hidden={!ok} onLoad={() => setOk(true)} onError={() => setFail(true)} />
    </>
  )
}
