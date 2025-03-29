// src/pages/Home.jsx
import React, { useState } from 'react';
import GoalBlock from '../components/GoalBlock';
import GoalModal from '../components/GoalModal';
import { createTodo } from '../api'; // ⭐ 추가

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayTasks = [
    { text: '운동 30분', done: false },
    { text: '책 읽기', done: true },
  ];

  const approvalTasks = [
    { text: '지민과 운동하기' },
    { text: '책 같이 읽기' },
    { text: '아침 6시 기상!' },
  ];

  const dummyFriends = [
    { id: 1, name: '예지' },
    { id: 2, name: '지후' },
    { id: 3, name: '민수' },
    { id: 4, name: '수빈' },
  ];

  const handleSubmitGoal = async (goalData) => {
    const requestBody = {
      title: goalData.title,
      content: goalData.content,
      startDate: goalData.startDate,
      endDate: goalData.endDate,
      userId: 1,       // 임시 하드코딩 (현재 로그인 유저)
      buddyId: goalData.selectedBuddyId,
    };

    try {
      const savedGoal = await createTodo(requestBody);
      console.log('✅ 등록 성공:', savedGoal);

      // 나중에 목표 승인 대기 목록에 추가할 수도 있음
      // 예: setApprovalGoals(prev => [...prev, savedGoal]);

      setIsModalOpen(false);
    } catch (error) {
      alert('목표 등록 중 오류가 발생했어요.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <GoalBlock type="add" onClick={() => setIsModalOpen(true)} />
      <GoalBlock type="approval" day="목표 승인 대기" tasks={approvalTasks} />
      <GoalBlock type="list" day="오늘" tasks={todayTasks} />

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
