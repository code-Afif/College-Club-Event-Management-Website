import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { authApi } from '../../api/auth.js';
import { Button } from '../../components/ui/Button.jsx';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card.jsx';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      await signup({ name, email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
      <Card className="w-full max-w-md bg-surface-container-high border-outline-variant">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary font-headline font-bold">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 border border-error bg-error-container/20 text-error text-sm font-label-mono">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-label-mono text-outline">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body-md"
                required
              />
            </div>
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
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-label-mono text-outline">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant p-2.5 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-body-md"
                required
                minLength={8}
              />
            </div>
            
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? 'CREATING...' : 'CREATE ACCOUNT'}
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary-container hover:underline font-bold">
              LOG IN
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
