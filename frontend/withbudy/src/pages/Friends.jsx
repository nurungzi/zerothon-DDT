import React, { useEffect, useState } from 'react';
import FriendCarousel from '../components/FriendCarousel';
import FriendTodoList from '../components/FriendTodoList';
import FriendRequestModal from '../components/FriendRequestModal';
import { requestFriend, fetchFriendList } from '../api';

function Friends() {
  const [friendList, setFriendList] = useState([]);        // 친구 목록
  const [selectedId, setSelectedId] = useState(null);      // 선택된 친구 ID
  const [showRequestModal, setShowRequestModal] = useState(false);

  const currentUserId = 1; // ✅ 로그인 없이 하드코딩한 사용자 ID

  // ✅ 친구 목록 불러오기
  useEffect(() => {
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

              return {
                id: buddy.id,
                name: buddy.name,
                avatar: null, // 아직 아바타 미구현
              };
            });

          setFriendList([{ id: 'add', name: '', avatar: null }, ...formatted]);
        }
      } catch (err) {
        console.error('❌ 친구 목록 로딩 실패:', err);
        alert('친구 목록을 불러오지 못했어요.');
      }
    };

    loadFriends();
  }, []);

  // ✅ 친구 선택 or + 버튼
  const handleSelect = (id) => {
    if (id === 'add') {
      setShowRequestModal(true);
    } else {
      setSelectedId(id);
    }
  };

  // ✅ 친구 요청 처리
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

  const selectedFriend = friendList.find(f => f.id === selectedId);

  return (
    <>
      <div style={{ width: '100%' }}>
        <FriendCarousel
          friends={friendList}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <FriendTodoList friend={selectedFriend} />
      </div>

      {/* 친구 추가 모달 */}
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
