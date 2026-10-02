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
    <Modal isOpen={isOpen} onClose={onClose} title="ALLOCATE SEAT">
      {registerMutation.isSuccess ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-primary-container text-surface-container-lowest w-16 h-16 flex items-center justify-center border border-primary-container mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-headline font-bold mb-2 uppercase text-on-surface">ALLOCATION SUCCESS</h3>
          <p className="text-on-surface-variant font-label-mono text-label-mono mb-6">SLOT SECURED FOR {event.name.toUpperCase()}.</p>
          <Button onClick={onClose} className="w-full">ACKNOWLEDGE [↵]</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-on-surface-variant font-label-mono text-label-mono mb-4 border-l-2 border-primary-container pl-3">
            TARGET OPERATION: <strong className="text-primary">{event.name.toUpperCase()}</strong>
          </p>

          {registerMutation.isError && registerMutation.error.code !== 'VALIDATION_ERROR' && (
            <div className="bg-error/10 border border-error text-error px-4 py-3 flex items-start space-x-3 font-label-mono text-label-mono">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>[ERR] {registerMutation.error.message.toUpperCase()}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-label-mono text-on-surface mb-1 uppercase">IDENTITY [NAME]</label>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. JOHN DOE" error={errors.name} required />
            </div>
            <div>
              <label className="block text-sm font-label-mono text-on-surface mb-1 uppercase">NETWORK_ADDRESS [EMAIL]</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="user@domain.edu" error={errors.email} required />
            </div>
            <div>
              <label className="block text-sm font-label-mono text-on-surface mb-1 uppercase">NODE_GROUP [COLLEGE & YEAR]</label>
              <Input name="collegeYear" value={formData.collegeYear} onChange={handleChange} placeholder="CS 3RD YEAR" error={errors.collegeYear} required />
            </div>
            <div>
              <label className="block text-sm font-label-mono text-on-surface mb-1 uppercase">COMM_LINK [PHONE]</label>
              <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="1234567890" error={errors.phone} required />
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-2" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'PROCESSING...' : 'EXECUTE ALLOCATION'}
          </Button>
        </form>
      )}
    </Modal>
  );
}
