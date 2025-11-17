import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Пожалуйста, подождите...</p>
    </div>
  );
};
