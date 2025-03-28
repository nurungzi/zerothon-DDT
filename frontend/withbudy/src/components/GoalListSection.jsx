import React from 'react';
import './GoalListSection.css';

function GoalListSection({ successGoals, failedGoals }) {
  return (
    <section className="goal-list-section">
      <div className="goal-column">
        <h3 className="goal-title">성공한 목표</h3>
        <ul className="goal-list">
          {successGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>

      <div className="goal-column">
        <h3 className="goal-title">실패한 목표</h3>
        <ul className="goal-list">
          {failedGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default GoalListSection;
