import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={(
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/test/:type"
            element={(
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/results"
            element={(
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
