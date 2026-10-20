import React from 'react';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function TimelineItem({ item, isLast }) {
  const isWork = item.type === 'WORK';

  return (
    <div className="relative pl-8 sm:pl-10 pb-12 last:pb-2 group">
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-[15px] sm:left-[19px] top-6 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/40 via-zinc-800 to-transparent group-hover:from-blue-500 transition-colors" />
      )}

      {/* Node Dot / Icon */}
      <div
        className={`absolute left-0 top-1 w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isWork
            ? 'bg-blue-950/80 border-blue-500/50 text-blue-400 group-hover:scale-110 shadow-lg shadow-blue-500/10'
            : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 group-hover:scale-110 shadow-lg shadow-emerald-500/10'
        }`}
      >
        {isWork ? (
          <Briefcase className="w-4 h-4" />
        ) : (
          <GraduationCap className="w-4 h-4" />
        )}
      </div>

      {/* Card Content */}
      <div className="rounded-2xl glass-panel p-5 sm:p-7 hover:border-white/20 transition-all">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                isWork
                  ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
              }`}
            >
              {item.type}
            </span>
            {item.current && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 flex items-center gap-1">
                Current Role
              </span>
            )}
          </div>

          <span className="text-xs font-mono text-zinc-400 font-medium">
            {item.period}
          </span>
        </div>

        {/* Role & Company / Degree & Institution */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
          {item.role || item.degree}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium mb-3">
          {item.company || item.institution} • {item.location}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Key Highlights list if present */}
        {item.highlights && (
          <div className="space-y-1.5 mb-4">
            {item.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {/* Honors if present */}
        {item.honors && (
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-zinc-300 font-mono mb-4">
            💡 {item.honors}
          </div>
        )}

        {/* Technologies used */}
        {item.technologies && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.04]">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.03] border border-white/5 text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
