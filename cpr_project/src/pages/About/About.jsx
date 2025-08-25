import React from 'react'
import "./about.css"

const About = () => {
  return (
    <div className='box'>
      <div className="inst-card about">
        <div className="about-div">
            <h2 className="about-title">What Does This Project Do?</h2>
            <p className='about-text'>The CPR Project is an educational platform aimed at enhancing public knowledge and preparedness for cardiopulmonary resuscitation (CPR) and first aid. It features an interactive quiz to teach users CPR steps and defibrillator usage, as well as a chatbot that provides real-time responses to common questions, creating an engaging learning experience. The project is designed to help individuals feel more confident and capable of taking action in emergency situations.</p>
        </div>
        <div className="about-div">
            <h2 className="about-title">Who Are We?</h2>
            <p className='about-text'>The app was developed for the Data Mining group, JGU Mainz, Gemany. The Curatime project seeks to use AI to improve health.</p>
        </div>
      </div>
    </div>
  )
}

export default About