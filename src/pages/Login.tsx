
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { authService } from '@/services/authService';

const Login: React.FC = () => {
  if (authService.isAuthenticated()) {
    return <Navigate to="/my-status" replace />;
  }

  const handleLoginSuccess = () => {
    window.location.href = '/my-status';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
