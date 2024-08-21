import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { empleado } = useAuth();
  if (!empleado) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
