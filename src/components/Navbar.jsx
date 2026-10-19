import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Work', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Communities', href: '#communities' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      // Section tracking
      const sections = ['hero', 'projects', 'experience', 'skills', 'communities', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'py-3 bg-black/70 dark:bg-black/80 backdrop-blur-xl border-b border-white/[0.08] dark:border-white/[0.08] shadow-2xl shadow-black/50'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Minimal Wordmark */}
        <a
          href="#hero"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
        >
          <span className="font-mono text-lg font-black tracking-widest text-zinc-100 group-hover:text-blue-400 transition-colors">
            BASHIR
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
        </a>

        {/* Center: Desktop Nav */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-zinc-950/60 dark:bg-zinc-950/80 border border-white/10 dark:border-white/10 backdrop-blur-md"
        >
          {NAV_LINKS.map((link) => {
            const sectionTarget = link.href.replace('#', '');
            const isActive = activeSection === sectionTarget;

            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-full ${isActive
                    ? 'text-white bg-white/10 dark:bg-white/10 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Contact Me CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide text-zinc-900 bg-white hover:bg-zinc-200 dark:text-zinc-950 dark:bg-zinc-100 dark:hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-blue-500/20 active:scale-95"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white bg-zinc-900/60 border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 dark:bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-base font-medium text-zinc-300 hover:text-white border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-black bg-white rounded-xl"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
