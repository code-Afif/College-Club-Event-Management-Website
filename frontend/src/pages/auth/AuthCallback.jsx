import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

export function AuthCallback() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { completeOAuthLogin } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      
      if (!token) {
        setError('Authentication failed. No token received.');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      try {
        await completeOAuthLogin(token);
        navigate('/');
      } catch (err) {
        console.error('OAuth login completion failed:', err);
        setError('Failed to complete authentication.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [location, navigate, completeOAuthLogin]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-surface-container-high text-error font-label-mono">
        <p>{error}</p>
        <p className="mt-2 text-outline text-xs">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-surface-container-high">
      <div className="w-8 h-8 bg-primary-container animate-ping mb-4"></div>
      <div className="font-label-mono text-primary-container">FINALIZING_AUTH_SESSION...</div>
    </div>
  );
}
