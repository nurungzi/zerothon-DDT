// src/pages/Home.jsx
import React from 'react';
import GoalBlock from '../components/GoalBlock';

function Home() {
  const todayTasks = [
    { text: '운동 30분', done: false },
    { text: '책 읽기', done: true },
  ];

  const yesterdayTasks = [
    { text: '회의 준비', done: true },
    { text: '이메일 정리', done: false },
  ];

  return (
    <div style={{ width: '100%' }}>  {/* ✅ 핵심! main 내부 요소 확장 */}
      <GoalBlock type="add" />
      <GoalBlock type="list" day="오늘" tasks={todayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
    </div>
  );
}

export default Home;
