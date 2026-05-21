import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import apexCollabImg from "@/assets/project-apex-collab.jpg";
import sentinelNexusImg from "@/assets/project-sentinel-nexus.jpg";
import secureFlowImg from "@/assets/project-secure-flow.jpg";
import aetherOpsImg from "@/assets/project-aetherops-ai.jpg";
import autonomousOpsImg from "@/assets/project-autonomous-ops.jpg";
import cloudweaveImg from "@/assets/project-cloudweave.jpg";

const projects = [
  {
    tag: "Realtime Collab",
    title: "Apex Collab",
    body: "AI-powered SaaS collaboration platform for teams — blending Linear, Notion, and Slack into one premium, production-ready workspace.",
    stack: ["TypeScript", "React", "TanStack", "Postgres"],
    accent: "text-brand-primary",
    image: apexCollabImg,
    href: "https://appex-coll.lovable.app",
  },
  {
    tag: "Security",
    title: "Sentinel Nexus",
    body: "Production-grade Security Operations Center dashboard for threat intelligence, log correlation, and real-time incident response.",
    stack: ["TypeScript", "React", "Realtime", "Postgres"],
    accent: "text-brand-secondary",
    image: sentinelNexusImg,
    href: "https://sent-soc.lovable.app",
  },
  {
    tag: "Fintech",
    title: "Secure Flow",
    body: "Enterprise-grade secure fintech API platform for payments, wallets, transfers and merchant services with deep auditability.",
    stack: ["TypeScript", "Node", "Postgres", "Stripe"],
    accent: "text-muted-foreground",
    image: secureFlowImg,
    href: "https://secure-fl.lovable.app",
  },
  {
    tag: "AI Platform",
    title: "AetherOps AI",
    body: "AI DevOps & infrastructure assistant — uniting observability, automation, and incident response into one intelligent control plane.",
    stack: ["TypeScript", "React", "AI", "Realtime"],
    accent: "text-brand-primary",
    image: aetherOpsImg,
    href: "https://aether-op.lovable.app",
  },
  {
    tag: "Automation",
    title: "Autonomous Operations Core",
    body: "Multi-agent AI operating system where intelligent agents reason, communicate, and execute tasks across workflows and infrastructure.",
    stack: ["TypeScript", "AI Agents", "Realtime", "Postgres"],
    accent: "text-brand-secondary",
    image: autonomousOpsImg,
    href: "https://autonomous-opr.lovable.app",
  },
  {
    tag: "Cloud Platform",
    title: "Cloudweave Console",
    body: "Infrastructure-as-Code platform for provisioning, managing, and scaling cloud environments through code-driven workflows.",
    stack: ["TypeScript", "IaC", "GraphQL", "Cloud"],
    accent: "text-brand-primary",
    image: cloudweaveImg,
    href: "https://cloud-wv.lovable.app",
  },
];

function ProjectArt({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-background outline outline-1 -outline-offset-1 outline-border">
      <img
        src={image}
        alt={`${title} preview`}
        loading="lazy"
        width={1280}
        height={800}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </span>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-4">
            03 / Active Deployments
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground">
            Selected systems shipped to production.
          </h2>
        </div>
        <p className="max-w-sm text-pretty text-muted-foreground">
          Case studies across security, AI orchestration, and large-scale cloud infrastructure.
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto px-6 lg:px-[max(24px,calc((100vw-1280px)/2))] pb-12 scrollbar-hide snap-x snap-mandatory">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="group min-w-[300px] max-w-[480px] sm:min-w-[460px] shrink-0 snap-start"
          >
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${p.accent}`}
              aria-label={`Open ${p.title} in a new tab`}
            >
              <ProjectArt image={p.image} title={p.title} />
            </a>
            <div className="mt-6">
              <p className={`text-[10px] font-semibold tracking-wider uppercase ${p.accent}`}>
                {p.tag}
              </p>
              <h4 className="mt-2 font-display text-2xl font-medium text-foreground">
                {p.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface/60 px-3 text-xs font-medium text-foreground transition-colors hover:border-brand-primary/50"
                >
                  <ArrowUpRight className="size-3.5" /> Live
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
