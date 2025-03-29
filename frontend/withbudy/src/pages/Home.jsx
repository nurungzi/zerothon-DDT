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

  const currentUserId = 1; // 로그인 없이 임시 사용자 ID

  // ✅ 할일 목록 불러오기
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodoByDate(currentUserId);
        if (Array.isArray(data)) {
          setTodoByDate(data);
        } else {
          console.warn('서버로부터 받은 데이터가 배열이 아닙니다:', data);
          setTodoByDate([]);
        }
      } catch (err) {
        console.error('할일 조회 실패:', err);
        alert('할일 목록을 불러오지 못했습니다.');
        setTodoByDate([]);
      }
    };

    loadTodos();
  }, []);

  // ✅ 목표 등록
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

      // 승인 대기 리스트에 추가 (id 포함)
      setApprovalTasks(prev => [...prev, { id: savedGoal.id, text: savedGoal.title }]);

      // 할일 목록 새로고침
      const updated = await fetchTodoByDate(currentUserId);
      if (Array.isArray(updated)) {
        setTodoByDate(updated);
      }

      setIsModalOpen(false);
    } catch (error) {
      alert('목표 등록 중 오류가 발생했어요.');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 목표 추가 버튼 */}
      <GoalBlock type="add" onClick={() => setIsModalOpen(true)} />

      {/* 승인 대기 목표 표시 (체크박스 없음) */}
      <GoalBlock type="pending" tasks={approvalTasks} />

      {/* 날짜별 할일 표시 */}
      {todoByDate.map(entry => (
        <GoalBlock
          key={entry.date}
          type="list"
          day={entry.date}
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
