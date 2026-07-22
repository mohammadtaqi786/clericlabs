import { useEffect, useRef, useState } from 'react'
import { process } from '../data/homepage.js'
import '../styles/components/ProcessSection.css'

export function ProcessSection() {
  const timelineRef = useRef(null)
  const [timeline, setTimeline] = useState({ progress: 0, width: 1200, height: 800 })

  useEffect(() => {
    const updateTimeline = () => {
      if (!timelineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const range = timelineRef.current.offsetHeight - window.innerHeight
      const nextProgress = Math.max(0, Math.min(1, -rect.top / Math.max(range, 1)))

      setTimeline({
        progress: nextProgress,
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateTimeline()
    window.addEventListener('scroll', updateTimeline, { passive: true })
    window.addEventListener('resize', updateTimeline, { passive: true })
    window.addEventListener('load', updateTimeline)
    return () => {
      window.removeEventListener('scroll', updateTimeline)
      window.removeEventListener('resize', updateTimeline)
      window.removeEventListener('load', updateTimeline)
    }
  }, [])

  const N = process.length
  const spacing = 360 / N
  const radius = timeline.width <= 768 ? timeline.width * 0.5 : timeline.height * 0.4

  const getStepStyle = (index) => {
    let angle = index * spacing - timeline.progress * (N - 1) * spacing
    while (angle > 180) angle -= 360
    while (angle <= -180) angle += 360

    const distance = Math.abs(angle)
    const closeness = Math.max(0, 1 - distance / spacing)
    const radians = angle * (Math.PI / 180)
    const x = radius * Math.cos(radians)
    const y = radius * Math.sin(radians)
    const tilt = -angle * (1 - closeness)

    return {
      '--c': closeness.toFixed(3),
      opacity: Math.max(0, 1 - distance / 110).toFixed(3),
      transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${tilt.toFixed(2)}deg)`,
    }
  }

  return (
    <section className="timeline-outer" id="timeline" ref={timelineRef}>
      <div className="timeline-header">
        <p className="eyebrow">Our Process</p>
        <h2 className="h2">A Simple Process. Powerful Results.</h2>
        <div className="h2-underline" />
        <p className="timeline-subhead">
          From your first call to consistent publishing, we manage the entire content workflow so you can stay focused on growing your business.
        </p>
      </div>
      <div className="timeline-pin">
        <div className="arc" />

        {process.map(([title, description], index) => (
          <div
            className="step"
            data-i={index}
            style={getStepStyle(index)}
            key={title}
          >
            <div className="step-content">
              <div className="step-dot" />
              <span className="step-num">{String(index + 1).padStart(2, '0')}</span>
              <div className="step-info">
                <h4 className="step-title">{title}</h4>
                <p className="step-desc">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
