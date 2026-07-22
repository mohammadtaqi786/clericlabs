import '../styles/components/FinalCta.css'

export function FinalCta() {
  return (
    <section className="final-cta-section" id="call">
      <div className="final-cta-shell">
        <div className="final-cta-card">
          <div className="final-cta-grid">
            <div className="final-cta-content">
              <p className="eyebrow">BOOK A STRATEGY CALL</p>
              <h2>Ready To Build A Brand That Sells?</h2>
              <div className="h2-underline" style={{ marginLeft: '0', marginRight: 'auto' }} />
              <p>Choose a time that works for you. We'll learn about your business, understand your goals, and show you how Cleric Labs can help you build a brand that attracts opportunities.</p>
            </div>
            
            <div className="calendly-embed-container">
              <iframe 
                src="https://calendly.com/mohammadtaqipro/ai-systems-audit-5-slots?hide_landing_page_details=1&hide_event_type_details=1&hide_gdpr_banner=1&background_color=06070d&text_color=ffffff&primary_color=7aa2ff" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                title="Calendly Strategy Call Scheduling"
                style={{ border: 'none', width: '100%', height: '380px' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
