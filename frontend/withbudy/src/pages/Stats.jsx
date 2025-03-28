import React from 'react';
import './Stats.css';
import SuccessRateSection from '../components/SuccessRateSection';
import BuddyHighlight from '../components/BuddyHighlight';
import GoalListSection from '../components/GoalListSection';

function Stats() {
  // 샘플 데이터
  const successRate = 80;
  const failureRate = 20;

  const bestBuddy = {
    name: '예지',
    profileImg: null, // 추후 프로필 이미지 경로나 아이콘 대체 가능
  };

  const successGoals = ['운동 30분', '책 읽기'];
  const failedGoals = ['야식 끊기', '일찍 자기'];

  return (
    <div className="stats-page">
      <SuccessRateSection successRate={successRate} failureRate={failureRate} />

      <BuddyHighlight buddy={bestBuddy} />

      <GoalListSection
        successGoals={successGoals}
        failedGoals={failedGoals}
      />
    </div>
  );
}

export default Stats;
