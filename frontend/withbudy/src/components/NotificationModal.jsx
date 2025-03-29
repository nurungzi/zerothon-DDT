// src/components/NotificationModal.jsx
import React, { useEffect, useState } from 'react';
import './NotificationModal.css';
import { fetchNotifications, acceptNotification } from '../api';

function NotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const currentUserId = 1; // ✅ 로그인 없이 임시 사용자 ID

  // 알림 목록 불러오기
  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications(currentUserId);
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('❌ 알림 조회 실패:', error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const handleAccept = async (notificationId) => {
    try {
      await acceptNotification(notificationId);
      alert('✅ 수락 완료!');
      loadNotifications(); // 다시 불러오기
    } catch (error) {
      alert('❌ 수락 실패!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="notification-modal-overlay" onClick={onClose}>
      <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <span className="pin">📌</span>
          <button className="notification-close" onClick={onClose}>✕</button>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="no-notification">알림이 없습니다</div>
          ) : (
            notifications.map((item) => (
              <div key={item.id} className="notification-card">
                <div className="profile-placeholder">👤</div>
                <div className="notification-content">
                  <strong>{item.requester?.name || '익명'}</strong>
                  <div>{item.content}</div>
                </div>
                {item.state === 'WAITING' && (
                  <div className="notification-actions">
                    <button className="accept" onClick={() => handleAccept(item.id)}>✅</button>
                    <button className="reject">❌</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
