import { motion } from "framer-motion";

const groups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "REST & GraphQL APIs", "Postgres"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
  },
  {
    label: "Security",
    items: ["Zero-Trust", "AuthN/AuthZ", "Cloud Security", "DevSecOps"],
  },
  {
    label: "AI Systems",
    items: ["LLM Integrations", "RAG", "Vector DBs", "Intelligent Automations"],
  },
];

// floating orbital ring of tech labels
const orbital = [
  "React", "Kubernetes", "AWS", "Docker", "Terraform",
  "Node.js", "Postgres", "TypeScript", "LLMs", "Linux",
];

export function TechStack() {
  return (
    <section id="stack" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-[1.1fr_1fr] items-center">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-4">
            05 / Tooling
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground">
            The technologies I deploy daily.
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            A working stack tuned for performance, security, and engineering velocity —
            chosen for fit, not fashion.
          </p>

          <div className="mt-10 space-y-6">
            {groups.map((g, i) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-t border-border pt-4"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-primary mb-3">
                  {g.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-brand-primary/50 hover:text-brand-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Orbital visualization */}
        <div className="relative aspect-square w-full max-w-[560px] mx-auto">
          <div className="absolute inset-[8%] rounded-full border border-border" />
          <div className="absolute inset-[20%] rounded-full border border-border" />
          <div className="absolute inset-[36%] rounded-full border border-border" />
          {/* center core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid size-24 place-items-center rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-secondary/20 backdrop-blur-md border border-border">
            <span className="font-display font-semibold text-foreground">Core</span>
            <span className="absolute inset-0 rounded-full blur-2xl bg-brand-primary/30" />
          </div>
          {/* outer orbit labels */}
          <div className="absolute inset-0 animate-orbit-slow">
            {orbital.map((t, i) => {
              const angle = (i / orbital.length) * Math.PI * 2;
              const x = 50 + 46 * Math.cos(angle);
              const y = 50 + 46 * Math.sin(angle);
              return (
                <span
                  key={t}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-surface/80 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </span>
              );
            })}
          </div>
          {/* inner counter-rotating dots */}
          <div className="absolute inset-[20%] animate-orbit-fast">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-brand-secondary shadow-[0_0_14px_var(--brand-secondary)]" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 size-2 rounded-full bg-brand-primary shadow-[0_0_14px_var(--brand-primary)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
