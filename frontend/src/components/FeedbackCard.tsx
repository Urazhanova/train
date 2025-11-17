import React from 'react';

interface FeedbackCardProps {
  title: string;
  score: number;
  color?: string;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ title, score, color = '#4CAF50' }) => {
  const getScoreColor = (): string => {
    if (score >= 80) return '#4CAF50'; // green
    if (score >= 60) return '#FFC107'; // yellow
    if (score >= 40) return '#FF9800'; // orange
    return '#F44336'; // red
  };

  return (
    <div className="feedback-card">
      <h3>{title}</h3>
      <div className="score-container">
        <div className="score-circle" style={{ borderColor: getScoreColor() }}>
          <div className="score-number">{Math.round(score)}</div>
          <div className="score-label">из 100</div>
        </div>
      </div>
      <div className="score-bar">
        <div
          className="score-fill"
          style={{
            width: `${score}%`,
            backgroundColor: getScoreColor(),
          }}
        ></div>
      </div>
    </div>
  );
};
