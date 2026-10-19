import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  icon = true,
  className = '',
  external = false,
  type = 'button'
}) {
  const baseClasses =
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer active:scale-95 select-none';

  const variants = {
    primary:
      'bg-white text-zinc-950 hover:bg-zinc-200 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 shadow-lg shadow-white/5 hover:shadow-blue-500/20',
    secondary:
      'bg-zinc-900/60 text-white border border-white/10 hover:border-white/30 hover:bg-zinc-800/80 backdrop-blur-md',
    ghost:
      'text-zinc-400 hover:text-white hover:bg-white/5'
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`group ${baseClasses} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group ${baseClasses} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
}
