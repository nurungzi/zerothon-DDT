// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import GoalBlock from '../components/GoalBlock';
import GoalModal from '../components/GoalModal';
import { createTodo, fetchTodoByDate } from '../api';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoByDate, setTodoByDate] = useState([]);
  const [approvalTasks, setApprovalTasks] = useState([]);

  const dummyFriends = [
    { id: 1, name: '예지' },
    { id: 2, name: '지후' },
    { id: 3, name: '민수' },
    { id: 4, name: '수빈' },
  ];

  const currentUserId = 1; // ✅ 임시 로그인 사용자 ID

  // ✅ 할일 목록 불러오기 함수 (내부/외부 모두 사용 가능하게 분리)
  const loadTodos = async () => {
    try {
      const data = await fetchTodoByDate(currentUserId);
      if (Array.isArray(data)) {
        setTodoByDate(data);
      } else {
        console.warn('서버에서 배열이 아닌 데이터가 도착:', data);
        setTodoByDate([]);
      }
    } catch (err) {
      console.error('❌ 할일 조회 실패:', err);
      alert('할일 목록을 불러오지 못했습니다.');
      setTodoByDate([]);
    }
  };

  // ✅ 마운트 시 할일 목록 불러오기
  useEffect(() => {
    loadTodos();
  }, []);

  // ✅ 목표 등록 핸들러
  const handleSubmitGoal = async (goalData) => {
    const requestBody = {
      title: goalData.title,
      content: goalData.content,
      startDate: goalData.startDate,
      endDate: goalData.endDate,
      userId: currentUserId,
      buddyId: goalData.selectedBuddyId,
    };

    try {
      const savedGoal = await createTodo(requestBody);
      console.log('✅ 등록 성공:', savedGoal);

      // 승인 대기 항목 추가
      setApprovalTasks(prev => [...prev, { id: savedGoal.id, text: savedGoal.title }]);

      // 할일 목록 새로고침
      await loadTodos();
      setIsModalOpen(false);
    } catch (error) {
      alert('❌ 목표 등록 중 오류가 발생했어요.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 목표 추가 버튼 */}
      <GoalBlock type="add" onAddClick={() => setIsModalOpen(true)} />

      {/* 승인 대기 목표 표시 (체크박스 없음) */}
      <GoalBlock type="pending" tasks={approvalTasks} />

      {/* 날짜별 할일 표시 */}
      {todoByDate.map(entry => (
        <GoalBlock
          key={entry.date}
          type="list"
          day={entry.date}
          onDone={loadTodos} // ✅ 체크박스 완료 시 새로고침 연결
          tasks={entry.todoList.map(todo => ({
            id: todo.id,
            text: todo.title,
            done: todo.state === 'DONE',
          }))}
        />
      ))}

      {/* 목표 추가 모달 */}
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
