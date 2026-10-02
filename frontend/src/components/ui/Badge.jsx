import React from 'react';
import { cn } from './Button.jsx';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-surface-container-low border border-outline-variant text-on-surface',
    primary: 'bg-primary-container/10 border border-primary-container text-primary-container',
  };
  return (
    <span 
      className={cn("inline-block px-1.5 py-0.5 border font-label-mono text-label-mono", variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
