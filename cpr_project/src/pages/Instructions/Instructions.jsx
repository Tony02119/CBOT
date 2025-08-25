import React from 'react'
import "./instructions.css"

import { Link } from 'react-router-dom';


const Instructions = () => {
  return (
    <div className='box'>
      <div className="upper-div">
        <Link to="/cprinstruction" className="card">  {/* CPR instruction page*/}
          <div>
            <p>How to perform CPR</p>
            <p>(Cardiopulmonary Resuscitation)</p>
          </div>
        </Link>

        <Link to="/aedinstruction" className="card">  {/* AED instruction page*/}
          <div>
            <p>How to use an AED</p>
            <p>(Automatic External Defibrillator)</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Instructions
