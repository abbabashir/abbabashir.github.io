import React from 'react';
import SectionHeading from '../components/SectionHeading';
import {
  Code2,
  Cpu,
  Layers,
  Terminal,
  Database,
  Server,
  Smartphone,
  Container,
  GitBranch,
  Box
} from 'lucide-react';

const COLUMN_1 = [
  { name: 'React', category: 'Frontend', icon: Code2 },
  { name: 'Python', category: 'AI/ML & Vision', icon: Cpu },
  { name: 'Spring Boot', category: 'Backend Systems', icon: Server },
  { name: 'PostgreSQL', category: 'Relational DB', icon: Database },
  { name: 'Docker', category: 'DevOps', icon: Container },
  { name: 'Three.js', category: '3D Graphics', icon: Box },
];

const COLUMN_2 = [
  { name: 'Java', category: 'Enterprise Core', icon: Terminal },
  { name: 'TypeScript', category: 'Languages', icon: Code2 },
  { name: 'Flutter', category: 'Mobile Apps', icon: Smartphone },
  { name: 'Node.js', category: 'Runtime', icon: Server },
  { name: 'Kubernetes', category: 'Orchestration', icon: Layers },
  { name: 'MySQL', category: 'Database', icon: Database },
];

const COLUMN_3 = [
  { name: 'JavaScript', category: 'Modern Web', icon: Code2 },
  { name: 'Linux', category: 'System Architecture', icon: Terminal },
  { name: 'MongoDB', category: 'Document Store', icon: Database },
  { name: 'Git', category: 'Version Control', icon: GitBranch },
  { name: 'TensorFlow', category: 'Deep Learning', icon: Cpu },
  { name: 'Tailwind CSS', category: 'Styling', icon: Layers },
];

function LogoColumn({ items, speed = 'animate-marquee-up' }) {
  // Duplicate items for continuous seamless loop
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="flex-1 overflow-hidden h-[420px] relative mask-edge-fade">
      <div className={`flex flex-col gap-4 ${speed}`}>
        {duplicated.map((tech, index) => {
          const IconComp = tech.icon;
          return (
            <div
              key={`${tech.name}-${index}`}
              className="p-4 sm:p-5 rounded-2xl glass-panel flex items-center gap-3.5 transition-all duration-300 hover:border-blue-500/40 hover:bg-zinc-900/90 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                <IconComp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {tech.name}
                </div>
                <div className="text-[11px] font-mono text-zinc-500">
                  {tech.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Engineering Ecosystem"
        title="Technologies I Build With"
        subtitle="A versatile stack honed through production deployments, enterprise refactoring, and machine learning pipelines."
      />

      <div className="pause-hover relative max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <LogoColumn items={COLUMN_1} speed="animate-marquee-up" />
        <LogoColumn items={COLUMN_2} speed="animate-marquee-down" />
        <LogoColumn items={COLUMN_3} speed="animate-marquee-up" />
      </div>

      <div className="text-center mt-8">
        <span className="text-xs font-mono text-zinc-500">
          Hover over any column to pause inspection
        </span>
      </div>
    </section>
  );
}
