import React, { useState } from 'react';
import FriendCarousel from '../components/FriendCarousel';
import FriendTodoList from '../components/FriendTodoList';
import FriendRequestModal from '../components/FriendRequestModal';
import { requestFriend } from '../api'; // ✅ API 요청 함수

// 샘플 친구 데이터
const dummyFriends = [
  { id: 'add', name: '', avatar: null }, // 가장 왼쪽 + 버튼
  { id: 1, name: '지민', avatar: null, todos: [{ day: '오늘', tasks: [{ text: '과제하기', done: false }] }] },
  { id: 2, name: '수연', avatar: null, todos: [{ day: 'D-1', tasks: [{ text: '알바', done: true }] }] },
  { id: 3, name: '현수', avatar: null, todos: [{ day: '오늘', tasks: [{ text: '운동', done: false }] }] },
  { id: 4, name: '민지', avatar: null, todos: [{ day: '오늘', tasks: [{ text: '영화보기', done: false }] }] },
  { id: 5, name: '도윤', avatar: null, todos: [{ day: 'D-2', tasks: [{ text: '요리연습', done: false }] }] },
  { id: 6, name: '서현', avatar: null, todos: [{ day: 'D-3', tasks: [{ text: '카페가기', done: true }] }] },
  { id: 7, name: '민호', avatar: null, todos: [{ day: 'D-3', tasks: [{ text: '카페가기', done: true }] }] },
  { id: 8, name: '재민', avatar: null, todos: [{ day: '오늘', tasks: [{ text: '독서', done: false }] }] }
];

function Friends() {
  const [selectedId, setSelectedId] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const selectedFriend = dummyFriends.find(f => f.id === selectedId);
  const currentUserId = 4; // ✅ 현재 로그인 유저 ID (하드코딩)

  // 친구 선택 또는 + 버튼 클릭
  const handleSelect = (id) => {
    if (id === 'add') {
      setShowRequestModal(true);
    } else {
      setSelectedId(id);
    }
  };

  // 친구 요청 API 호출
  const handleFriendRequest = async (friendId) => {
    try {
      const responserId = parseInt(friendId);
      const response = await requestFriend(currentUserId, responserId);
      console.log('친구 요청 성공:', response);
      alert('친구 요청을 보냈습니다!');
    } catch (error) {
      console.error('친구 요청 실패:', error);
      alert('친구 요청에 실패했습니다.');
    }
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <FriendCarousel
          friends={dummyFriends}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <FriendTodoList friend={selectedFriend} />
      </div>

      {/* 친구 신청 모달 */}
      {showRequestModal && (
        <FriendRequestModal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          onRequest={handleFriendRequest}
        />
      )}
    </>
  );
}

export default Friends;
