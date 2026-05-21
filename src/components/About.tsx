import { motion } from "framer-motion";

const paragraphs = [
  "I'm a Full Stack Developer with deep expertise in frontend engineering, backend architecture, DevOps, cloud infrastructure, and secure system deployment — building high-performance applications with reliability and real-world impact baked in.",
  "My work spans modern web technologies, API development, infrastructure automation, CI/CD pipelines, cloud deployments, and cybersecurity practices. I enjoy designing systems that are functional, scalable, secure, and maintainable from development to production.",
  "Currently I work at the intersection of software engineering, AI, and technical infrastructure, contributing to solutions that solve practical challenges across emerging markets — while mentoring aspiring tech professionals through cybersecurity training and developer community initiatives.",
  "I've held leadership roles in developer communities — serving as Lead and Co-Lead of Google Developer Student Clubs (GDSC), and currently contributing as a GDG Co-Organizer — supporting developer growth, collaboration, and innovation.",
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_1.4fr]">
        <div className="md:sticky md:top-32 self-start">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-4">
            01 / Origin
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground">
            A practitioner across the full stack — silicon to interface.
          </h2>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-brand-primary to-transparent" />
        </div>

        <div className="space-y-7">
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
