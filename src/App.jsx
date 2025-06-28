import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test/:type" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;

