import React from 'react';
import "./instructions.css";
import { Link } from 'react-router-dom';

const Instructions = () => {
  return (
    <div className='box'>
      <div className="upper-div">
        <Link to="/cprinstruction" className="card"> {/* CPR instruction page */}
          <div>
            <p style={{ fontSize: "1.5em", fontWeight: "bold" , marginBottom: "-10px"}}>How to perform CPR</p>
            <p style={{ fontSize: "1em" }}>(Cardiopulmonary Resuscitation)</p>
          </div>
          <img
            src="/images/cpr_logo.png"
            style={{
              width: "80px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          />
        </Link>

        <Link to="/aedinstruction" className="card"> {/* AED instruction page */}
          <div>
            <p style={{ fontSize: "1.5em", fontWeight: "bold" , marginBottom: "-10px"}}>How to use an AED</p>
            <p style={{ fontSize: "1em" }}>(Automatic External Defibrillator)</p>
            <img
              src="/images/aed_logo.png"
              style={{
                width: "80px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Instructions;
