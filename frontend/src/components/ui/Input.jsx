import React, { forwardRef } from 'react';
import { cn } from './Button.jsx';

export const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full relative">
      <input
        type={type}
        className={cn(
          "flex h-11 w-full border border-outline-variant bg-surface-container-low px-4 py-2 font-label-mono text-label-mono text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container focus:border-primary-container disabled:cursor-not-allowed disabled:opacity-50 transition-none",
          error && "border-error focus:ring-error focus:border-error",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <span className="text-error text-xs mt-1 absolute -bottom-5 left-1 font-label-mono font-bold">{error}</span>
      )}
    </div>
  );
});
Input.displayName = "Input";
