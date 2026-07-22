import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function seeded(seed) {
  let state = seed % 2147483647
  if (state <= 0) state += 2147483646
  return () => (state = (state * 16807) % 2147483647) / 2147483647
}

export function useCardAnimation(count = 5) {
  const root = useRef(null)
  const cardRefs = useRef([])
  cardRefs.current = []
  const addCard = (element) => element && !cardRefs.current.includes(element) && cardRefs.current.push(element)
  const center = (count - 1) / 2

  const pile = useMemo(() => {
    const random = seeded(count * 131 + 7)
    const offsets = Array.from({ length: count }, () => ({
      x: (random() - 0.5) * 24,
      y: (random() - 0.5) * 20,
      r: (random() - 0.5) * 14,
    }))
    if (offsets[2]) offsets[2].y -= 36
    return offsets
  }, [count])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const cards = cardRefs.current
      if (!cards.length) return undefined

      const media = gsap.matchMedia()
      media.add(
        {
          isDesktop: '(min-width: 1024px)',
          isTablet: '(min-width: 640px) and (max-width: 1023px)',
          isMobile: '(max-width: 639px)',
        },
        (conditions) => {
          const { isDesktop, isTablet } = conditions.conditions
          const isExpandedDeck = count > 5
          const gap = isDesktop ? (isExpandedDeck ? 72 : 108) : isTablet ? (isExpandedDeck ? 54 : 76) : (isExpandedDeck ? 40 : 52)
          const arc = isDesktop ? 15 : isTablet ? 10 : 7
          const fan = isDesktop ? 8 : 7
          const spread = cards.map((_, index) => {
            const distance = index - center
            return {
              x: distance * gap,
              y: Math.abs(distance) * arc + pile[index].y * 0.15,
              rotation: distance * fan,
              scale: 1 - Math.abs(distance) * (isDesktop ? 0.018 : 0.026),
            }
          })

          gsap.set(cards, {
            xPercent: -50,
            yPercent: -50,
            transformOrigin: '50% 100%',
            force3D: true,
          })

          const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
          intro
            .from(cards, {
              y: 72,
              opacity: 0,
              scale: 0.82,
              rotation: (index) => pile[index].r * 1.8,
              duration: 0.78,
              stagger: 0.06,
            }, 0)
            .to(cards, {
              x: (index) => pile[index].x,
              y: (index) => pile[index].y,
              rotation: (index) => pile[index].r,
              scale: 1,
              duration: 0.6,
              stagger: 0.05,
            }, 0.32)

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${window.innerHeight * 1.1}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          timeline.to(cards, {
            x: (index) => spread[index].x,
            y: (index) => spread[index].y,
            rotation: (index) => spread[index].rotation,
            scale: (index) => spread[index].scale,
            ease: 'power2.inOut',
            duration: 1,
            stagger: { each: 0.03, from: 'center' },
          })

          return () => intro.kill()
        },
      )
    }, root)

    return () => context.revert()
  }, [center, pile])

  return { root, addCard }
}
