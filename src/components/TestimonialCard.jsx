import React from 'react';
import { Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="group relative rounded-3xl glass-panel p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">
      <div>
        {/* Animated Quote Mark */}
        <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 text-zinc-500 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300">
          <Quote className="w-5 h-5 fill-current opacity-80" />
        </div>

        {/* Quote Content */}
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic mb-8 font-serif">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-white/[0.04]">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border border-white/10"
        />
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
            {testimonial.name}
          </h4>
          <p className="text-xs text-zinc-400">
            {testimonial.role}
          </p>
          <p className="text-[10px] font-mono text-zinc-500">
            {testimonial.organization}
          </p>
        </div>
      </div>
    </div>
  );
}
