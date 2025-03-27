// src/components/Layout.jsx
import React from 'react';
import Header from './Header';
import FooterNav from './FooterNav';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: '60px', paddingBottom: '60px', padding: '16px' }}>
        <Outlet /> {/* 여기에 각 페이지(Home, Friends 등) 렌더링됨 */}
      </main>
      <FooterNav />
    </div>
  );
}

export default Layout;
