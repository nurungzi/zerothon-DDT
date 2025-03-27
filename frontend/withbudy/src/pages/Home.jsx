// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import FooterNav from '../components/FooterNav';
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
    <div>
      <Header />
      <main style={{ paddingTop: '60px', paddingBottom: '60px', padding: '16px' }}>
        <GoalBlock type="add" />
        <GoalBlock type="list" day="오늘" tasks={todayTasks} />
        <GoalBlock type="list" day="D-1" tasks={yesterdayTasks} />
      </main>
      <FooterNav />
    </div>
  );
}

export default Home;
