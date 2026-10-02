import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { authApi } from '../../api/auth.js';
import { Button } from '../../components/ui/Button.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.jsx';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Check URL params for OAuth errors
  const queryParams = new URLSearchParams(location.search);
  const oauthError = queryParams.get('error');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
      <Card className="w-full max-w-md bg-surface-container-high border-outline-variant">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary font-headline font-bold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          {oauthError && (
            <div className="mb-4 p-3 border border-error bg-error-container/20 text-error text-sm font-label-mono">
              OAuth authentication failed. Please try again or use email login.
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 border border-error bg-error-container/20 text-error text-sm font-label-mono">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-label-mono text-outline">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-label-mono text-outline">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body-md"
                required
              />
            </div>
            
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? 'AUTHENTICATING...' : 'LOG IN'}
            </Button>
          </form>

          <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-outline-variant after:mt-0.5 after:flex-1 after:border-t after:border-outline-variant">
            <p className="mx-4 mb-0 text-center font-label-mono text-outline text-xs">
              OR
            </p>
          </div>

          <div className="space-y-3">
            <a 
              href={authApi.getGoogleAuthUrl()} 
              className="flex items-center justify-center w-full bg-surface-container-low border border-outline-variant p-2.5 hover:border-primary-container hover:text-primary-container transition-colors font-label-mono"
            >
              CONTINUE WITH GOOGLE
            </a>
            <a 
              href={authApi.getGithubAuthUrl()} 
              className="flex items-center justify-center w-full bg-surface-container-low border border-outline-variant p-2.5 hover:border-primary-container hover:text-primary-container transition-colors font-label-mono"
            >
              CONTINUE WITH GITHUB
            </a>
          </div>

          <div className="mt-8 text-center text-sm font-label-mono text-outline">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-container hover:underline font-bold">
              SIGN UP
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
