import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { TrainerPage } from './pages/TrainerPage';

const App: React.FC = () => {
  return (
    <Router basename="/train">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trainer" element={<TrainerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
