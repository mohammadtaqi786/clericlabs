import ScrollStack, { ScrollStackItem } from './ScrollStack.jsx'
import '../styles/components/WhatWeDo.css'

const ITEMS = [
  { n: '01', t: 'Clarify Your Positioning', d: 'Build a message people remember.' },
  { n: '02', t: 'Content That Converts', d: 'Carousels designed to educate and sell.' },
  { n: '03', t: 'Scroll-Stopping Reels', d: 'Short-form videos built for attention.' },
  { n: '04', t: 'Distribution Systems', d: 'Consistency without the guesswork.' },
]

export function WhatWeDo() {
  return (
    <section className="wwd">
      <div className="wwd-head">
        <span className="wwd-eyebrow">What we do</span>
        <h2 className="wwd-title">Build A Brand That Compounds.</h2>
        <p className="wwd-sub">Content, reels, and growth systems designed to keep founders visible, trusted, and impossible to ignore.</p>
      </div>

      <ScrollStack
        useWindowScroll
        itemDistance={90}
        itemStackDistance={26}
        itemScale={0.035}
        baseScale={0.88}
        stackPosition="22%"
        scaleEndPosition="12%"
      >
        {ITEMS.map((item) => (
          <ScrollStackItem key={item.n} itemClassName="wwd-card">
            <span className="wwd-num">{item.n}</span>
            <div className="wwd-card-copy">
              <h3 className="wwd-card-title">{item.t}</h3>
              <p className="wwd-card-desc">{item.d}</p>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
