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
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20",
    secondary: "bg-surface border border-border text-text hover:bg-surface-hover",
    outline: "border border-amber-500/50 text-amber-500 hover:bg-amber-500/10",
    ghost: "text-text hover:bg-surface-hover",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
