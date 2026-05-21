import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Developers mentored" },
  { value: "20+", label: "Workshops & talks" },
  { value: "4", label: "Community leadership roles" },
  { value: "12", label: "Cybersecurity training cohorts" },
];

const highlights = [
  {
    title: "GDSC Lead → Co-Lead",
    body: "Built a campus chapter from scratch into a 200-member developer community running consistent technical programming.",
  },
  {
    title: "GDG Co-Organizer",
    body: "Curate developer events that connect students, professionals, and Google technologies across the local ecosystem.",
  },
  {
    title: "Cybersecurity Trainer",
    body: "Teach hands-on secure development, threat modelling, and defensive cloud configuration to early-career engineers.",
  },
];

export function Community() {
  return (
    <section className="relative py-32 px-6 bg-surface/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-4">
            06 / Impact
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground">
            Community, mentorship, and developer growth.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden mb-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-background p-6"
            >
              <div className="font-display text-3xl font-semibold text-foreground">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="glass-panel rounded-2xl border border-border p-6 hover:border-brand-primary/40 transition-colors"
            >
              <h3 className="font-display text-lg font-medium text-foreground">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
