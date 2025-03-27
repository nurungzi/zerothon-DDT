import React from 'react';
import './GoalBlock.css';

function GoalBlock({ type = 'list', day = '오늘', tasks = [] }) {
  // 'type'이 'add'면 목표 추가 버튼만 표시
  if (type === 'add') {
    return (
      <div className="goal-block">
        <button className="add-goal-btn">목표 추가</button>
      </div>
    );
  }

  // 'list' 타입일 때는 day 제목 + 할일 목록 표시
  return (
    <div className="goal-block">
      <div className="goal-block-title">{day}</div>
      <div className="goal-task-list">
        {tasks.length === 0 ? (
          <p className="no-task">할 일이 없습니다.</p>
        ) : (
          tasks.map((task, index) => (
            <div className="goal-task-item" key={index}>
              <span>{task.text}</span>
              <input type="checkbox" checked={task.done} readOnly />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GoalBlock;
