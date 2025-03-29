import React, { useState } from 'react';
import GoalBlock from '../components/GoalBlock';
import GoalModal from '../components/GoalModal'; // ✅ 추가

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayTasks = [
    { text: '운동 30분', done: false },
    { text: '책 읽기', done: true },
  ];

  const yesterdayTasks = [
    { text: '회의 준비', done: true },
    { text: '이메일 정리', done: false },
  ];

  const dummyFriends = [
    { id: 1, name: '예지' },
    { id: 2, name: '지후' },
    { id: 3, name: '민수' },
    { id: 4, name: '수빈' },
  ];

  const handleSubmitGoal = (goalData) => {
    console.log('등록된 목표:', goalData);
    // 👉 목표를 등록했을 때 처리할 로직을 여기에 추가하면 돼
  };

  return (
    <div style={{ width: '100%' }}>
      <GoalBlock type="add" onClick={() => setIsModalOpen(true)} />
      <GoalBlock type="list" day="오늘" tasks={todayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />

      {/* ✅ 목표 추가 모달 */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitGoal}
        friends={dummyFriends}
      />
    </div>
  );
}

export default Home;
