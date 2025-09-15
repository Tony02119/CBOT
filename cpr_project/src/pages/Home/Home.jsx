import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">LifeSaver Project</h1>
          <p className="subtitle">Learn life-saving skills through interactive lessons, test your knowledge, and get instant help from our virtual assistant.</p>
        </div>
      </div>
      
      <div className="features-section">
        <div className="cards-container">
          <Link to="/quiz" className="feature-card knowledge-card">
            <div className="card-header">
              <div className="card-icon knowledge-icon">
                📖
              </div>
              <h2 className="card-title">Knowledge Test</h2>
            </div>
            <div className="card-body">
              <p className="card-description">Test your understanding of CPR and first aid procedures with our interactive quiz.</p>
            </div>
            <div className="card-footer">
              <span className="card-button red-button">Start Test</span>
            </div>
          </Link>

          <Link to="/instructions" className="feature-card instructions-card">
            <div className="card-header">
              <div className="card-icon first-aid-icon">
                ✚
              </div>
              <h2 className="card-title">First Aid Steps</h2>
            </div>
            <div className="card-body">
              <p className="card-description">Learn step-by-step CPR and AED procedures with visual guides and animations.</p>
            </div>
            <div className="card-footer">
              <span className="card-button red-button">Learn Now</span>
            </div>
          </Link>

          <Link to="/chatbot" className="feature-card assistant-card">
            <div className="card-header">
              <div className="card-icon assistant-icon">
                💬
              </div>
              <h2 className="card-title">Virtual Assistant</h2>
            </div>
            <div className="card-body">
              <p className="card-description">Get instant answers to your first aid questions from our AI-powered assistant.</p>
            </div>
            <div className="card-footer">
              <span className="card-button green-button">Ask Questions</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="info-section">
        <div className="info-content">
          <h3 className="info-title">Why Learn CPR?</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Minutes to brain damage</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10%</div>
              <div className="stat-label">Survival increase per minute</div>
            </div>
          </div>
          <p className="info-text">
            Every second counts in a cardiac emergency. Learning CPR can double or triple a victim's chance of survival.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home