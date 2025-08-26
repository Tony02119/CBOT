import React from 'react'
import "./instructions.css"
import { Link } from 'react-router-dom';

const Instructions = () => {
  return (
    <div className='box'>
      <div className="title-section">
        <h1 className="page-title">First Aid Instructions</h1>
        <p className="page-subtitle">Learn life-saving techniques with step-by-step visual guides</p>
      </div>
      
      <div className="upper-div">
        <Link to="/cprinstruction" className="card">
          <div className="card-icon">
            ❤️
          </div>
          <h2 className="card-title">CPR Instructions</h2>
          <p className="card-description">Learn how to perform Cardiopulmonary Resuscitation with detailed step-by-step instructions</p>
          <span className="card-button">Start Learning</span>
        </Link>

        <Link to="/aedinstruction" className="card">
          <div className="card-icon">
            ⚡
          </div>
          <h2 className="card-title">AED Instructions</h2>
          <p className="card-description">Master the use of Automatic External Defibrillator with visual guidance</p>
          <span className="card-button">Start Learning</span>
        </Link>
      </div>
    </div>
  )
}

export default Instructions