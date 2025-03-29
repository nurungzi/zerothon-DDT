import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './GoalModal.css';
import { fetchFriendList } from '../api'; // ✅ 친구 목록 API 추가

function GoalModal({ isOpen, onClose, onSubmit }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState([]);

  const currentUserId = 1; // ✅ 하드코딩된 유저 ID

  useEffect(() => {
    if (!isOpen) return;

    const loadFriends = async () => {
      try {
        const data = await fetchFriendList(currentUserId);
        if (Array.isArray(data)) {
          const formatted = data
            .filter(item => item.state === 'FRIEND')
            .map(item => {
              const buddy =
                item.requester.id === currentUserId
                  ? item.responser
                  : item.requester;
              return { id: buddy.id, name: buddy.name };
            });

          setFriends(formatted);
        }
      } catch (error) {
        console.error('❌ 친구 목록 불러오기 실패:', error);
        setFriends([]);
      }
    };

    loadFriends();
  }, [isOpen]);

  const handleRegister = () => {
    if (!startDate || !endDate || !title || !selectedFriend) return;

    onSubmit({
      startDate,
      endDate,
      title,
      content,
      selectedBuddyId: selectedFriend
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="goal-modal-overlay" onClick={onClose}>
      <div className="goal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="goal-modal-header">
          <h2>목표지정</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="goal-modal-dates">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="시작 날짜"
            dateFormat="yyyy-MM-dd"
            className="date-picker"
          />
          <span>➝</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="종료 날짜"
            dateFormat="yyyy-MM-dd"
            className="date-picker"
          />
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
