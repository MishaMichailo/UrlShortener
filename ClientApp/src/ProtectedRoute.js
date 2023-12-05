import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log("User is authenticated.");
    return children; 
  } else {
    console.log("User is not authenticated. Redirecting to login.");
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;