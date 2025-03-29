import React from 'react';
import './ProfileModal.css';
import defaultAvatar from '../assets/default-avatar.png'; // 기본 프로필 이미지

function ProfileModal({ isOpen, onClose }) {
  const userName = '김버디'; // 예시 이름
  const buddyId = 'buddy1234'; // 예시 Buddy ID

  if (!isOpen) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <h2>프로필</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-picture-wrapper">
          <img src={defaultAvatar} alt="기본 프로필" className="profile-picture" />
          <span className="add-icon">+</span>
        </div>

        <div className="profile-info">
          <input
            type="text"
            className="readonly-input"
            value={userName}
            readOnly
          />
          <input
            type="text"
            className="readonly-input"
            value={buddyId}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
