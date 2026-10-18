import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Process from './sections/Process'
import Contact from './sections/Contact'
import { useReveal } from './hooks/useSite'

export default function App() {
  const [preset, setPreset] = useState('')
  useReveal()
  return (
    <>
      <a className="skip" href="#about">К содержимому</a>
      <Nav />
      <main>
        <Hero /><About /><Skills />
        <Services onPick={setPreset} />
        <Projects /><Process />
        <Contact preset={preset} />
      </main>
    </>
  )
}
