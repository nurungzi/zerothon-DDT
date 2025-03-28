import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <button className="header-btn">👤</button>
      <h1 className="header-title">WithBuddy</h1>
      <button className="header-btn">🔔</button>
    </header>
  );
}

export default Header;
