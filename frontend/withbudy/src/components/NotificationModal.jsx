import React, { useEffect, useState } from 'react';
import './NotificationModal.css';
import { fetchNotifications } from '../api'; // 백엔드에서 알림 목록 가져오는 함수

function NotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
        .then((data) => {
          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            setNotifications([]); // fallback
          }
        })
        .catch((error) => {
          console.error('알림 데이터를 불러오는 데 실패했습니다:', error);
          setNotifications([]); // fallback on error
        });
    }
  }, [isOpen]);

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
            notifications.map((item, index) => (
              <div key={index} className="notification-card">
                <div className="profile-placeholder">👤</div>
                <div className="notification-content">
                  <strong>{item.name}</strong>
                  <div>{item.message}</div>
                </div>
                {item.type === 'actionable' && (
                  <div className="notification-actions">
                    <button className="accept">✅</button>
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
