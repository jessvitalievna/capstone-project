import React from 'react';
import './Nav.css';

function Nav() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Order Online', href: '/order-online' },
    { name: 'Login', href: '/login' },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className="nav-list" role="menubar">
        {navItems.map((item) => (
          <li key={item.href} role="none">
            <a href={item.href} role="menuitem">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;