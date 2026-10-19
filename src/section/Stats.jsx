import React, { useEffect, useState, useRef } from 'react';
import { Rocket, Cpu } from 'lucide-react';

function CounterItem({ endValue, suffix = '', label, sublabel, icon: IconComponent }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 1600;
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = endValue / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, endValue]);

  return (
    <div
      ref={elementRef}
      className="group relative rounded-3xl glass-panel p-8 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full filter blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
          Verified Track Record
        </span>
      </div>

      <div>
        <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-2 font-mono">
          {count}
          <span className="text-blue-500">{suffix}</span>
        </div>
        <div className="text-lg sm:text-xl font-bold text-zinc-200">
          {label}
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          {sublabel}
        </p>
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <CounterItem
          endValue={8}
          suffix="+"
          label="Years Experience"
          sublabel="Hands-on software development, Java systems, and modern AI/ML workflows."
          icon={Cpu}
        />
        <CounterItem
          endValue={50}
          suffix="+"
          label="Projects Completed"
          sublabel="Production web services, fintech platforms, mobile apps, and machine learning models."
          icon={Rocket}
        />
      </div>
    </section>
  );
}
