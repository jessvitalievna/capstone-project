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
          <Link to="/">
          <img src={logo} alt="Little Lemon logo" className="logo" />
          </Link>
          <button className="hamburger-btn" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        {/* Nav is always mounted; visibility controlled via CSS class */}
        <Nav className={menuOpen ? 'show' : ''} />
      </div>
    </header>
  );
}

export default Header;