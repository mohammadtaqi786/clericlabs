import '../styles/components/AboutAndCta.css'

export function AboutAndCta() {
  return (
    <>
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="kicker">About ClericLabs</div>
          <h2>Building <span className="italic-text">AI-native</span> companies.</h2>
          <div className="h2-underline" />
          <div className="about-text">
            <p>We help growth-stage businesses streamline operations, increase output, and scale with AI-powered systems.</p>
            <p>Our focus is simple. Build systems that help companies operate smarter, move faster, and grow efficiently.</p>
          </div>
        </div>
      </section>

      <section className="founder-section">
        <div className="founder-inner">
          <div className="founder-section-heading">
            <div className="kicker">Meet the Founder</div>
            <h2>Practical systems.<br /><span className="italic-text">Lasting leverage.</span></h2>
            <div className="h2-underline" />
          </div>

          <div className="founder-editorial">
            <div className="founder-portrait-side">
              <span className="founder-portrait-label">ClericLabs / Founder</span>
            </div>

            <div className="founder-content-side">
              <div className="founder-quote-block">
                <p className="founder-quote">It's not about AI.<br />It's about <span className="italic-text">better ways of working.</span></p>
                <p className="founder-summary">Mohammed helps growth-stage companies turn operational friction into clear, scalable AI systems their teams can actually use.</p>
              </div>

              <div className="founder-footnote-block">
                <span className="founder-asterisk">*</span>
                <span className="founder-footnote-text">tools are easy.<br />systems are rare.</span>
              </div>

              <div className="founder-name-block">
                <div className="founder-name">Mohammed</div>
                <div className="founder-role">AI Strategist &amp; Systems Builder</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
