import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) {
  const alignment = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start'
  };

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 max-w-3xl ${alignment[align]} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <span className="text-[11px] font-mono font-medium tracking-widest text-zinc-400 uppercase">
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
