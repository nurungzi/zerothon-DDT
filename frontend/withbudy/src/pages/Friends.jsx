import React, { useState } from 'react';
import FriendCarousel from '../components/FriendCarousel';
import FriendTodoList from '../components/FriendTodoList';

// 샘플 데이터
const dummyFriends = [
  {
    id: 1,
    name: '혜진',
    avatar: '/avatars/hyejin.png',
    todos: [
      { day: '오늘', tasks: [{ text: '요가 수업', done: true }] },
      { day: 'D-1', tasks: [{ text: '헬스장 등록', done: false }] }
    ]
  },
  {
    id: 2,
    name: '민수',
    avatar: '/avatars/minsu.png',
    todos: [
      { day: '오늘', tasks: [{ text: '과제 제출', done: false }] }
    ]
  }
];

function Friends() {
  const [selectedId, setSelectedId] = useState(dummyFriends[0].id);
  const selectedFriend = dummyFriends.find(f => f.id === selectedId);

  return (
    <div style={{ width: '100%' }}>
      <FriendCarousel
        friends={dummyFriends}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <FriendTodoList friend={selectedFriend} />
    </div>
  );
}

export default Friends;
