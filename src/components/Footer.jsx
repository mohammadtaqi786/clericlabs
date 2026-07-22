import clericlabsLogo from '../logos/clericlabs.png'
import '../styles/components/Footer.css'

const navigate = [
  ['Home', '/'],
  ['About Us', '#'],
  ['Case Studies', '/#services'],
]

const services = [
  ['Content Strategy', '#services'],
  ['Carousels', '#services'],
  ['Reels', '#services'],
  ['Personal Branding', '#services'],
]

const connect = [
  ['LinkedIn', 'https://www.linkedin.com/company/clericlabs'],
  ['Instagram', 'https://instagram.com/clericlabs'],
  ['X', 'https://x.com/clericlabs'],
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <a className="footer-logo" href="#top" aria-label="Cleric Labs home">
            <img src={clericlabsLogo} alt="ClericLabs" className="footer-logo-img" />
            <span className="logo-text">Cleric Labs</span>
          </a>
          <p>Building founder brands that compound.</p>
        </div>

        <div className="footer-directory">
          <div className="footer-column">
            <p className="footer-label">Navigation</p>
            <div className="footer-links">
              {navigate.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-label">Services</p>
            <div className="footer-links">
              {services.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-label">Connect</p>
            <div className="footer-links">
              {connect.map(([label, href]) => (
                <a
                  href={href}
                  key={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Cleric Labs. All rights reserved.</p>
        <div>
          <a href="#top">Privacy Policy</a>
          <a href="#top">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
