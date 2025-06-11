import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <p>© {new Date().getFullYear()} Little Lemon</p>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;