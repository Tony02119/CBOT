import React, { useState, useEffect } from 'react';
import "./navbar.css";
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const closeMenu = () => {
    setIsOpen(false);
  }

  // Effet de scroll pour la navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo-box">
          <Link to="/" style={{ height: "100%" }}>
            <img src="/images/logo.png" alt="LifeSaver Logo" />
          </Link>
          <Link to="https://nightingaleheart.com/demos/healthlife" style={{ textDecoration: 'none' }}>
            <button>
              <ChevronLeft style={{ backgroundColor: 'transparent' }} />
              <span className="btn-style">Return to HealthLife</span>
            </button>
          </Link>
        </div>

        {/* Navigation desktop */}
        <div className="navbar-link-box">
          <Link 
            to="/" 
            className={`link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/quiz" 
            className={`link ${isActive('/quiz') ? 'active' : ''}`}
          >
            Knowledge Test
          </Link>
          <Link 
            to="/instructions" 
            className={`link ${isActive('/instructions') || isActive('/cprinstruction') || isActive('/aedinstruction') ? 'active' : ''}`}
          >
            First Aid
          </Link>
          <Link 
            to="/chatbot" 
            className={`link ${isActive('/chatbot') ? 'active' : ''}`}
          >
            Virtual Assistant
          </Link>
          <Link 
            to="/about" 
            className={`link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
        </div>

        {/* Hamburger menu mobile */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      {/* Overlay pour fermer le menu mobile */}
      <div 
        className={`menu-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      ></div>

      {/* Menu mobile */}
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <Link 
          to="/" 
          className={`side-link ${isActive('/') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link 
          to="/quiz" 
          className={`side-link ${isActive('/quiz') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Knowledge Test
        </Link>
        <Link 
          to="/instructions" 
          className={`side-link ${isActive('/instructions') || isActive('/cprinstruction') || isActive('/aedinstruction') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          First Aid
        </Link>
        <Link 
          to="/chatbot" 
          className={`side-link ${isActive('/chatbot') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Virtual Assistant
        </Link>
        <Link 
          to="/about" 
          className={`side-link ${isActive('/about') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          About
        </Link>
      </div>
    </>
  )
}

export default Navbar;