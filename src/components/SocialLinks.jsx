import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import { socialLinks } from '../constants/socialLinks';

const ICON_MAP = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Mail: Mail
};

export default function SocialLinks({ className = '', showLabel = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => {
        const IconComponent = ICON_MAP[link.icon] || Mail;

        return (
          <a
            key={link.name}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={link.name}
            className="group flex items-center gap-2 p-2.5 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 hover:border-blue-500/40 transition-all duration-200 cursor-pointer"
          >
            <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {showLabel && (
              <span className="text-xs font-mono text-zinc-300 pr-1">
                {link.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
