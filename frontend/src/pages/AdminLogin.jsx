import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminLogin } from '../hooks/useAdmin.js';
import { Card, CardHeader, CardContent } from '../components/ui/Card.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginMutation = useAdminLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password }, {
      onSuccess: (res) => {
        localStorage.setItem('adminToken', res.token);
        navigate('/admin/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-0">
          <div className="mx-auto bg-amber-500/10 w-12 h-12 flex items-center justify-center rounded-xl mb-4 border border-amber-500/20">
            <Lock className="text-amber-500 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-display font-bold">Admin Kitchen</h1>
          <p className="text-text-muted mt-2 text-sm">Authorized personnel only</p>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMutation.isError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm text-center">
                {loginMutation.error.message || 'Invalid credentials'}
              </div>
            )}
            <div>
              <Input 
                type="email" 
                placeholder="Admin Email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Authenticating...' : 'Enter Kitchen'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
