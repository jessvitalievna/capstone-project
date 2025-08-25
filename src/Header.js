import Nav from './Nav';
import logo from './assets/little-lemon-logo.jpg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo-container">
          <Link to="/" aria-label="Little Lemon homepage">
            <img src={logo} alt="Little Lemon logo" className="logo" />
          </Link>
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
        <Nav className={menuOpen ? 'show' : ''} />
      </div>
    </header>
  );
}

export default Header;