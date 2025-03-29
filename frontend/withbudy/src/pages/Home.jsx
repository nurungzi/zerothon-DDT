// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import GoalBlock from '../components/GoalBlock';
import GoalModal from '../components/GoalModal';
import { createTodo, fetchTodoByDate } from '../api';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoByDate, setTodoByDate] = useState([]);
  const [approvalTasks, setApprovalTasks] = useState([]);
  const currentUserId = 1; // ✅ 임시 로그인 유저 ID

  // ✅ 할일 목록 불러오기
  const loadTodos = async () => {
    try {
      const data = await fetchTodoByDate(currentUserId);
      if (Array.isArray(data)) {
        setTodoByDate(data);
      } else {
        console.warn('서버에서 배열이 아닌 응답을 받았습니다:', data);
        setTodoByDate([]);
      }
    } catch (err) {
      console.error('❌ 할일 조회 실패:', err);
      alert('할일 목록을 불러오지 못했습니다.');
      setTodoByDate([]);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // ✅ 목표 등록 처리
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
      console.log('✅ 목표 등록 성공:', savedGoal);

      // 승인 대기 리스트에 추가
      setApprovalTasks(prev => [...prev, { id: savedGoal.id, text: savedGoal.title }]);

      // 할일 다시 불러오기
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

      {/* 목표 승인 대기 */}
      <GoalBlock type="pending" tasks={approvalTasks} />

      {/* 날짜별 할일 목록 */}
      {todoByDate.map(entry => (
        <GoalBlock
          key={entry.date}
          type="list"
          day={entry.date}
          onDone={loadTodos} // ✅ 체크박스 클릭 시 목록 새로고침
          tasks={entry.todoList.map(todo => ({
            id: todo.id,
            text: todo.title,
            done: todo.state === 'DONE',
          }))}
        />
      ))}

      {/* 목표 등록 모달 */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitGoal}
      />
    </div>
  );
}

export default Home;
