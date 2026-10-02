import React, { useState } from 'react';
import { useAdminCreateEvent } from '../../hooks/useAdmin.js';
import { BASE_URL } from '../../lib/api.js';
import { Modal } from '../ui/Modal.jsx';
import { Input } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';

export function CreateEventModal({ isOpen, onClose }) {
  const createMutation = useAdminCreateEvent();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    venue: '',
    startsAt: '',
    endsAt: '',
    bannerUrl: '',
    capacity: '',
    isFeatured: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      setIsUploading(true);
      const token = localStorage.getItem('adminToken');
      // Replace /api at the end of BASE_URL with /api/admin/upload for the endpoint
      // Or just append /admin/upload to BASE_URL
      const uploadUrl = `${BASE_URL}/admin/upload`;
      
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });
      const data = await res.json();
      
      if (data.success) {
        // Construct the full URL using BASE_URL origin
        const urlObj = new URL(BASE_URL);
        const imageUrl = `${urlObj.origin}${data.data.url}`;
        setFormData(prev => ({ ...prev, bannerUrl: imageUrl }));
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert capacity to number if provided
    const payload = { ...formData };
    if (payload.capacity) {
      payload.capacity = parseInt(payload.capacity, 10);
    } else {
      delete payload.capacity;
    }
    
    // EndsAt is optional
    if (!payload.endsAt) {
      delete payload.endsAt;
    }
    
    // BannerUrl is optional
    if (!payload.bannerUrl) {
      delete payload.bannerUrl;
    }

    // Convert local datetime strings to ISO UTC
    payload.startsAt = new Date(payload.startsAt).toISOString();
    if (payload.endsAt) {
      payload.endsAt = new Date(payload.endsAt).toISOString();
    }

    createMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
        // Reset form
        setFormData({
          name: '', description: '', category: '', venue: '',
          startsAt: '', endsAt: '', bannerUrl: '', capacity: '', isFeatured: false
        });
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Initialize New Event">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        {createMutation.isError && (
          <div className="bg-error/10 border border-error text-error font-label-mono text-label-mono px-4 py-2">
            [ERR] {createMutation.error.message || 'CREATION_FAILED'}
          </div>
        )}
        
        <div>
          <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Event Name *</label>
          <Input name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Hackathon 2026" className="bg-surface-container border-outline-variant" />
        </div>
        
        <div>
          <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Description *</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows={3}
            placeholder="Event details..." 
            className="w-full bg-surface-container border border-outline-variant text-on-surface p-2 font-body text-sm focus:outline-none focus:border-primary transition-none resize-none" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Category *</label>
            <Input name="category" value={formData.category} onChange={handleChange} required placeholder="e.g. Technology" className="bg-surface-container border-outline-variant" />
          </div>
          <div>
            <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Venue *</label>
            <Input name="venue" value={formData.venue} onChange={handleChange} required placeholder="e.g. Main Auditorium" className="bg-surface-container border-outline-variant" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Starts At *</label>
            <Input type="datetime-local" name="startsAt" value={formData.startsAt} onChange={handleChange} required className="bg-surface-container border-outline-variant text-on-surface" />
          </div>
          <div>
            <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Ends At</label>
            <Input type="datetime-local" name="endsAt" value={formData.endsAt} onChange={handleChange} className="bg-surface-container border-outline-variant text-on-surface" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Capacity</label>
            <Input type="number" name="capacity" value={formData.capacity} onChange={handleChange} min="1" placeholder="e.g. 100" className="bg-surface-container border-outline-variant" />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-label-mono text-label-mono text-outline mb-1 uppercase">Banner URL</label>
            <div className="flex gap-2">
              <Input name="bannerUrl" value={formData.bannerUrl} onChange={handleChange} placeholder="https://..." className="bg-surface-container border-outline-variant flex-grow min-w-0" />
              <label className="bg-surface-container-low border border-outline-variant text-on-surface px-3 py-2 flex items-center justify-center font-label-mono text-xs uppercase cursor-pointer hover:bg-surface-container whitespace-nowrap transition-colors">
                {isUploading ? 'WAIT' : 'UPLOAD'}
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" disabled={isUploading} />
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <input 
            type="checkbox" 
            id="isFeatured" 
            name="isFeatured" 
            checked={formData.isFeatured} 
            onChange={handleChange} 
            className="w-4 h-4 accent-primary bg-surface-container border-outline-variant"
          />
          <label htmlFor="isFeatured" className="font-label-mono text-label-mono text-on-surface uppercase cursor-pointer">
            Mark as Featured Event
          </label>
        </div>
        
        <div className="pt-4 border-t border-outline-variant flex justify-end gap-3 mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>
            CANCEL
          </Button>
          <Button type="submit" disabled={createMutation.isPending || isUploading}>
            {createMutation.isPending ? 'DEPLOYING...' : 'COMMIT_RECORD [↵]'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
