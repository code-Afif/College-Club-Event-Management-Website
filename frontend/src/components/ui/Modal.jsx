import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-surface-container-high/80 backdrop-blur-sm">
      <div 
        onClick={onClose}
        className="absolute inset-0"
      />
      <div
        className="relative w-full max-w-lg border border-outline-variant bg-surface-container-low flex flex-col hard-shadow-dark"
      >
        <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container">
          <h2 className="text-xl font-headline font-bold uppercase text-primary">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-outline-variant transition-none"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-space-lg">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
