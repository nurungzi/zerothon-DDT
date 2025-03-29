import React, { useState, useEffect } from 'react';
import './Header.css';
import NotificationModal from './NotificationModal';
import ProfileModal from './ProfileModal';
import { fetchNotifications } from '../api'; // ✅ 알림 받아오는 API 함수

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // 🔔 알림 모달 열릴 때만 fetch
  useEffect(() => {
    if (showNotifications) {
      fetchNotifications()
        .then((data) => {
          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            setNotifications([]); // fallback
          }
        })
        .catch((err) => {
          console.error('알림 불러오기 실패:', err);
          setNotifications([]); // fallback on error
        });
    }
  }, [showNotifications]);

  return (
    <>
      <header className="header">
        <button className="header-btn profile" onClick={() => setShowProfile(true)}>👤</button>
        <h1 className="header-title">WithBuddy</h1>
        <button className="header-btn" onClick={() => setShowNotifications(true)}>🔔</button>
      </header>

      {/* ✅ 알림 모달 */}
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
      />

      {/* ✅ 프로필 모달 */}
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
