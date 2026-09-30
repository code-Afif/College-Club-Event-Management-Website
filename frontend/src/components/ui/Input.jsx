import React, { forwardRef } from 'react';
import { cn } from './Button.jsx';

export const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full relative">
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-border bg-surface/50 px-4 py-2 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1 font-medium">{error}</span>
      )}
    </div>
  );
});
Input.displayName = "Input";
