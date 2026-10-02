import React, { useState, useEffect } from 'react';
import { useAdminUpdateUser } from '../../hooks/useAdmin.js';
import { Button } from '../ui/Button.jsx';
import { X } from 'lucide-react';

export function EditUserModal({ isOpen, onClose, user }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const updateMutation = useAdminUpdateUser();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(
      { id: user.id, data: formData },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-high/90 backdrop-blur-sm">
      <div className="bg-surface-container-low border border-outline-variant p-6 max-w-md w-full font-label-mono hard-shadow-dark">
        <div className="flex justify-between items-center border-b border-outline-variant pb-2 mb-4">
          <h3 className="text-xl font-headline font-bold uppercase text-primary">MOD_USER // {user.id.substring(0, 8)}</h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary transition-none">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Identity</label>
            <input
              type="text"
              required
              className="w-full bg-surface-container border border-outline-variant px-3 py-2 text-on-surface font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-none"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1">Contact Address</label>
            <input
              type="email"
              required
              className="w-full bg-surface-container border border-outline-variant px-3 py-2 text-on-surface font-body-md focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-none"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {updateMutation.isError && (
            <div className="text-error text-sm font-bold border border-error bg-error/10 p-2">
              ERR: {updateMutation.error.message}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant">
            <Button type="button" variant="outline" onClick={onClose}>
              ABORT
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'PROCESSING...' : 'EXEC_MOD'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
