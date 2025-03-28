import React, { useState } from 'react';
import './GoalModal.css';

function GoalModal({ isOpen, onClose, onSubmit, friends }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  if (!isOpen) return null;

  const handleRegister = () => {
    if (!startDate || !endDate || !title || !selectedFriend) return;
    onSubmit({ startDate, endDate, title, content, partner: selectedFriend });
    onClose();
  };

  return (
    <div className="goal-modal-overlay" onClick={onClose}>
      <div className="goal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="goal-modal-header">
          <h2>목표지정</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="goal-modal-dates">
          <button onClick={() => alert('날짜 선택')}>{startDate || '시작 날짜'}</button>
          <span>➝</span>
          <button onClick={() => alert('날짜 선택')}>{endDate || '종료 날짜'}</button>
        </div>

        <div className="goal-modal-inputs">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="goal-modal-friends">
          <div className="friend-carousel">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`friend-item ${selectedFriend === friend.id ? 'selected' : ''}`}
                onClick={() => setSelectedFriend(friend.id)}
              >
                <div className="friend-icon">👤</div>
                <div className="friend-name">{friend.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="goal-modal-buttons">
          <button onClick={onClose}>취소</button>
          <button onClick={handleRegister}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default GoalModal;
