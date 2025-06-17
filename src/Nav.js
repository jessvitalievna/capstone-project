import React from 'react';
import './Nav.css';

function Nav({ className = '' }) {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <ul className={`nav-list ${className}`.trim()} role="menubar">
        <li role="none"><a role="menuitem" href="/">Home</a></li>
        <li role="none"><a role="menuitem" href="/about">About</a></li>
        <li role="none"><a role="menuitem" href="/menu">Menu</a></li>
        <li role="none"><a role="menuitem" href="/reservations">Reservations</a></li>
        <li role="none"><a role="menuitem" href="/order">Order&nbsp;Online</a></li>
        <li role="none"><a role="menuitem" href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;