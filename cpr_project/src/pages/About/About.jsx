import React from 'react'
import "./about.css"

const About = () => {
  return (
    <div className='about-container'>

      {/* Intro / Hero */}
      <div className="hero-content">
        <h1 className="hero-title">About LifeSaver Project</h1>
        <p className="hero-subtitle">
          Empowering everyone with life-saving knowledge through interactive learning, 
          AI-powered assistance, and comprehensive first aid education.
        </p>
      </div>

      {/* Mission */}
      <div className="section-container">
        <div className="section-header">
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

      {/* Impact */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Impact</h2>
        </div>
        <div className="impact-content">
          <div className="impact-grid">
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

      {/* Key Stats */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Key Facts</h2>
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
      </div>

      {/* Team */}
      <div className="section-container">
        <div className="section-header">
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
      <div className="about-end-margin"></div>
    </div>
    
  )
}

export default About
