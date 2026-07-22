import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from './SplitText.jsx'
import clericlabsLogo from '../logos/clericlabs.png'
import '../styles/components/Hero.css'

const DEFAULT_CARDS = [
  { img: '/caraousel/car10.png', label: '01' },
  { img: '/caraousel/car1.png', label: '02' },
  { img: '/caraousel/car8.png', label: '03' },
  { img: '/caraousel/car3.png', label: '04' },
  { img: '/caraousel/car11.png', label: '05' },
  { img: '/caraousel/car5.webp', label: '06' },
  { img: '/caraousel/car7.png', label: '07' },
]

export function Hero({
  cards = DEFAULT_CARDS,
  title = '45 mins/week is all you need',
  subtitle = 'to build a 6-figure brand for your personal branding',
  body = 'Build a personal brand online without giving up your week.',
  cta = 'Book a Call',
}) {
  const root = useRef(null)
  const cardRefs = useRef([])
  cardRefs.current = []
  const addCard = (element) => element && !cardRefs.current.includes(element) && cardRefs.current.push(element)
  const count = cards.length
  const center = (count - 1) / 2

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const elements = cardRefs.current
      const media = gsap.matchMedia()

      media.add(
        {
          isDesktop: '(min-width: 1024px)',
          isTablet: '(min-width: 640px) and (max-width: 1023px)',
          isMobile: '(max-width: 639px)',
        },
        (conditions) => {
          const { isDesktop, isTablet } = conditions.conditions
          const gap = isDesktop ? 132 : isTablet ? 92 : 56
          const arc = isDesktop ? 24 : isTablet ? 16 : 10
          const fan = isDesktop ? 6 : 5
          const riseFrom = window.innerHeight * 0.9
          const spread = elements.map((_, index) => {
            const distance = index - center
            return {
              x: distance * gap,
              y: Math.abs(distance) * arc * 0.6,
              rotation: distance * fan,
              scale: 1 - Math.abs(distance) * (isDesktop ? 0.012 : 0.02),
            }
          })

          gsap.set(elements, {
            xPercent: -50,
            yPercent: -50,
            transformOrigin: '50% 50%',
            force3D: true,
            x: 0,
            y: riseFrom,
            rotation: 0,
            opacity: 0,
          })
          gsap.set('.hero-cta', { opacity: 0, y: 46 })

          const timeline = gsap.timeline({ delay: 0.85, defaults: { ease: 'power3.out' } })
          timeline
            .to(elements, {
              x: (index) => spread[index].x,
              y: (index) => spread[index].y,
              rotation: (index) => spread[index].rotation,
              scale: (index) => spread[index].scale,
              opacity: 1,
              duration: 1.1,
              stagger: { each: 0.08, from: 'center' },
            }, 0)
            .to('.hero-cta', { opacity: 1, y: 0, duration: 0.5 }, '-=0.25')

          return () => timeline.kill()
        },
      )

      return () => media.revert()
    }, root)

    return () => context.revert()
  }, [count, center])

  return (
    <>
      <nav className="hero-nav" aria-label="Primary navigation">
        <div className="nav-inner">
          <a className="nav-brand" href="#top" aria-label="ClericLabs home">
            <img src={clericlabsLogo} alt="ClericLabs" className="nav-logo-img" />
            <span className="logo-text">ClericLabs</span>
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="#testimonials">Case Study</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
          <a
            className="nav-btn"
            href="https://calendly.com/mohammadtaqipro/ai-systems-audit-5-slots"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Book a call
          </a>
        </div>
      </nav>

      <section className="hero" id="top" ref={root}>
        <div className="hero-top-left-gradient" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="title-wrap">
              <SplitText tag="h1" className="hero-title" text={title} splitType="chars" delay={50} duration={1.6} ease="power3.out" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
            </div>
            <div className="sub-wrap">
              <SplitText tag="p" className="hero-sub" text={subtitle} splitType="words" delay={30} duration={0.9} ease="power3.out" from={{ opacity: 0, y: 24 }} to={{ opacity: 1, y: 0 }} />
            </div>
          </div>

          <div className="hero-stage">
            {cards.map((card, index) => (
              <article
                className="card"
                key={`${card.label}-${index}`}
                ref={addCard}
                style={{
                  zIndex: 100 - Math.round(Math.abs(index - center) * 10),
                  ...(card.img ? { backgroundImage: `url(${card.img})` } : { background: card.grad }),
                }}
                aria-hidden="true"
              >
                {!card.img && <span className="card-label">{card.label}</span>}
              </article>
            ))}
          </div>

          <div className="hero-cta">
            <p className="hero-body">{body}</p>
            <a
              className="hero-btn"
              href="https://calendly.com/mohammadtaqipro/ai-systems-audit-5-slots"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <span>{cta}</span>
              <svg className="btn-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
