import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import TimelineItem from '../components/TimelineItem';
import { experienceData } from '../constants/experience';
import { educationData } from '../constants/education';
import { Briefcase, GraduationCap, Sparkles } from 'lucide-react';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('ALL');

  // Combine and sort chronologically
  const combinedTimeline = [
    experienceData[0], // 2023 - Present
    educationData[2],  // 2022 - Present (GDG Minna)
    experienceData[1], // 2021 - 2023 (Paritie Hub)
    educationData[1],  // 2021 - 2023 (GDSC Lead)
    educationData[0],  // 2018 - 2023 (IBBU Computer Science)
    experienceData[2], // 2018 - 2021 (Java Desktop Systems)
  ].filter(Boolean);

  const displayedItems = combinedTimeline.filter((item) => {
    if (!item) return false;
    if (activeTab === 'WORK') return item.type === 'WORK';
    if (activeTab === 'EDUCATION') return item.type === 'EDUCATION' || item.type?.includes('LEADERSHIP');
    return true;
  });

  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SectionHeading
        badge="Career & Academic Evolution"
        title="Experience & Journey"
        subtitle="A timeline spanning rigorous academic training in Computer Science, community leadership, and production software engineering."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-full transition-all cursor-pointer ${
            activeTab === 'ALL'
              ? 'bg-white text-zinc-950 font-semibold shadow-md'
              : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Milestones</span>
        </button>

        <button
          onClick={() => setActiveTab('WORK')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-full transition-all cursor-pointer ${
            activeTab === 'WORK'
              ? 'bg-blue-600 text-white font-semibold shadow-md'
              : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work ({experienceData.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('EDUCATION')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-full transition-all cursor-pointer ${
            activeTab === 'EDUCATION'
              ? 'bg-emerald-600 text-white font-semibold shadow-md'
              : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education &amp; Leadership ({educationData.length})</span>
        </button>
      </div>

      {/* Timeline Stream */}
      <div className="relative pt-4">
        {displayedItems.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === displayedItems.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
