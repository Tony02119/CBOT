import React, { useState } from 'react';
import "./navbar.css";
import { Link } from 'react-router-dom';
import { ChevronLeft } from "lucide-react"



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // to check the sidebar is open or not

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }



  return (
    <div className='navbar'>
      <div className="navbar-logo-box">
        <Link to="/" style={{ height: "100%" }}>
          <img src="/images/logo.png" alt="" />
        </Link>
        <Link to="https://nightingaleheart.com/demos/healthlife" style={{ textDecoration: 'none' }}>
          <button>
            <ChevronLeft style={{ backgroundColor: 'transparent' }} />
            <span className="btn-style">Return to HealthLife</span>
          </button>
        </Link>
      </div>

      {/* For default screen */}

      <div className="navbar-link-box"> {/* Normal navbar links menu */}
        <Link to="/" className='link'>Home</Link>
        <Link to="/quiz" className='link'>Quiz</Link>
        <Link to="/instructions" className='link'>Instructions</Link>
        <Link to="/chatbot" className='link'>Chatbot</Link>
        <Link to="/about" className='link'>About</Link>
      </div>

      {/* For responsive screen */}

      <div className="navbar-hamburger" onClick={toggleMenu}> {/* Hamburger menu icon on click open the side menu */}
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>

      <div className={`side-menu ${isOpen ? 'open' : ''}`}> {/* Side menu links */}
        <Link to="/" className='side-link' onClick={toggleMenu}>Home</Link>
        <Link to="/quiz" className='side-link' onClick={toggleMenu}>Quiz</Link>
        <Link to="/instructions" className='side-link' onClick={toggleMenu}>Instructions</Link>
        <Link to="/chatbot" className='side-link' onClick={toggleMenu}>Chatbot</Link>
        <Link to="/about" className='side-link' onClick={toggleMenu}>About</Link>
      </div>
    </div >
  )
}

export default Navbar;
