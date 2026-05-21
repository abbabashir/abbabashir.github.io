import { motion } from "framer-motion";
import {
  Code2,
  Cloud,
  ShieldCheck,
  Network,
  Brain,
  Users,
  Layers,
} from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Full Stack Web Development",
    body: "End-to-end product engineering: typed React/Next.js frontends, resilient APIs, and rich domain models.",
    accent: "primary" as const,
  },
  {
    icon: Layers,
    title: "Frontend & Backend Engineering",
    body: "Composable design systems, performant data layers, and clean architectures that scale with the team.",
    accent: "secondary" as const,
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud Deployment",
    body: "Reproducible infrastructure with Terraform, Docker, and Kubernetes — CI/CD that ships safely, every commit.",
    accent: "primary" as const,
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Secure Infrastructure",
    body: "Zero-trust networking, hardened auth flows, encrypted pipelines, and proactive vulnerability management.",
    accent: "secondary" as const,
  },
  {
    icon: Network,
    title: "API Development & System Architecture",
    body: "Well-shaped contracts, event-driven systems, and observability that turns incidents into learnings.",
    accent: "primary" as const,
  },
  {
    icon: Brain,
    title: "AI-Driven Applications",
    body: "LLM integrations, retrieval pipelines, and intelligent automations grounded in product reality.",
    accent: "secondary" as const,
  },
  {
    icon: Users,
    title: "Technical Leadership & Mentorship",
    body: "Coaching engineers, leading community programs, and shaping the next wave of African tech talent.",
    accent: "neutral" as const,
  },
];

const accentMap = {
  primary: "bg-brand-primary/10 text-brand-primary",
  secondary: "bg-brand-secondary/10 text-brand-secondary",
  neutral: "bg-foreground/10 text-foreground",
} as const;

const lineMap = {
  primary: "group-hover:bg-brand-primary/30",
  secondary: "group-hover:bg-brand-secondary/30",
  neutral: "group-hover:bg-foreground/30",
} as const;

export function Expertise() {
  return (
    <section id="expertise" className="relative py-32 px-6 bg-surface/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-4">
              02 / Core Directives
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground">
              Specializations across the modern engineering stack.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-muted-foreground">
            Seven disciplines I practice deeply — combined into systems that are fast,
            secure, and built to last.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="glass-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border p-7 transition-colors hover:border-border/80"
              >
                <div>
                  <div className={`mb-6 inline-flex size-11 items-center justify-center rounded-xl ${accentMap[it.accent]}`}>
                    <Icon className="size-5" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {it.body}
                  </p>
                </div>
                <div className={`mt-8 h-px w-full bg-border transition-colors ${lineMap[it.accent]}`} />
                <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-primary/[0.06] to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
