import React, { useState } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand/Logo */}
        <div className="navbar-brand">
          <Link to="home" smooth={true} duration={500} className="brand-link">
            Snowman
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? 'navbar-links-open' : ''}`}>
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="nav-link"
            onClick={closeMenu}
            spy={true}
            activeClass="active"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="nav-link"
            onClick={closeMenu}
            spy={true}
            activeClass="active"
          >
            About
          </Link>
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="nav-link"
            onClick={closeMenu}
            spy={true}
            activeClass="active"
          >
            Features
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="nav-link"
            onClick={closeMenu}
            spy={true}
            activeClass="active"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;