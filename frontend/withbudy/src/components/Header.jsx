import React from 'react';
import './Header.css'; 

function Header() {
  return (
    <header className="header">
      <button className="left">프로필</button>
      <h1 className="center">WithBuddy</h1>
      <button className="right">🔔</button>
    </header>
  );
}

export default Header;
