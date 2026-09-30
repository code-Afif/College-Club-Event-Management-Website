import React from 'react';
import { cn } from './Button.jsx';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-surface border border-border text-text-muted',
    amber: 'bg-amber-500/10 border border-amber-500/20 text-amber-500',
  };
  return (
    <span 
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-mono", variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
