import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { TrainerPage } from './pages/TrainerPage';

const App: React.FC = () => {
  // Use PUBLIC_URL for production (GitHub Pages) or "/" for local development
  const basename = process.env.PUBLIC_URL && process.env.PUBLIC_URL !== '/'
    ? process.env.PUBLIC_URL
    : '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trainer" element={<TrainerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
