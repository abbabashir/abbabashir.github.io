import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "glass-panel border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative grid size-7 place-items-center rounded-md bg-foreground text-background font-mono font-bold text-[11px]">
            BA
            <span className="absolute -inset-1 rounded-lg bg-brand-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
            bashir<span className="text-brand-primary">.</span>dev
          </span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="h-9 inline-flex items-center rounded-full bg-foreground px-4 font-display text-xs font-semibold text-background transition-transform hover:scale-[1.03] active:scale-95"
          >
            Initialize Project
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
