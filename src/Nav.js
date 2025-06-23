import React from 'react';
import './Nav.css';

function Nav({ className = '' }) {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul className={`nav-list ${className}`.trim()} role="menubar">
        <li role="none"><a role="menuitem" href="/">Home</a></li>
        <li role="none"><a role="menuitem" href="/">About</a></li>
        <li role="none"><a role="menuitem" href="/">Menu</a></li>
        <li role="none"><a role="menuitem" href="/">Reservations</a></li>
        <li role="none"><a role="menuitem" href="/">Order&nbsp;Online</a></li>
        <li role="none"><a role="menuitem" href="/">Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;