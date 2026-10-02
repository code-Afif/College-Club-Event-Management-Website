import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminLogin } from '../hooks/useAdmin.js';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Lock, Eye, EyeOff } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-surface-container-high">
      <div className="w-full max-w-md border border-outline-variant bg-surface-container-low p-space-xl">
        <div className="text-center pb-space-lg mb-space-lg border-b border-outline-variant relative">
          <Link to="/" className="absolute top-0 left-0 font-label-mono text-label-mono text-outline hover:text-primary transition-none underline">
            [RETURN TO ROOT]
          </Link>
          <div className="mx-auto bg-primary-container w-12 h-12 flex items-center justify-center mb-4 mt-6 border border-outline-variant">
            <Lock className="text-surface-container-lowest w-6 h-6" />
          </div>
          <h1 className="text-2xl font-headline font-bold text-primary uppercase">Sys Admin</h1>
          <p className="text-on-surface-variant font-label-mono text-label-mono mt-2">RESTRICTED_ACCESS // AUTHORIZED_ONLY</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginMutation.isError && (
              <div className="bg-error/10 border border-error text-error font-label-mono text-label-mono px-4 py-2 text-center">
                [ERR] {loginMutation.error.message || 'AUTHENTICATION_FAILED'}
              </div>
            )}
            <div>
              <Input 
                type="text" 
                placeholder="ADMIN_ID [USERNAME]" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-surface-container border-outline-variant text-on-surface"
              />
            </div>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="CREDENTIAL_TOKEN [PASSWORD]" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="pr-10 bg-surface-container border-outline-variant text-on-surface"
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button type="submit" className="w-full mt-4 bg-primary-container text-surface-container-lowest border border-primary-container hover:-translate-x-px hover:-translate-y-px hard-shadow-citron transition-none" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'NEGOTIATING...' : 'INITIALIZE_SESSION [↵]'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
