import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='box'>
      <div className="title-section">
        <h1 className="main-title">LifeSaver Project</h1>
        <p className="subtitle">Learn life-saving skills through interactive lessons, test your knowledge, and get instant help from our virtual assistant.</p>
      </div>
      
      <div className="cards-container">
        <Link to="/quiz" className="feature-card">
          <div className="card-icon knowledge-icon">
            📖
          </div>
          <h2 className="card-title">Knowledge Test</h2>
          <p className="card-description">Test your understanding of CPR and first aid procedures with our interactive quiz.</p>
          <span className="card-button red-button">Start</span>
        </Link>

        <Link to="/instructions" className="feature-card">
          <div className="card-icon first-aid-icon">
            ✚
          </div>
          <h2 className="card-title">First Aid Steps</h2>
          <p className="card-description">Learn step-by-step CPR and AED procedures with visual guides and animations.</p>
          <span className="card-button red-button">Start</span>
        </Link>

        <Link to="/chatbot" className="feature-card">
          <div className="card-icon assistant-icon">
            💬
          </div>
          <h2 className="card-title">Your Virtual Assistant</h2>
          <p className="card-description">Get instant answers to your first aid questions from our AI-powered assistant.</p>
          <span className="card-button green-button">Open</span>
        </Link>
      </div>
    </div>
  )
}

export default Home