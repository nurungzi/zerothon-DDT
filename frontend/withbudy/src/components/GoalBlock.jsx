// src/components/GoalBlock.jsx
import React from 'react';
import './GoalBlock.css';
import { markTodoDone } from '../api'; // ✅ 추가

function GoalBlock({ type, day, tasks, onClick }) {
  // '목표 추가' 블록
  if (type === 'add') {
    return (
      <div className="goal-block add-goal" onClick={onClick}>
        <button className="add-goal-btn">목표 추가</button>
      </div>
    );
  }

  // ✅ 체크박스 클릭 시 완료 API 호출
  const handleCheckboxClick = async (task) => {
    if (task.done) return; // 이미 완료된 항목은 무시
    try {
      await markTodoDone(task.id);
      alert('✅ 할일 완료 처리됨');
      // 👉 이후 할일 목록을 새로 불러오거나, 새로고침 또는 상태 갱신 필요
    } catch (error) {
      alert('❌ 완료 처리 실패');
    }
  };

  // 기본 또는 'pending' 타입 목록
  return (
    <div className={`goal-block ${type === 'pending' ? 'pending-goal' : ''}`}>
      <div className="goal-block-title">{type === 'pending' ? '목표 승인 대기' : day}</div>

      <div className="goal-task-list">
        {tasks.map((task, idx) => (
          <div className="goal-task-item" key={idx}>
            <span>{task.text}</span>

            {/* ✅ 'pending' 아니면 체크박스 표시 */}
            {type !== 'pending' && (
              <input
                type="checkbox"
                checked={task.done}
                readOnly
                onClick={() => handleCheckboxClick(task)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalBlock;
