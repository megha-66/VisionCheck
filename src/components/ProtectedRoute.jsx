import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isOAuthAuthenticated } from '../oauth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!isOAuthAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
