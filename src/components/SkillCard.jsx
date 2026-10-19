import React from 'react';

const LEVEL_COLOR = {
  Advanced: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Strong: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Proficient: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Working Knowledge': 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
};

export default function SkillCard({ category, description, skills }) {
  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/20">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          {category}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
          {description}
        </p>

        {/* Skill Rows */}
        <div className="space-y-3.5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between text-xs py-1 border-b border-white/[0.03] last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className={`font-medium ${skill.highlight ? 'text-zinc-100 font-semibold' : 'text-zinc-300'}`}>
                  {skill.name}
                </span>
                {skill.years && (
                  <span className="text-[10px] font-mono text-zinc-500">
                    ({skill.years})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Level Dot Indicators */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        dotIndex <= skill.rating
                          ? 'bg-blue-400'
                          : 'bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Level Label Badge */}
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    LEVEL_COLOR[skill.level] || 'text-zinc-400 bg-zinc-800'
                  }`}
                >
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
