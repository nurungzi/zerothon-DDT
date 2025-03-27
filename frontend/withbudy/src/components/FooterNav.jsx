import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FooterNav.css';

function FooterNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '🏠', label: '홈' },
    { path: '/stats', icon: '🏆', label: '통계' },
    { path: '/friends', icon: '👥', label: '친구' },
  ];

  return (
    <nav className="footer-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default FooterNav;
