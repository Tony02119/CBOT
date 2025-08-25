import React from 'react'
import "./home.css"

import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className='box'>
      <div className="upper-div">
        
        <Link to="/quiz" className="card">  {/* Quiz page card */}
          <div>
            <p>TEST</p>
            <p>YOUR</p>
            <p>KNOWLEDGE</p>
          </div>
        </Link>

        <Link to="/instructions" className="card">  {/* Instructions page card */}
          <div>
            <p>LEARN</p>
            <p>HOW</p>
            <p>TO</p>
          </div>
        </Link>
      </div>
      
      <div className="lower-div">
        <Link to="/chatbot" className="chatbot-card">  {/* Chatbot card */}
        <div>ASK QUESTIONS</div>
        </Link>
      </div>
    </div>
  )
}

export default Home