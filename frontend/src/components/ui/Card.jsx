import React from 'react';
import { cn } from './Button.jsx';

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({ className, children, ...props }) {
  return (
    <div className={cn("border border-outline-variant bg-surface-container-low flex flex-col", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn("p-4 md:p-6 border-b border-outline-variant", className)} {...props}>{children}</div>;
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn("p-4 md:p-6 flex-grow", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }) {
  return <div className={cn("p-4 md:p-6 border-t border-outline-variant flex items-center bg-surface-container", className)} {...props}>{children}</div>;
}
