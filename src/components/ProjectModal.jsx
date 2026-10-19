import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Title */}
        <div className="mb-4 pr-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-blue-400 uppercase">
            {project.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 mt-1 italic">
            "{project.tagline}"
          </p>
        </div>

        {/* Project Image */}
        <div className="rounded-2xl overflow-hidden border border-white/10 mb-6 bg-zinc-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 sm:h-72 object-cover"
          />
        </div>

        {/* Stats Pill */}
        {project.stats && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{project.stats}</span>
          </div>
        )}

        {/* Deep Dive Description */}
        <div className="space-y-4 mb-8">
          <h4 className="text-sm font-semibold tracking-wider text-zinc-200 uppercase font-mono">
            Architectural Overview
          </h4>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technology Stack Grid */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold tracking-wider text-zinc-200 uppercase font-mono mb-3">
            Core Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-zinc-900 border border-white/10 text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repository Source</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
