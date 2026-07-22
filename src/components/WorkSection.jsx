import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../styles/components/WorkSection.css'
import { ArrowIcon } from './common/Icons.jsx'

const carouselCards = [
  {
    eyebrow: 'Carousel 01',
    title: 'Founder POV',
    metric: '8.4k saves',
    accent: 'orange',
    img: '/caraousel/car7.png',
  },
  {
    eyebrow: 'Carousel 02',
    title: 'Market Lessons',
    metric: '42% share rate',
    accent: 'purple',
    img: '/caraousel/slide1.jpg',
  },
  {
    eyebrow: 'Carousel 03',
    title: 'Growth Playbook',
    metric: '3.1x reach',
    accent: 'pink',
    img: '/caraousel/slide2.webp',
  },
]

const positions = [
  { x: -46, y: 12, rotation: -11, scale: 0.92, zIndex: 1 },
  { x: 0, y: -2, rotation: 0, scale: 1, zIndex: 3 },
  { x: 46, y: 12, rotation: 11, scale: 0.92, zIndex: 2 },
]

function ReelPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div
      className="reel-frame"
      onClick={togglePlay}
      style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden', height: '100%', minHeight: '392px' }}
      aria-label="Play short-form reel video"
    >
      <video
        ref={videoRef}
        src="/reels/sample2.mp4"
        playsInline
        loop
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        onEnded={() => setIsPlaying(false)}
      />
      {!isPlaying && (
        <div
          className="reel-play-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(0, 0, 0, 0.35)',
            zIndex: 2,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div className="reel-play">
            <span />
          </div>
        </div>
      )}
    </div>
  )
}

export function WorkSection() {
  const fanRef = useRef(null)
  const hasEntered = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const cards = fanRef.current?.querySelectorAll('.work-fan-card')
    if (!cards?.length) return undefined

    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        const slot = (index - activeIndex + 1 + carouselCards.length) % carouselCards.length
        const position = positions[slot]

        if (!hasEntered.current) {
          gsap.fromTo(
            card,
            { x: 0, y: 60, rotation: 0, scale: 0.82, opacity: 0, zIndex: position.zIndex },
            {
              ...position,
              opacity: 1,
              duration: 1.1,
              delay: 0.12 + slot * 0.08,
              ease: 'elastic.out(1, 0.8)',
              onComplete: () => {
                hasEntered.current = true
              },
            },
          )
          return
        }

        gsap.to(card, {
          ...position,
          opacity: 1,
          duration: 0.62,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }, fanRef)

    return () => context.revert()
  }, [activeIndex])

  return (
    <section className="work-section content-block" id="work">
      <div className="work-heading">
        <p className="eyebrow">Our Work</p>
        <h2 className="h2">Work That Speaks For Itself.</h2>
        <div className="h2-underline" />
        <p className="features-sub wide">
          Every carousel and reel is designed with one goal - help founders earn attention that translates into trust,
          conversations, and growth.
        </p>
      </div>

      <div className="work-grid">
        <article className="work-panel work-carousel-panel">
          <div className="work-panel-copy">
            <span>Carousel</span>
            <h3>Instagram Carousels</h3>
            <p>Built to educate, spark conversations, and earn saves.</p>
          </div>

          <div className="work-fan" ref={fanRef} aria-label="Instagram carousel examples">
            {carouselCards.map((card, index) => (
              <button
                className={`work-fan-card accent-${card.accent} ${activeIndex === index ? 'is-active' : ''}`}
                key={card.title}
                type="button"
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                style={card.img ? { backgroundImage: `url("${card.img}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              />
            ))}
          </div>
        </article>

        <article className="work-panel work-reels-panel">
          <div className="work-panel-copy reels-copy">
            <span>Reels</span>
            <h3>Short-Form Reels</h3>
            <p>Edited to stop the scroll and keep your audience watching.</p>
          </div>

          <div className="work-phone" aria-label="Short-form reel mockup">
            <div className="work-phone-screen">
              <ReelPlayer />
            </div>
          </div>
        </article>
      </div>

      <div className="work-section-cta">
        <a
          className="cta-btn work-full-button"
          href="https://calendly.com/mohammadtaqipro/ai-systems-audit-5-slots"
          target="_blank"
          rel="noreferrer"
        >
          See Full Work
          <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
