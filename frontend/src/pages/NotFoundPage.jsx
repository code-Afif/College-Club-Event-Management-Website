import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-surface-container-high">
      <div className="border border-outline-variant bg-surface-container-low p-space-xl max-w-lg w-full">
        <h1 className="text-8xl font-headline font-bold text-error mb-4 select-none">404</h1>
        <h2 className="text-2xl font-label-mono text-label-mono font-bold uppercase mb-6 text-on-surface">
          [ERR] NODE_NOT_FOUND
        </h2>
        <p className="text-on-surface-variant font-label-mono text-label-mono text-sm max-w-md mb-8 mx-auto leading-relaxed border-l-2 border-error pl-4 text-left">
          The requested resource could not be located on this partition. It may have been purged, re-indexed, or never existed in the current branch.
        </p>
        <Link to="/">
          <Button variant="outline" size="lg" className="w-full text-on-surface hover:bg-surface-container border-outline-variant hover:text-primary-container hover:border-primary-container">
            INITIATE_FALLBACK_ROUTING [HOME]
          </Button>
        </Link>
      </div>
    </div>
  );
}
