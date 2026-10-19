import React from 'react';
import { ArrowUp } from 'lucide-react';
import SocialLinks from '../components/SocialLinks';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#000000] dark:bg-[#000000] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Identity */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xl font-black tracking-widest text-white">
              BASHIR ALIYU
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Software Developer • AI/ML Engineer • Full-Stack Developer • Community Builder
          </p>
          <p className="text-xs font-mono text-zinc-500 mt-1">
            Abuja, Nigeria • Designing and shipping production-grade digital products.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-col items-center gap-3">
          <SocialLinks showLabel={false} />
          <span className="text-[11px] font-mono text-zinc-500">
            Open Source &amp; Research Driven
          </span>
        </div>

        {/* Right: Back to Top & Copyright */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-3">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 border border-white/10 transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>

          <p className="text-xs font-mono text-zinc-500">
            © 2026 Bashir Aliyu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
