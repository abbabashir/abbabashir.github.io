import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './section/Hero';
import Stats from './section/Stats';
import Projects from './section/Projects';
import LogoCloud from './section/LogoCloud';
import SoftSkills from './section/SoftSkills';
import Experience from './section/Experience';
import Skills from './section/Skills';
import Communities from './section/Communities';
import Testimonials from './section/Testimonials';
import Contact from './section/Contact';
import Footer from './section/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-zinc-100 transition-colors duration-300">
      {/* Initial Minimal Loader */}
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Blurred Navbar */}
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Main Content Experience */}
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Projects />
        <LogoCloud />
        <SoftSkills />
        <Experience />
        <Skills />
        <Communities />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
