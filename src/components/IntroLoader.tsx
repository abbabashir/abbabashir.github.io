import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative size-16">
              <span className="absolute inset-0 rounded-full border border-brand-primary/30" />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-2 border-brand-primary"
              />
              <span className="absolute inset-3 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-md" />
            </div>
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.2 }}
              className="font-mono text-[10px] uppercase text-muted-foreground"
            >
              Initializing systems
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
