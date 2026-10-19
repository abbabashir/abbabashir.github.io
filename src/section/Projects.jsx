import React, { useState } from 'react';
import { projectsData } from '../constants/projects';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';

const CATEGORIES = ['All', 'Fintech', 'AI/ML', 'Full-Stack', 'Mobile'];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Fintech') return project.category.includes('Fintech') || project.category.includes('Trade') || project.category.includes('Commerce');
    if (selectedFilter === 'AI/ML') return project.category.includes('AI') || project.category.includes('Vision') || project.category.includes('Machine Learning');
    if (selectedFilter === 'Full-Stack') return project.category.includes('Retail') || project.category.includes('Web') || project.category.includes('Platform') || project.category.includes('Trade') || project.category.includes('Commerce');
    if (selectedFilter === 'Mobile') return project.technologies.includes('Flutter') || project.technologies.includes('Android');
    return true;
  });

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Curated Engineering Portfolio"
        title="Selected Work"
        subtitle="A collection of production platforms, distributed systems, and intelligent machine learning architectures I've designed and shipped."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
              selectedFilter === cat
                ? 'bg-white text-zinc-950 font-semibold shadow-md'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={(p) => setActiveProjectModal(p)}
          />
        ))}
      </div>

      {/* Case Study Deep Dive Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
}
