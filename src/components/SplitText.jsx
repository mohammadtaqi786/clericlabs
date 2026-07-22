import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

export default function SplitText({ tag: Tag = 'p', className = '', text, splitType = 'chars', delay = 0, duration = 0.8, ease = 'power3.out', from, to }) {
  const root = useRef(null)
  const parts = useMemo(() => (splitType === 'chars' ? Array.from(text) : text.split(/\s+/)), [splitType, text])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const items = gsap.utils.toArray('.split-item')
      gsap.fromTo(items, from, { ...to, duration, ease, stagger: delay / 1000 })
    }, root)

    return () => context.revert()
  }, [delay, duration, ease, from, to])

  return (
    <Tag className={className} ref={root} aria-label={text}>
      {parts.map((part, index) => (
        <span className="split-line" key={`${part}-${index}`} aria-hidden="true">
          <span className="split-item">{splitType === 'chars' && part === ' ' ? '\u00a0' : part}{splitType === 'words' && index < parts.length - 1 ? '\u00a0' : ''}</span>
        </span>
      ))}
    </Tag>
  )
}
