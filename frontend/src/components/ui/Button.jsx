import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {React.ReactNode} props.children
 */
export function Button({ className, variant = 'primary', size = 'md', children, ...props }) {
  const base = "inline-flex items-center justify-center font-label-mono text-label-mono font-bold uppercase transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container disabled:pointer-events-none disabled:opacity-50 hover:-translate-x-px hover:-translate-y-px active:translate-x-0 active:translate-y-0";
  
  const variants = {
    primary: "bg-primary-container text-surface-container-lowest border border-primary-container hard-shadow-citron",
    secondary: "bg-surface-container-low border border-outline-variant text-on-surface hover:bg-surface-container hard-shadow-dark",
    outline: "border border-primary-container text-primary-container hover:bg-primary-container/10 hard-shadow-citron",
    ghost: "text-on-surface hover:bg-surface-container-high hover:-translate-x-0 hover:-translate-y-0",
    danger: "bg-error text-onError border border-error hard-shadow-dark",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
