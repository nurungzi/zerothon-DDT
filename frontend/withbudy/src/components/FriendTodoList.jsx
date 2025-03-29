import React, { useEffect, useState } from 'react';
import GoalBlock from './GoalBlock';
import { fetchFriendTodos } from '../api';

function FriendTodoList({ friend }) {
  const [todos, setTodos] = useState([]);
  const currentUserId = 1; // ✅ 임시 로그인 유저 ID

  useEffect(() => {
    if (!friend) return;

    const loadFriendTodos = async () => {
      try {
        const data = await fetchFriendTodos(currentUserId, friend.id);
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error('❌ 친구 할일 로딩 실패:', error);
        setTodos([]);
      }
    };

    loadFriendTodos();
  }, [friend]);

  if (!friend) {
    return <p style={{ padding: '16px' }}>친구를 선택해보세요.</p>;
  }

  if (todos.length === 0) {
    return <p style={{ padding: '16px' }}>{friend.name}님의 할일이 없습니다.</p>;
  }

  return (
    <div style={{ width: '100%' }}>
      <GoalBlock
        type="list"
        day={`${friend.name}의 할일`}
        tasks={todos.map(todo => ({
          id: todo.id,
          text: todo.title,
          done: todo.state === 'DONE',
        }))}
      />
    </div>
  );
}

export default FriendTodoList;
