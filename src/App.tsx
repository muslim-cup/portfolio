import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Niches from './sections/Niches'
import Projects from './sections/Projects'
import Process from './sections/Process'
import About from './sections/About'
import Contact from './sections/Contact'
import { useParallax, useReveal } from './hooks/useSite'

export default function App() {
  // Услуга, выбранная в блоке «Услуги», подставляется в форму заявки
  const [preset, setPreset] = useState('')
  useReveal()
  useParallax()
  // Ссылка вида сайт/#contact: прокручиваем к секции после отрисовки страницы
  useEffect(() => {
    if (location.hash.length > 1) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
  }, [])
  return (
    <>
      <a className="skip" href="#services">К содержимому</a>
      <Nav />
      <main>
        <Hero />
        <Services onPick={setPreset} />
        <Niches />
        <Projects />
        <Process />
        <About />
        <Contact preset={preset} />
      </main>
    </>
  )
}
