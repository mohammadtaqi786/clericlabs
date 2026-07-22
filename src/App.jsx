import { useLayoutEffect, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { DarkSections } from './components/DarkSections.jsx'
import { Footer } from './components/Footer.jsx'
import { FinalCta } from './components/FinalCta.jsx'
import { Hero } from './components/Hero.jsx'
import { AboutPage } from './components/AboutPage.jsx'
import './styles/common.css'

function buildWave(phase) {
  const baseY = 90
  const amp1 = 28
  const amp2 = 14
  const steps = 28
  const width = 1440
  const yAt = (x) => baseY + amp1 * Math.sin(x / 340 + phase) + amp2 * Math.sin(x / 150 + phase * 1.6)
  let d = `M 0 ${yAt(0).toFixed(2)}`

  for (let i = 1; i <= steps; i += 1) {
    const x = (i / steps) * width
    const xp = ((i - 1) / steps) * width
    const dx = x - xp
    d += ` C ${(xp + dx * 0.4).toFixed(2)} ${yAt(xp).toFixed(2)}, ${(xp + dx * 0.6).toFixed(2)} ${yAt(x).toFixed(2)}, ${x.toFixed(2)} ${yAt(x).toFixed(2)}`
  }

  return `${d} L ${width} 180 L 0 180 Z`
}

function HomePage() {
  const logoTrackRef = useRef(null)
  const waveRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(logoTrackRef.current, { xPercent: 0 }, { xPercent: -50, duration: 18, ease: 'none', repeat: -1 })
      const state = { phase: 0 }
      gsap.to(state, { phase: Math.PI * 2, duration: 10, ease: 'none', repeat: -1, onUpdate: () => waveRef.current?.setAttribute('d', buildWave(state.phase)) })
    })

    return () => context.revert()
  }, [])

  return (
    <>
      <Hero waveRef={waveRef} />
      <DarkSections trackRef={logoTrackRef} />
      <FinalCta />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}

export default App
