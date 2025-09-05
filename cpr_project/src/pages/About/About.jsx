import React from 'react'
import "./about.css"

const About = () => {
  return (
    <div className='about-container'>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">❤️</span>
            <span className="badge-text">Saving Lives Through Education</span>
          </div>
          <h1 className="hero-title">About LifeSaver Project</h1>
          <p className="hero-subtitle">
            Empowering everyone with life-saving knowledge through interactive learning, 
            AI-powered assistance, and comprehensive first aid education.
          </p>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Minutes to brain damage</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10%</div>
            <div className="stat-label">Survival increase per minute</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Free education</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="content-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-icon mission-icon">🎯</div>
            <h2 className="section-title">Our Mission</h2>
          </div>
          <div className="mission-content">
            <p className="mission-text">
              Cardiac arrest affects millions globally, with survival rates heavily dependent on immediate CPR intervention. 
              Studies show that brain damage begins after just 5 minutes without oxygen, yet many people lack proper CPR knowledge.
            </p>
            <p className="mission-text">
              <strong>LifeSaver Project</strong> bridges this critical gap by providing accessible, interactive, and comprehensive 
              first aid education that can literally save lives in emergency situations.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-icon features-icon">⚡</div>
            <h2 className="section-title">What We Offer</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon quiz-icon">📖</div>
              <h3 className="feature-title">Interactive Knowledge Test</h3>
              <p className="feature-description">
                14-question comprehensive quiz with instant feedback to test and improve your CPR knowledge.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon instructions-icon">✚</div>
              <h3 className="feature-title">Step-by-Step Instructions</h3>
              <p className="feature-description">
                Visual guides with animated demonstrations for CPR techniques and AED usage.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon chatbot-icon">💬</div>
              <h3 className="feature-title">AI Virtual Assistant</h3>
              <p className="feature-description">
                Rasa-powered chatbot trained on medical protocols to answer your first aid questions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-icon team-icon">👥</div>
            <h2 className="section-title">Our Team</h2>
          </div>
          <div className="team-content">
            <div className="team-card">
              <div className="team-logo">
                <img src="/images/logo.png" alt="JGU Logo" className="logo-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">Data Mining Group</h3>
                <p className="team-institution">Johannes Gutenberg University Mainz, Germany</p>
                <p className="team-description">
                  Leading research group in artificial intelligence and machine learning applications 
                  for healthcare and medical education.
                </p>
                <a href="https://www.datamining.informatik.uni-mainz.de/" 
                   className="team-link" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  Visit Research Group →
                </a>
              </div>
            </div>
            <div className="team-card">
              <div className="team-logo funding-logo">
                <div className="funding-icon">💰</div>
              </div>
              <div className="team-info">
                <h3 className="team-name">Curatime Project</h3>
                <p className="team-institution">AI for Healthcare Initiative</p>
                <p className="team-description">
                  Supporting innovative AI solutions that improve health outcomes and make 
                  medical knowledge more accessible to everyone.
                </p>
                <a href="https://curatime.org/" 
                   className="team-link" 
                   target="_blank" 
                   rel="noopener noreferrer">
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-icon impact-icon">💝</div>
            <h2 className="section-title">Our Impact</h2>
          </div>
          <div className="impact-content">
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-number">11</div>
                <div className="impact-label">Medical Intents</div>
                <div className="impact-description">Trained AI responses</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">5</div>
                <div className="impact-label">Core Features</div>
                <div className="impact-description">Interactive learning tools</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">24/7</div>
                <div className="impact-label">Availability</div>
                <div className="impact-description">Always accessible</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">100%</div>
                <div className="impact-label">Privacy Protected</div>
                <div className="impact-description">Anonymous learning</div>
              </div>
            </div>
            <div className="impact-message">
              <p>
                Every minute counts in a cardiac emergency. Our platform ensures that when the moment comes, 
                you'll have the knowledge and confidence to act decisively and save a life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="tech-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-icon tech-icon">🔧</div>
            <h2 className="section-title">Technology Stack</h2>
          </div>
          <div className="tech-grid">
            <div className="tech-category">
              <h3 className="tech-category-title">Frontend</h3>
              <div className="tech-items">
                <span className="tech-item">React.js 18.3.1</span>
                <span className="tech-item">React Router</span>
                <span className="tech-item">Axios</span>
              </div>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">Backend</h3>
              <div className="tech-items">
                <span className="tech-item">Rasa 3.6.20</span>
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Express.js</span>
              </div>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">Database</h3>
              <div className="tech-items">
                <span className="tech-item">PostgreSQL</span>
                <span className="tech-item">Docker</span>
                <span className="tech-item">Analytics</span>
              </div>
            </div>
            <div className="tech-category">
              <h3 className="tech-category-title">Deployment</h3>
              <div className="tech-items">
                <span className="tech-item">Docker Compose</span>
                <span className="tech-item">Nginx</span>
                <span className="tech-item">Multi-service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Learn Life-Saving Skills?</h2>
          <p className="cta-description">
            Join thousands of people who have already improved their emergency response knowledge.
          </p>
          <div className="cta-buttons">
            <a href="/quiz" className="cta-button primary">Take the Quiz</a>
            <a href="/instructions" className="cta-button secondary">Learn CPR</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About