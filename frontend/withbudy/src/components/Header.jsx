import React, { useState } from 'react';
import './Header.css';
import NotificationModal from './NotificationModal';
import ProfileModal from './ProfileModal';

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const dummyNotifications = [
    { name: '지민', message: '친구 신청', type: 'actionable' },
    { name: '수연', message: '목표(운동 30분)를 성공 했습니다.', type: 'info' },
    { name: '현수', message: '목표(책 읽기)를 실패 했습니다.', type: 'info' },
    { name: '민지', message: '(운동 30분) 파트너 지정', type: 'actionable' },
    { name: '예지', message: '(책 읽기) 달성', type: 'actionable' },
    { name: '정민', message: '목표(청소) 성공!', type: 'info' },
    { name: '찬우', message: '목표(디버깅) 실패...', type: 'info' },
    { name: '보라', message: '친구 신청', type: 'actionable' },
    { name: '민호', message: '목표(30분 걷기) 성공!', type: 'info' },
    { name: '도윤', message: '목표(커밋하기) 실패...', type: 'info' },
  ];

  return (
    <>
      <header className="header">
        <button className="header-btn profile" onClick={() => setShowProfile(true)}>👤</button>
        <h1 className="header-title">WithBuddy</h1>
        <button className="header-btn" onClick={() => setShowNotifications(true)}>🔔</button>
      </header>

      {/* 알림 모달 */}
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={dummyNotifications}
      />

      {/* 프로필 모달 */}
      {showProfile && (
        <ProfileModal 
          isOpen={showProfile}
          onClose={() => setShowProfile(false)} 
        />
      )}
    </>
  );
}

export default Header;
