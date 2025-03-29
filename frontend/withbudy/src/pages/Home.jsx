// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import GoalBlock from '../components/GoalBlock';
import GoalModal from '../components/GoalModal';
import {
  createTodo,
  fetchTodoByDate,
  fetchWaitingTodos
} from '../api';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoByDate, setTodoByDate] = useState([]);
  const [approvalTasks, setApprovalTasks] = useState([]);
  const currentUserId = 1; // ✅ 임시 로그인 유저 ID

  // ✅ 할일 & 승인 대기 목록 불러오기
  const loadTodos = async () => {
    try {
      // 1. 날짜별 할일
      const todoData = await fetchTodoByDate(currentUserId);
      if (Array.isArray(todoData)) {
        setTodoByDate(todoData);
      } else {
        setTodoByDate([]);
      }

      // 2. 승인 대기 목록 (WAITING 상태)
      const waitingData = await fetchWaitingTodos(currentUserId);
      if (Array.isArray(waitingData)) {
        const waitingList = waitingData.map(todo => ({
          id: todo.id,
          text: todo.title
        }));
        setApprovalTasks(waitingList);
      } else {
        setApprovalTasks([]);
      }
    } catch (err) {
      console.error('❌ 할일 조회 실패:', err);
      alert('할일 목록을 불러오지 못했습니다.');
      setTodoByDate([]);
      setApprovalTasks([]);
    }
  };

  // ✅ 마운트 시 데이터 불러오기
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

      {/* 목표 승인 대기 블록 */}
      {approvalTasks.length > 0 && (
        <GoalBlock type="pending" tasks={approvalTasks} />
      )}

      {/* 날짜별 할일 블록 */}
      {todoByDate.map(entry => {
        const tasks = entry.todoList
          .filter(todo =>
            todo.state === 'DOING' ||
            todo.state === 'CREATE'
          )
          .map(todo => ({
            id: todo.id,
            text: todo.title,
            done: todo.state === 'DONE',
          }));

        if (tasks.length === 0) return null;

        return (
          <GoalBlock
            key={entry.date}
            type="list"
            day={entry.date}
            tasks={tasks}
            onDone={loadTodos}
          />
        );
      })}

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
