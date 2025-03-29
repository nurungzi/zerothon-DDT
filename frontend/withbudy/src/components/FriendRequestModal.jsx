import React, { useState } from 'react';
import './FriendRequestModal.css';

function FriendRequestModal({ isOpen, onClose, onRequest }) {
  const [friendId, setFriendId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!friendId) return;
    onRequest(friendId);
    onClose();
  };

  return (
    <div className="friend-request-modal" onClick={onClose}>
      <div className="friend-request-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="friend-request-close-btn" onClick={onClose}>✕</button>
        <h2>친구 신청</h2>
        <input
          type="text"
          placeholder="친구 ID"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
        />
        <button onClick={handleSubmit}>신청하기</button>
      </div>
    </div>
  );
}

export default FriendRequestModal;
