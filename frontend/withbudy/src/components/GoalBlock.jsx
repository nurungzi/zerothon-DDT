// src/components/GoalBlock.jsx
import React from 'react';
import './GoalBlock.css';

function GoalBlock({ type, day, tasks, onClick }) {
  // '목표 추가' 타입
  if (type === 'add') {
    return (
      <div className="goal-block add-goal" onClick={onClick}>
        <button className="add-goal-btn">목표 추가</button>
      </div>
    );
  }

  // 기본 또는 'pending' 타입의 목표 리스트
  return (
    <div className={`goal-block ${type === 'pending' ? 'pending-goal' : ''}`}>
      {/* 제목 표시: '오늘', 'D-1', 또는 '목표 승인 대기' */}
      <div className="goal-block-title">{type === 'pending' ? '목표 승인 대기' : day}</div>

      <div className="goal-task-list">
        {tasks.map((task, idx) => (
          <div className="goal-task-item" key={idx}>
            <span>{task.text}</span>

            {/* ✅ pending 타입이 아닐 경우에만 체크박스 표시 */}
            {type !== 'pending' && (
              <input type="checkbox" checked={task.done} readOnly />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalBlock;
