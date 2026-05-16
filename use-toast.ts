import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "./ScrambleText";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-32 border-t border-border">
      <div className="container mx-auto px-6" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-light tracking-widest text-muted-foreground">01</span>
          <h2 className="text-sm font-bold uppercase tracking-widest">
            <ScrambleText text="About" />
          </h2>
        </motion.div>

        <div className="overflow-hidden mb-16">
          <motion.p
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-3xl md:text-5xl font-light leading-snug tracking-tight max-w-4xl"
          >
            I design digital experiences that rely on strong typographic foundations and structural clarity — stripping away the decorative to reveal the essential.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground font-light"
        >
          <span>
            Art Direction · Brand Identity · Digital Product Design · Design Systems · Motion
          </span>
          <span className="shrink-0">2015 — Present</span>
        </motion.div>

      </div>
    </section>
  );
}
