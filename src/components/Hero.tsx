import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Terminal } from "lucide-react";

const stats = [
  { label: "Years Engineering", value: "6+" },
  { label: "Systems Shipped", value: "40+" },
  { label: "Technologies", value: "30+" },
  { label: "Communities Led", value: "4" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yOrbits = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 mesh-bg"
    >
      {/* Orbits */}
      <motion.div
        style={{ y: yOrbits }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/10 animate-orbit-slow" />
        <div className="absolute left-1/2 top-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-secondary/15 animate-orbit-med" />
        <div className="absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/10 animate-orbit-fast" />
        {/* Floating dot on outer orbit */}
        <div className="absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 animate-orbit-slow">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-brand-primary shadow-[0_0_20px_var(--brand-primary)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 animate-orbit-med">
          <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-brand-secondary shadow-[0_0_16px_var(--brand-secondary)]" />
        </div>
        {/* Center core */}
        <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-primary/30 via-brand-secondary/20 to-transparent blur-3xl" />
      </motion.div>

      <motion.div style={{ y: yContent, opacity }} className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[10px] font-medium tracking-widest text-brand-primary uppercase backdrop-blur"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-brand-primary" />
          Full Stack • DevOps • Cloud & Security
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="mx-auto max-w-[22ch] font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance text-foreground sm:text-7xl"
        >
          Full-stack engineering, <span className="text-gradient">shipped end-to-end</span>.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-background/70 px-3 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur"
        >
          <span className="text-brand-primary">$</span>
          <span>bashir</span>
          <span className="text-muted-foreground/60">deploy</span>
          <span className="text-brand-tertiary">--stack=fullstack</span>
          <span className="text-brand-secondary">--ops=prod</span>
          <span className="ml-1 inline-block size-1.5 animate-pulse rounded-sm bg-brand-primary" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mx-auto mt-8 max-w-[54ch] text-pretty text-muted-foreground"
        >
          I'm <span className="text-foreground font-medium">Bashir Aliyu</span> — a Full Stack & DevOps engineer building
          production-grade web platforms, CI/CD pipelines, and secure cloud infrastructure that ships reliably to real users.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-6 font-display text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
          >
            View Projects
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 font-display text-sm font-semibold text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
          >
            <Terminal className="size-4" />
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative z-10 mt-20 grid w-full max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-5 backdrop-blur-sm transition-colors hover:border-brand-primary/40"
          >
            <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {s.label}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              {s.value}
            </p>
            <span className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-primary/10 to-transparent pointer-events-none" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
