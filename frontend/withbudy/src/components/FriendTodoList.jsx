import React from 'react';
import GoalBlock from './GoalBlock';

function FriendTodoList({ friend }) {
  if (!friend) return <p style={{ padding: '16px' }}>친구를 선택해보세요.</p>;

  return (
    <div style={{ width: '100%' }}>
      {friend.todos.map((todoGroup, idx) => (
        <GoalBlock key={idx} type="list" day={todoGroup.day} tasks={todoGroup.tasks} />
      ))}
    </div>
  );
}

export default FriendTodoList;
