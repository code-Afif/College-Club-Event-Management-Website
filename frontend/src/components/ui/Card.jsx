import React from 'react';
import { cn } from './Button.jsx';

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({ className, children, ...props }) {
  return (
    <div className={cn("glass-card overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn("p-6", className)} {...props}>{children}</div>;
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }) {
  return <div className={cn("p-6 pt-0 flex items-center", className)} {...props}>{children}</div>;
}
