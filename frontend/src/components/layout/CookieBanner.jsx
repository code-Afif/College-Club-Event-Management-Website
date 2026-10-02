import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it slides in after mount
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 no-print"
        >
          <div className="max-w-7xl mx-auto glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex-grow">
              <h3 className="font-display font-bold text-lg mb-2">Cookie Preferences</h3>
              <p className="text-text-muted text-sm max-w-3xl">
                We use cookies to improve your experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button variant="outline" onClick={handleDecline}>Decline</Button>
              <Button variant="secondary" onClick={() => alert('Preferences Modal Triggered')}>Preferences</Button>
              <Button variant="primary" onClick={handleAccept}>Accept All</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
