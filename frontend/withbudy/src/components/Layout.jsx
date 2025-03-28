import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FooterNav from './FooterNav';

function Layout() {
  return (
    <div style={{ width: '100%' }}>
      <Header />

      <main id='testmain'
        style={{
          display: 'block',
          width: '100%',              // ✅ 전체 너비
          minWidth: '100%',
          margin: 0,                  // ✅ 중앙정렬 제거
          paddingInline: '16px',     // ✅ 좌우 여백은 그대로
          paddingTop: '60px',
          paddingBottom: '60px',
          boxSizing: 'border-box'

          
        }}
      >
        <Outlet />
      </main>

      <FooterNav />
    </div>
  );
}

export default Layout;
