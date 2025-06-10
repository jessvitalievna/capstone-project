import React from 'react';

function Nav() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
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