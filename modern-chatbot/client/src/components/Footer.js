import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CPR Assistant</h4>
            <p>Your AI-powered guide for CPR and emergency procedures</p>
          </div>
          <div className="footer-section">
            <h4>Important</h4>
            <p>This is for educational purposes only. In real emergencies, always call professional emergency services immediately.</p>
          </div>
          <div className="footer-section">
            <h4>Emergency Numbers</h4>
            <ul>
              <li>Europe: 112</li>
              <li>USA/Canada: 911</li>
              <li>UK: 999</li>
              <li>Australia: 000</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CPR Assistant. Built with modern web technologies.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;