import React, { useState } from 'react';
import FriendCarousel from '../components/FriendCarousel';
import FriendTodoList from '../components/FriendTodoList';

// 샘플 친구 데이터 (8명)
const dummyFriends = [
  { id: 'add', name: '', avatar: null }, // 가장 왼쪽의 + 버튼 역할
  { id: 1, name: '지민', avatar: null, todos: [{ day: '오늘', tasks: [{ text: '과제하기', done: false }] },{ day: 'D-1', tasks: [{ text: '알바', done: true }] }, { day: 'D-2', tasks: [{ text: '알바', done: true }] }] }
];

function Friends() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedFriend = dummyFriends.find(f => f.id === selectedId);

  const handleSelect = (id) => {
    if (id === 'add') {
      alert('친구 추가 기능은 곧 구현됩니다!');
      return;
    }
    setSelectedId(id);
  };

  return (
    <div style={{ width: '100%' }}>
      <FriendCarousel
        friends={dummyFriends}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      <FriendTodoList friend={selectedFriend} />
    </div>
  );
}

export default Friends;
