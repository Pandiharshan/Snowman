import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copyright">
          © 2025 Snowman. All rights reserved.
        </div>
        <nav className="footer-nav">
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;