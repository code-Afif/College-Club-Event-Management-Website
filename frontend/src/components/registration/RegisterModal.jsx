import React, { useState } from 'react';
import { useRegisterEvent } from '../../hooks/useEvents.js';
import { Modal } from '../ui/Modal.jsx';
import { Input } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function RegisterModal({ event, isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', collegeYear: '', phone: '' });
  const [errors, setErrors] = useState({});
  const registerMutation = useRegisterEvent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    registerMutation.mutate({ eventId: event.id, data: formData }, {
      onError: (error) => {
        if (error.code === 'VALIDATION_ERROR' && error.details) {
          setErrors(error.details);
        }
      }
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve your seat">
      {registerMutation.isSuccess ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-green-500/10 text-green-500 w-16 h-16 flex items-center justify-center rounded-full mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-display font-semibold mb-2">You're in!</h3>
          <p className="text-text-muted mb-6">We've saved your spot for {event.name}.</p>
          <Button onClick={onClose} className="w-full">Awesome</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-text-muted mb-4">You are registering for <strong className="text-text">{event.name}</strong>.</p>

          {registerMutation.isError && registerMutation.error.code !== 'VALIDATION_ERROR' && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{registerMutation.error.message}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" error={errors.name} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@college.edu" error={errors.email} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">College & Year</label>
              <Input name="collegeYear" value={formData.collegeYear} onChange={handleChange} placeholder="e.g. CS 3rd Year" error={errors.collegeYear} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="1234567890" error={errors.phone} required />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Reserving...' : 'Confirm Registration'}
          </Button>
        </form>
      )}
    </Modal>
  );
}
