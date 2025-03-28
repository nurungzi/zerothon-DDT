import React from 'react';
import './FriendCarousel.css';

function FriendCarousel({ friends, selectedId, onSelect }) {
  return (
    <div className="friend-carousel">
      {friends.map(friend => (
        <div
          key={friend.id}
          className={`friend-profile ${selectedId === friend.id ? 'selected' : ''}`}
          onClick={() => onSelect(friend.id)}
        >
          <img src={friend.avatar} alt={friend.name} />
          <div className="friend-name">{friend.name}</div>
        </div>
      ))}
    </div>
  );
}

export default FriendCarousel;
