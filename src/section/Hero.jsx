import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MessageSquare, Terminal, MapPin } from 'lucide-react';
import HeroScene from '../components/HeroScene';
import Button from '../components/Button';

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Introduction & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Location & Status Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md"
          >
            <span className="text-xs font-mono text-zinc-300">
              Available for New Engineering Opportunities
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-400" />
              Abuja, Nigeria
            </span>
          </div>

          {/* Large Confident Headline */}
          <div ref={headlineRef} className="space-y-1 mb-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              BUILDING DIGITAL
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-400 leading-[1.08]">
              PRODUCTS THAT
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-[1.08]">
              MATTER.
            </h1>
          </div>

          {/* Professional Narrative Copy */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8"
          >
            I'm <span className="text-white font-semibold">Bashir Aliyu</span>, a software developer and AI/ML engineer focused on building scalable, intelligent, and user-centered digital products. I work across frontend, backend, mobile, and machine learning — turning complex ideas into products people can actually use.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Button href="#projects" variant="primary">
              View My Work
            </Button>
            <Button href="#contact" variant="secondary" icon={false}>
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                Let's Talk
              </span>
            </Button>
          </div>

          {/* Quick Credibility Footnote */}
          <div className="flex items-center gap-4 mt-10 pt-6 border-t border-white/[0.06] text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Full-Stack &amp; AI</span>
            </div>
            <span>•</span>
            <span>Spring Boot</span>
            <span>•</span>
            <span>React</span>
            <span>•</span>
            <span>Python Vision</span>
            <span>•</span>
            <span>Flutter</span>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Scene */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full relative">
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  );
}
