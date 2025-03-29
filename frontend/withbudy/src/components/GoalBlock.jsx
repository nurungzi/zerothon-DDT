// src/components/GoalBlock.jsx
import React from 'react';
import './GoalBlock.css';
import { markTodoDone } from '../api';

function GoalBlock({ type, day, tasks, onAddClick, onDone }) {
  // ✅ '목표 추가' 버튼 블럭
  if (type === 'add') {
    return (
      <div className="goal-block add-goal" onClick={onAddClick}>
        <button className="add-goal-btn">목표 추가</button>
      </div>
    );
  }

  const handleCheckboxClick = async (task) => {
    if (task.done) return;
    try {
      await markTodoDone(task.id);
      alert('✅ 할일 완료 처리됨');
      if (onDone) onDone(task); // 체크된 항목 상위로 전달
    } catch (error) {
      alert('❌ 완료 처리 실패');
    }
  };

  return (
    <div className={`goal-block ${type === 'pending' ? 'pending-goal' : ''}`}>
      <div className="goal-block-title">
        {type === 'pending' ? '목표 승인 대기' : day}
      </div>

      <div className="goal-task-list">
        {tasks.map((task, idx) => (
          <div className="goal-task-item" key={idx}>
            <span>{task.text}</span>
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
