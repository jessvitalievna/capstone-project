import React from 'react';
import Nav from './Nav';
import './Header.css';

function Header () {
  return (
    <header className="site-header">
      <img
        src="/assets/little-lemon-logo.jpg"
        alt="Little Lemon logo"
        className="logo"
      />
      <Nav />
    </header>
  );
}

export default Header;