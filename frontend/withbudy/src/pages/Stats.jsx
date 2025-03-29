import React, { useEffect, useState } from 'react';
import SuccessRateSection from '../components/SuccessRateSection';
import BuddyHighlight from '../components/BuddyHighlight';
import GoalListSection from '../components/GoalListSection';
import { fetchStats } from '../api';

function Stats() {
  const [successRate, setSuccessRate] = useState(0);
  const [failureRate, setFailureRate] = useState(0);
  const [bestBuddy, setBestBuddy] = useState(null);
  const [successGoals, setSuccessGoals] = useState([]);
  const [failedGoals, setFailedGoals] = useState([]);

  const currentUserId = 1; // ✅ 로그인 없이 임시 사용자 ID

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats(currentUserId);

        setSuccessRate(data.successPercent || 0);
        setFailureRate(data.failPercent || 0);

        setBestBuddy({
          name: data.bestBuddy?.name || '버디 없음',
          profileImg: null // 추후 이미지 연결 가능
        });

        setSuccessGoals(data.successList?.map(goal => goal.title) || []);
        setFailedGoals(data.failList?.map(goal => goal.title) || []);

      } catch (error) {
        alert('통계 정보를 불러오지 못했습니다.');
      }
    };

    loadStats();
  }, []);

  return (
    <div className="stats-page">
      <SuccessRateSection successRate={successRate} failureRate={failureRate} />

      {bestBuddy && <BuddyHighlight buddy={bestBuddy} />}

      <GoalListSection
        successGoals={successGoals}
        failedGoals={failedGoals}
      />
    </div>
  );
}

export default Stats;
