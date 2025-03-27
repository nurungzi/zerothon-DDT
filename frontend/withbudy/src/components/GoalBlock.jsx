// src/components/GoalBlock.jsx
import React from 'react';
import './GoalBlock.css';

function GoalBlock({ type = 'list', day = '오늘', tasks = [] }) {
  if (type === 'add') {
    return (
      <div className="goal-block">
        <button className="add-goal-btn">목표 추가</button>
      </div>
    );
  }

  return (
    <div className="goal-block">
      <div className="goal-block-title">{day}</div>
      <div className="goal-task-list">
        {tasks.map((task, idx) => (
          <div className="goal-task-item" key={idx}>
            <span>{task.text}</span>
            <input type="checkbox" checked={task.done} readOnly />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalBlock;
