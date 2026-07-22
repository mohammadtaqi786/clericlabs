import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../styles/components/DarkSections.css'
import { faqs, pricingPlans, testimonials, trustedCompanies } from '../data/homepage.js'
import { ProcessSection } from './ProcessSection.jsx'
import { WorkSection } from './WorkSection.jsx'
import { WhatWeDo } from './WhatWeDo.jsx'

function CheckIcon() {
  return (
    <span className="pricing-check" aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.8L9.8 5.6L14 6.2L11 9.1L11.7 13.3L8 11.3L4.3 13.3L5 9.1L2 6.2L6.2 5.6L8 1.8Z" fill="currentColor" />
    </svg>
  )
}

function TrustedLogos({ trackRef }) {
  return (
    <div className="trusted">
      <h3 className="trusted-subheading">Trusted By Growth-Focused Companies</h3>
      <p className="trusted-copy">Helping founders streamline operations, increase team productivity, and build scalable systems.</p>
      <div className="logos-marquee">
        <div className="logos-track" ref={trackRef}>
          {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
            <a
              className="brand"
              href="https://calendly.com/mohammadtaqipro/ai-systems-audit-5-slots"
              target="_blank"
              rel="noreferrer"
              key={`${company.name}-${index}`}
              aria-hidden={index >= trustedCompanies.length || undefined}
            >
              <img src={company.logo} alt={company.name} className="brand-logo-img" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function VideoCard({ testimonial }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { title, youtubeId } = testimonial

  return (
    <article className="video-card">
      <div
        className="video-frame"
        onClick={() => setIsPlaying(true)}
        style={{
          position: 'relative',
          cursor: isPlaying ? 'default' : 'pointer',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
            }}
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 1,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <span className="play">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4.8V15.2L15 10L7 4.8Z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </>
        )}
      </div>
    </article>
  )
}

function VideoTestimonials() {
  return (
    <section className="content-block" id="testimonials">
      <p className="eyebrow">Video Testimonials</p>
      <h2 className="h2">Don't Take Our Word For It</h2>
      <div className="h2-underline" />
      <p className="features-sub">Hear directly from founders we've worked with.</p>
      <div className="video-grid">
        {testimonials.map((testimonial) => (
          <VideoCard testimonial={testimonial} key={testimonial.title} />
        ))}
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section className="content-block pricing-section" id="services">
      <p className="eyebrow">Pricing</p>
      <h2 className="h2">Choose Your Growth Plan</h2>
      <div className="h2-underline" />
      <p className="features-sub">Simple pricing for founders ready to build authority and grow their brand.</p>
      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => (
          <motion.article
            className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}
            key={plan.name}
            whileHover={{ scale: 1.035, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          >
            {plan.isPopular && (
              <span className="popular-badge">
                <StarIcon />
                Most Popular
              </span>
            )}
            <h3>{plan.name}</h3>
            <div className="pricing-price">
              <strong>{plan.price}</strong>
              {plan.period && <span>{plan.period}</span>}
            </div>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
            <a href={plan.href} target="_blank" rel="noreferrer">{plan.buttonText}</a>
          </motion.article>
        ))}
      </div>
      <div className="pricing-custom">
        <p><strong>Need something custom?</strong> Let's build a plan around your goals.</p>
        <a href="https://calendly.com/mohammadtaqipro/ai-systems-audit-5-slots" target="_blank" rel="noreferrer">
          Talk to Us
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="content-block faq-section" id="faq">
      <p className="eyebrow">FAQ</p>
      <h2 className="h2">Everything You Need To Know.</h2>
      <div className="h2-underline" />
      <p className="features-sub">Answers to the most common questions before we work together.</p>
      <div className="faq-shell">
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const itemNumber = String(index + 1).padStart(2, '0')

            return (
              <article className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-number">{itemNumber}.</span>
                  <span>{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true">{isOpen ? '-' : '+'}</span>
                </button>
                <div className="faq-answer" id={`faq-answer-${index}`}>
                  <p>{faq.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function DarkSections({ trackRef }) {
  return (
    <section className="dark" id="features">
      <div className="container">
        <TrustedLogos trackRef={trackRef} />
      </div>
      <WhatWeDo />
      <div className="container">
        <WorkSection />
        <VideoTestimonials />
      </div>
      <ProcessSection />
      <div className="container">
        <ServicesSection />
        <FaqSection />
      </div>
    </section>
  )
}
