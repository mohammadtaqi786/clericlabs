import { NavBar } from './NavBar.jsx'
import { AboutAndCta } from './AboutAndCta.jsx'
import { FinalCta } from './FinalCta.jsx'
import { Footer } from './Footer.jsx'
import '../styles/components/AboutPage.css'

export function AboutPage() {
  return (
    <>
      <div className="about-page-hero">
        <NavBar />
        <div className="about-page-hero-content">
          <p className="eyebrow">About</p>
          <h1 className="about-page-headline">
            The team behind <span className="serif-italic">ClericLabs.</span>
          </h1>
        </div>
      </div>

      <AboutAndCta />
      <FinalCta />
      <Footer />
    </>
  )
}
