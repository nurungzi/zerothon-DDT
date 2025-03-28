import React from 'react';
import './ProgressBar.css';

function ProgressBar({ icon, rate, type }) {
  return (
    <div className={`progress-bar ${type}`}>
      <span className="icon">{icon}</span>
      <div className="bar-container">
        <div
          className="bar-fill"
          style={{ width: `${rate}%` }}
        ></div>
        {/* <div className="bar-fill" style={{ width: '80%', backgroundColor: 'red' }}></div> */}

      </div>
    </div>
  );
}

export default ProgressBar;