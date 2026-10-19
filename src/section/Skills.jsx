import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';
import Skills3DCanvas from '../components/Skills3DCanvas';
import { skillsData } from '../constants/skills';
import { Code2, Server, Brain, Smartphone, Database, Terminal } from 'lucide-react';

const CATEGORY_ICONS = {
  'Frontend Engineering': Code2,
  'Backend & Systems': Server,
  'AI & Machine Learning': Brain,
  'Mobile Development': Smartphone,
  'Databases & Storage': Database,
  'DevOps & Infrastructure': Terminal
};

export default function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Engineered Capabilities"
        title="Technical Arsenal"
        subtitle="Transparent proficiency levels backed by real-world production codebases, enterprise architecture, and applied AI research."
      />

      {/* 3D Interactive Tech Constellation Showcase */}
      <div className="mb-14">
        <Skills3DCanvas />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {skillsData.map((category, index) => {
          const IconComp = CATEGORY_ICONS[category.category] || Code2;
          return (
            <button
              key={category.category}
              onClick={() => setActiveCategoryIndex(index)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-full transition-all cursor-pointer ${
                activeCategoryIndex === index
                  ? 'bg-white text-zinc-950 font-semibold shadow-md'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{category.category.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Categories - Active highlighted and visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((cat, idx) => (
          <div
            key={cat.category}
            className={`transition-all duration-300 ${
              idx === activeCategoryIndex
                ? 'ring-2 ring-blue-500/50 rounded-3xl scale-[1.01]'
                : 'opacity-90 hover:opacity-100'
            }`}
          >
            <SkillCard
              category={cat.category}
              description={cat.description}
              skills={cat.skills}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
