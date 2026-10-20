import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { softSkillsData } from '../constants/softSkills';
import { Sparkles, MessageSquare, Lightbulb, Cpu, Search } from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  MessageSquare: MessageSquare,
  Lightbulb: Lightbulb,
  Cpu: Cpu,
  Search: Search
};

export default function SoftSkills() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Engineering Philosophy"
        title="Beyond the Code"
        subtitle="Great software is built on technical discipline, clear communication, and empathetic product thinking."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {softSkillsData.map((item, index) => {
          const IconComp = ICON_MAP[item.icon] || Sparkles;
          const isLarge = index === 3 || index === 4;

          return (
            <div
              key={item.id}
              className={`group rounded-3xl glass-panel p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5 ${
                isLarge ? 'sm:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/5">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-500">
                  Core Engineering Value
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
