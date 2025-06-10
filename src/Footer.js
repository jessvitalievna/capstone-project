import React from 'react';

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-brand">
        <img src="/assets/little-lemon-logo.png" alt="Little Lemon logo" className="footer-logo" />
        <p className="brand-tagline">Fresh ingredients, fresh flavors.</p>
      </div>

      <nav aria-label="Footer navigation" className="footer-nav">
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </nav>

      <div className="footer-copy">
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;