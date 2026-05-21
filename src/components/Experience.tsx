import { motion } from "framer-motion";

const items = [
  {
    year: "Now",
    role: "Senior Full Stack & Cloud Engineer",
    org: "Industry • Emerging-market software",
    body: "Designing AI-augmented platforms with secure cloud infrastructure and resilient delivery pipelines.",
  },
  {
    year: "2024",
    role: "GDG Co-Organizer",
    org: "Google Developer Group",
    body: "Curating talks, workshops, and developer programs that grow the regional engineering ecosystem.",
  },
  {
    year: "2023",
    role: "DevOps / Infrastructure Lead",
    org: "Product engineering",
    body: "Productionised Kubernetes platforms, established CI/CD standards, and instrumented observability stacks.",
  },
  {
    year: "2022",
    role: "GDSC Lead → Co-Lead",
    org: "Google Developer Student Clubs",
    body: "Led campus developer community: ran hackathons, mentorship circles, and a cybersecurity training track.",
  },
  {
    year: "2021",
    role: "Full Stack Engineer",
    org: "Early-career engineering roles",
    body: "Shipped customer-facing web apps, internal tools, and integrations across multiple production stacks.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 bg-surface/30">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-4">
            04 / Trajectory
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground">
            Experience & leadership.
          </h2>
        </div>

        <ol className="relative border-l border-border pl-8">
          {items.map((it, i) => (
            <motion.li
              key={it.role}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="relative pb-14 last:pb-0"
            >
              <span className="absolute -left-[37px] top-1.5 grid size-4 place-items-center">
                <span className="absolute inset-0 rounded-full bg-brand-primary/20 animate-ping" />
                <span className="relative size-2.5 rounded-full bg-brand-primary shadow-[0_0_16px_var(--brand-primary)]" />
              </span>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-primary mb-2">
                {it.year}
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {it.role}
              </h3>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                {it.org}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {it.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
