// src/components/GoalBlock.jsx
import React from 'react';
import './GoalBlock.css';
import { markTodoDone } from '../api';

function GoalBlock({ type, day, tasks, onAddClick, onDone }) {
  // '목표 추가' 블록
  if (type === 'add') {
    return (
      <div className="goal-block add-goal" onClick={onAddClick}>
        <button className="add-goal-btn">목표 추가</button>
      </div>
    );
  }

  // 체크박스 클릭 시 완료 처리
  const handleCheckboxClick = async (task) => {
    if (task.done) return; // 이미 완료된 항목은 무시

    try {
      await markTodoDone(task.id);
      alert('✅ 할일 완료 처리됨');

      if (onDone) onDone(); // 완료 후 목록 새로고침
    } catch (error) {
      alert('❌ 완료 처리 실패');
    }
  };

  return (
    <div className={`goal-block ${type === 'pending' ? 'pending-goal' : ''}`}>
      <div className="goal-block-title">{type === 'pending' ? '목표 승인 대기' : day}</div>

      <div className="goal-task-list">
        {tasks.map((task, idx) => (
          <div className="goal-task-item" key={idx}>
            <span>{task.text}</span>

            {/* 체크박스는 pending 타입 아닐 때만 표시 */}
            {type !== 'pending' && (
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleCheckboxClick(task)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalBlock;
