import React from 'react';
import './FriendCarousel.css';
import defaultAvatar from '../assets/default-avatar.png'; // 기본 아이콘 이미지

function FriendCarousel({ friends, selectedId, onSelect }) {
  return (
    <div className="friend-carousel">
      {friends.map(friend =>
        friend.id === 'add' ? (
          <div key="add" className="friend-profile add-button" onClick={() => onSelect('add')}>
            <div className="friend-avatar add-icon">+</div>
          </div>
        ) : (
          <div
            key={friend.id}
            className={`friend-profile ${selectedId === friend.id ? 'selected' : ''}`}
            onClick={() => onSelect(friend.id)}
          >
            <img
              src={friend.avatar || defaultAvatar}
              alt={friend.name}
              className="friend-avatar"
            />
            <div className="friend-name">{friend.name}</div>
          </div>
        )
      )}
    </div>
  );
}

export default FriendCarousel;
