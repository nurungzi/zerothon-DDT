// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import GoalBlock from '../components/GoalBlock';
import GoalModal from '../components/GoalModal';
import { createTodo, fetchTodoByDate } from '../api'; // ✅ fetchTodoByDate 정상 export 확인

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

  const currentUserId = 1; // ✅ 로그인 없이 임시 사용자 ID

  // ✅ 할일 목록 불러오기
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodoByDate(currentUserId);
        if (Array.isArray(data)) {
          setTodoByDate(data);
        } else {
          console.warn('서버로부터 받은 데이터가 배열이 아닙니다:', data);
          setTodoByDate([]); // fallback 처리
        }
      } catch (err) {
        console.error('할일 조회 실패:', err);
        alert('할일 목록을 불러오지 못했습니다.');
        setTodoByDate([]); // fallback 처리
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

      // 승인 대기 리스트 추가
      setApprovalTasks(prev => [...prev, { text: savedGoal.title }]);

      // 다시 불러오기
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
      <GoalBlock type="add" onClick={() => setIsModalOpen(true)} />

      {/* 승인 대기 목표 표시 */}
      <GoalBlock type="approval" day="목표 승인 대기" tasks={approvalTasks} />

      {/* 날짜별 할일 표시 */}
      {Array.isArray(todoByDate) &&
        todoByDate.map(entry => (
          <GoalBlock
            key={entry.date}
            type="list"
            day={entry.date}
            tasks={entry.todoList.map(todo => ({
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
