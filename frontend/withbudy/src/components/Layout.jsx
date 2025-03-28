import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FooterNav from './FooterNav';

function Layout() {
  return (
    <div className="mobile-container">  {/* 모바일 해상도 기준 프레임 */}
      <Header />                         {/* 고정 상단 */}
      
      <main className="main-content">   {/* 스크롤 가능한 메인 */}
        <Outlet />
      </main>

      <FooterNav />                     {/* 고정 하단 */}
    </div>
  );
}

export default Layout;
