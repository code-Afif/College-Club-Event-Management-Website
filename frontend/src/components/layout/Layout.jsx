import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
              <Terminal className="text-amber-500 w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">CodeClub</span>
          </Link>
          <div className="flex space-x-6 items-center">
            <Link to="/events" className="text-text-muted hover:text-text font-medium transition-colors">Events</Link>
            <Link to="/admin" className="text-text-muted hover:text-text font-medium transition-colors text-sm">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted">
        <p className="font-mono text-sm">© {new Date().getFullYear()} CodeClub. Built with ❤️ and lots of coffee.</p>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
