import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="text-on-surface font-body-md antialiased selection:bg-primary-container selection:text-surface-container-lowest flex flex-col min-h-screen bg-surface-container-high overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-3 sm:px-space-md lg:px-space-lg flex items-center justify-between h-14 border-b border-outline-variant sticky top-0 z-50 bg-surface-container-high">
{/* Brand / Identity */}
<div className="flex items-center gap-space-md">
<Link className="font-headline-sm text-[13px] sm:text-headline-sm font-bold uppercase tracking-tight text-primary flex items-center gap-2 shrink-0" to="/">
<span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary-container animate-pulse shrink-0"></span>
<span className="">COLLECTIVE // SYS_LAB</span>
</Link>
<span className="hidden xl:inline-block px-1.5 py-0.5 border border-outline-variant bg-surface-container-low text-primary-container font-label-mono text-label-mono">
        [SYS_REV 4.2]
      </span>
<div className="hidden 2xl:flex items-center gap-1.5 pl-2 text-on-surface-variant font-label-mono text-label-mono border-l border-outline-variant">
<span className="inline-block w-1.5 h-1.5 bg-secondary-container"></span>
<span className="">RUNNING: SPRING_DIV_1 [IN 04H 21M]</span>
</div>
</div>
{/* Desktop Navigation */}
<nav className="hidden md:flex items-center space-x-6">
<Link className="text-on-surface-variant hover:text-on-surface font-label-mono text-label-mono uppercase tracking-wider transition-colors" to="/">
        Home
      </Link>
<Link className="text-on-surface-variant hover:text-on-surface font-label-mono text-label-mono uppercase tracking-wider transition-colors" to="/events">
        Events
      </Link>
<Link className="text-on-surface-variant hover:text-on-surface font-label-mono text-label-mono uppercase tracking-wider transition-colors" to="/admin">
        Admin
      </Link>
</nav>
{/* Trailing Actions & Shell Tools */}
<div className="flex items-center gap-2 shrink-0">
{/* Search Input inline right */}
<div className="hidden lg:flex items-center bg-surface-container-low border border-outline-variant px-2.5 py-1 text-on-surface font-label-mono text-label-mono w-48 focus-within:border-primary-container">
<span className="text-outline mr-1.5 font-bold">❯</span>
<input className="bg-transparent border-0 p-0 text-on-surface placeholder:text-outline focus:ring-0 w-full font-label-mono text-label-mono" placeholder="grep cmd [⌘K]..." type="text" />
</div>
{/* Icon Actions - hidden on mobile */}
<div className="hidden sm:flex items-center border border-outline-variant divide-x divide-outline-variant bg-surface-container-low">
<button className="p-1.5 text-on-surface-variant hover:text-primary-container transition-none flex items-center justify-center" title="terminal">
<span className="material-symbols-outlined text-[18px]">terminal</span>
</button>
<button className="p-1.5 text-on-surface-variant hover:text-primary-container transition-none flex items-center justify-center relative" title="notifications">
<span className="material-symbols-outlined text-[18px]">notifications</span>
<span className="absolute top-1 right-1 w-1.5 h-1.5 bg-secondary-container"></span>
</button>
<button className="p-1.5 text-on-surface-variant hover:text-primary-container transition-none flex items-center justify-center" title="code">
<span className="material-symbols-outlined text-[18px]">code</span>
</button>
</div>
{/* Trailing Action: terminal_join - hidden on mobile */}
<button className="hidden md:inline-flex items-center gap-2 bg-primary-container text-surface-container-lowest px-3 py-1.5 font-label-mono text-label-mono font-bold hover:translate-x-[-1px] hover:translate-y-[-1px] hard-shadow-citron active:translate-x-0 active:translate-y-0 transition-none" onClick={() => { document.getElementById('cli-section')?.scrollIntoView({behavior: 'smooth'}) }}>
<span className="">terminal_join</span>
<span className="material-symbols-outlined text-[15px]">arrow_forward</span>
</button>
{/* Trailing Action: git_checkout - compact on mobile */}
<a className="hidden sm:inline-flex items-center gap-1.5 border border-outline-variant bg-surface-container-low text-on-surface px-2 sm:px-2.5 py-1.5 font-label-mono text-label-mono hover:border-outline transition-none text-xs" href="https://github.com" rel="noreferrer" target="_blank">
<span className="text-primary-container">$</span>
<span className="">git_checkout</span>
</a>
{/* Hamburger Button - mobile only */}
<button
  className="md:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9 border border-outline-variant bg-surface-container-low text-on-surface-variant hover:border-primary-container hover:text-primary-container transition-none"
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
>
  <span className={`block w-4 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
  <span className={`block w-4 h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
  <span className={`block w-4 h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
</button>
</div>
</header>

{/* Mobile Menu Drawer */}
<div
  className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
>
  {/* Backdrop */}
  <div
    className={`absolute inset-0 bg-surface-container-lowest/80 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
    onClick={() => setMenuOpen(false)}
  />
  {/* Drawer panel */}
  <div
    className={`absolute top-14 right-0 w-64 bg-surface-container-high border-l border-b border-outline-variant transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
  >
    {/* Nav Links */}
    <nav className="flex flex-col divide-y divide-outline-variant font-label-mono text-label-mono">
      <Link
        to="/"
        className="flex items-center gap-3 px-5 py-4 text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low uppercase tracking-widest transition-none"
      >
        <span className="text-primary-container font-bold">/</span> Home
      </Link>
      <Link
        to="/events"
        className="flex items-center gap-3 px-5 py-4 text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low uppercase tracking-widest transition-none"
      >
        <span className="text-primary-container font-bold">/</span> Events
      </Link>
      <Link
        to="/admin"
        className="flex items-center gap-3 px-5 py-4 text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low uppercase tracking-widest transition-none"
      >
        <span className="text-primary-container font-bold">/</span> Admin
      </Link>
    </nav>
    {/* Bottom status */}
    <div className="px-5 py-3 border-t border-outline-variant font-label-mono text-label-mono text-[10px] text-outline flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-primary-container inline-block animate-pulse"></span>
      STATUS: OPERATIONAL
    </div>
  </div>
</div>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full px-3 sm:px-space-md lg:px-space-xl py-space-xl flex flex-col lg:flex-row justify-between items-start lg:items-center border-t border-outline-variant gap-space-lg bg-surface-container-high overflow-hidden">
{/* Left Column: Identity & Disclaimer */}
<div className="space-y-2">
<div className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
<span className="w-2 h-2 bg-primary-container"></span>
<span className="">COLLECTIVE // SYS_LAB</span>
</div>
<div className="font-ticker-mono text-ticker-mono text-on-surface-variant max-w-xl">
        SYS_REF // © 2025 ALGORITHMIC DEV COLLECTIVE. ALL RIGHTS RESERVED. RUNTIME: V4.18.9-RC2
      </div>
<div className="font-label-mono text-label-mono text-outline text-[11px]">
        CAMPUS NODE 42.3601° N, 71.0942° W — FACULTY OF ELECTRICAL ENGINEERING &amp; COMPUTER SCIENCE
      </div>
</div>
{/* Right Column: System Links & Operational Status from JSON */}
<div className="flex flex-wrap items-center gap-4 lg:gap-6 font-label-mono text-label-mono">
<span className="text-primary-container flex items-center gap-1.5 font-bold">
<span className="inline-block w-2 h-2 bg-primary-container"></span>
        STATUS: OPERATIONAL
      </span>
<a className="text-on-surface-variant hover:text-primary-container underline decoration-primary-container" href="#rss">
        RSS_FEED
      </a>
<a className="text-on-surface-variant hover:text-primary-container underline decoration-primary-container" href="https://discord.com" rel="noreferrer" target="_blank">
        DISCORD_SOCKET
      </a>
<span className="text-outline">
        AFFILIATION // CS_ENGINEERING
      </span>
<a className="text-on-surface-variant hover:text-primary-container underline decoration-primary-container" href="#security">
        SECURITY_DISCLOSURE
      </a>
<a className="text-on-surface-variant hover:text-primary-container underline decoration-primary-container" href="#api">
        TERMINAL_API
      </a>
</div>
</footer>
    </div>
  );
}
