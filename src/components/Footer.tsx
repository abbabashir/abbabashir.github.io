import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="size-4 rounded-sm bg-gradient-to-br from-brand-primary to-brand-secondary" />
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Bashir Aliyu © {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-8">
          <a href="https://github.com/abbabashir" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] font-semibold tracking-widest uppercase text-muted-foreground transition-colors hover:text-brand-primary">
            GitHub
          </a>
          <a href="https://linkedin.com/in/abbabashir" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] font-semibold tracking-widest uppercase text-muted-foreground transition-colors hover:text-brand-primary">
            LinkedIn
          </a>
          <a href="#contact" className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground transition-colors hover:text-brand-primary">
            Contact
          </a>
          <a
            href="#top"
            className="group inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface/60 transition-all hover:border-brand-primary/50 hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <ArrowUp className="size-4 text-muted-foreground group-hover:text-brand-primary transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
