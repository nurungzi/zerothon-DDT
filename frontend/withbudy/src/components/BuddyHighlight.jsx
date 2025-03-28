import React from 'react';
import './BuddyHighlight.css';

function BuddyHighlight({ buddy }) {
  return (
    <section className="buddy-highlight">
      <div className="label">가장 최고의 <span className="bold">buddy</span>는?</div>
      <div className="profile">
        {buddy.profileImg ? (
          <img src={buddy.profileImg} alt={buddy.name} className="profile-img" />
        ) : (
          <div className="profile-placeholder">👤</div>
        )}
        <div className="buddy-name">{buddy.name}</div>
      </div>
    </section>
  );
}

export default BuddyHighlight;
