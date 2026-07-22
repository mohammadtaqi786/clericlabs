import { useState } from 'react'
import clericlabsLogo from '../logos/clericlabs.png'
import '../styles/components/NavBar.css'

const navLinks = [
  ['Home', '/'],
  ['About Us', '#'],
  ['Case Study', '/#testimonials'],
]

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="logo" href="#top" aria-label="ClericLabs home" onClick={closeMenu}>
        <img src={clericlabsLogo} alt="ClericLabs" className="nav-logo-img" />
        <span className="logo-text">ClericLabs</span>
      </a>

      <div className={`nav-links ${isOpen ? 'is-open' : ''}`}>
        {navLinks.map(([label, href]) => (
          <a className="nav-item" href={href} key={label} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <a
          className="nav-cta"
          href="https://calendly.com/mohammadtaqipro/ai-systems-audit-5-slots"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          Book a Call
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
