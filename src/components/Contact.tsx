import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-60 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary mb-4">
          07 / Initiate Handshake
        </div>
        <h2 className="font-display text-5xl font-semibold tracking-tight text-foreground">
          Let's build the future.
        </h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          I'm always open to collaborating on innovative projects, scalable systems, and
          impact-driven technology solutions.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-12 glass-panel border border-border rounded-2xl p-6 text-left space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about the system you're building…"
              className="mt-2 w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-primary"
            />
          </div>
          <button
            type="submit"
            className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-foreground px-6 font-display text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-95"
          >
            {sent ? (
              <>
                <Check className="size-4" /> Message dispatched
              </>
            ) : (
              <>
                Send transmission
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
        </motion.form>

        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
          {[
            { label: "abbacodes@gmail.com", href: "mailto:abbacodes@gmail.com" },
            { label: "GitHub", href: "https://github.com/abbabashir" },
            { label: "LinkedIn", href: "https://linkedin.com/in/abbabashir" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-brand-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-primary"
      />
    </div>
  );
}
