import React from 'react';
import { FeedbackResponse } from '../types';
import { FeedbackCard } from '../components/FeedbackCard';

interface FeedbackPageProps {
  feedback: FeedbackResponse;
  onRestart: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = ({ feedback, onRestart }) => {
  return (
    <div className="feedback-page">
      <div className="feedback-header">
        <h1>Результаты оценки</h1>
        <p>Спасибо за прохождение тренажера!</p>
      </div>

      <div className="feedback-content">
        <div className="overall-score-section">
          <FeedbackCard title="Общий результат" score={feedback.score} />
        </div>

        <div className="metrics-section">
          <div className="metrics-grid">
            <FeedbackCard title="Открытость" score={feedback.communication_score} />
            <FeedbackCard title="Эмпатия" score={feedback.empathy_score} />
            <FeedbackCard title="Ясность выражения" score={feedback.clarity_score} />
          </div>
        </div>

        <div className="feedback-text-section">
          <div className="feedback-text-card">
            <h2>Общая оценка</h2>
            <p>{feedback.feedback}</p>
          </div>

          <div className="strengths-section">
            <h2>Ваши сильные стороны:</h2>
            <ul>
              {feedback.strengths.map((strength, idx) => (
                <li key={idx}>✓ {strength}</li>
              ))}
            </ul>
          </div>

          <div className="improvements-section">
            <h2>Области для развития:</h2>
            <ul>
              {feedback.improvements.map((improvement, idx) => (
                <li key={idx}>→ {improvement}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="action-section">
          <button className="restart-button" onClick={onRestart}>
            Начать заново
          </button>
        </div>
      </div>
    </div>
  );
};
