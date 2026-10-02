import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-surface-hover transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-stone-800" />}
    </button>
  );
}
