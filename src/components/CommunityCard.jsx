import React from 'react';
import { Users, Award, Calendar } from 'lucide-react';

export default function CommunityCard({ community }) {
  return (
    <div
      className={`group rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5 ${
        community.colSpan || 'col-span-12'
      }`}
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono font-medium text-blue-300">
            <Award className="w-3 h-3 text-blue-400" />
            {community.badge}
          </span>
          <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {community.period}
          </span>
        </div>

        {/* Title & Organization */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
          {community.title}
        </h3>
        <p className="text-xs font-mono text-zinc-400 mb-4">
          {community.role} • {community.organization}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
          {community.description}
        </p>
      </div>

      {/* Impact Metric & Footer */}
      <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span>{community.impact}</span>
        </div>

        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
          {community.category}
        </span>
      </div>
    </div>
  );
}
