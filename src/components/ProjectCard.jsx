import React from 'react';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project, onOpenDetails }) {
  return (
    <div
      className={`group relative rounded-3xl overflow-hidden glass-panel flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 ${project.colSpan || 'col-span-12'}`}
    >
      {/* Subtle Top Ambient Gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-500/[0.06] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Content Top */}
      <div className="p-6 sm:p-8 flex flex-col">
        {/* Category & Featured Pill */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-blue-400 uppercase">
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-300">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/[0.03] border border-white/5 text-zinc-400 group-hover:border-white/10 group-hover:text-zinc-300 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 text-[10px] font-mono text-zinc-500 self-center">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Visual Media Showcase with Zoom effect */}
      <div
        onClick={() => onOpenDetails(project)}
        className="relative mx-6 mb-6 sm:mx-8 sm:mb-8 rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 aspect-[16/10] cursor-pointer group/media"
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/media:scale-105"
        />

        {/* Overlay Hover Reveal */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-zinc-950 text-xs font-semibold shadow-xl">
            View Architecture &amp; Case Study
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Live metric badge if available */}
        {project.stats && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
            {project.stats}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 flex items-center justify-between border-t border-white/[0.04]">
        <button
          onClick={() => onOpenDetails(project)}
          className="text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group/btn cursor-pointer"
        >
          <span>Deep Dive Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="p-2 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Live URL`}
              className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border border-blue-500/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
