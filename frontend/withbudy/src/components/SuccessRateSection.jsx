import React from 'react';
import ProgressBar from './ProgressBar';
import './SuccessRateSection.css';

function SuccessRateSection({ successRate, failureRate }) {
  return (
    <section className="success-rate-section">
      <h2 className="section-title">Buddy 목표 성공률</h2>

      <div className="progress-group">
        <ProgressBar icon="😀" rate={successRate} type="success" />
        <ProgressBar icon="😞" rate={failureRate} type="failure" />
      </div>

      <div className="rate-labels">
        <span>😀 성공률 {successRate}%</span>
        <span>😞 실패률 {failureRate}%</span>
      </div>
    </section>
  );
}

export default SuccessRateSection;