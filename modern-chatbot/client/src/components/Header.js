import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">CPR Assistant</span>
          </div>
          <nav className="nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#help" className="nav-link">Help</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;