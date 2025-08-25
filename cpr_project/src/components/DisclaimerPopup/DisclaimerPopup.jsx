import React, { useState } from 'react';
import './DisclaimerPopup.css';

const DisclaimerPopup = ({ onAccept }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">
          Welcome to <span className="highlight">Lifesaver</span>
        </h2>
        <p className="popup-text">
          This demo uses AI to simulate or display health-related data.
        </p>
        <p className="popup-text">
          <span className="highlight">Disclaimer:</span> This application is for informational and educational purposes only.
          It is not a substitute for professional medical
                advice, diagnosis, or treatment. Always seek the advice of your
                doctor or other qualified health provider with any questions you
                may have regarding a medical treatment.
        </p>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="consent"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="consent">I have read and understood the above</label>
        </div>
        <button
          disabled={!checked}
          className="confirm-button"
          onClick={onAccept}
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default DisclaimerPopup;