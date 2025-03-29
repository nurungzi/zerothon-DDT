// NotificationModal.jsx
import React from 'react';
import './NotificationModal.css';

function NotificationModal({ isOpen, onClose, notifications = [] }) {
  if (!isOpen) return null;

  return (
    <div className="notification-modal-overlay" onClick={onClose}>
      <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <span className="pin">📌</span>
          <button className="notification-close" onClick={onClose}>✕</button>
        </div>
        <div className="notification-list">
          {notifications.map((item, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
