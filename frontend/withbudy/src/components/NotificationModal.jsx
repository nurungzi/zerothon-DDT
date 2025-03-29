import React, { useEffect, useState } from 'react';
import './NotificationModal.css';
import { fetchNotifications, acceptNotification } from '../api';

function NotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const currentUserId = 1; // 로그인 없이 임시 사용자 ID

  // 알림 불러오기 함수
  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications(currentUserId);
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        console.warn('알림 데이터가 배열이 아닙니다:', data);
        setNotifications([]);
      }
    } catch (error) {
      console.error('❌ 알림 불러오기 실패:', error);
      setNotifications([]);
    }
  };

  // 모달 열릴 때마다 알림 불러오기
  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  // 알림 수락 처리
  const handleAccept = async (notificationId) => {
    try {
      await acceptNotification(notificationId);
      alert('✅ 수락 완료!');
      await loadNotifications(); // 새로고침
    } catch (error) {
      alert('❌ 수락에 실패했어요.');
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

                {/* 수락 버튼은 WAITING 상태에서만 표시 */}
                {item.state === 'WAITING' && (
                  <div className="notification-actions">
                    <button className="accept" onClick={() => handleAccept(item.id)}>✅</button>
                    <button className="reject" disabled>❌</button> {/* 거절기능은 추후 */}
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
