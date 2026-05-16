import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "wouter";
import ScrambleText from "./ScrambleText";
import { projects } from "@/data/projects";

function FloatingImage({ src, title }: { src: string; title: string }) {
  return (
    <div className="w-[420px] aspect-[4/3] overflow-hidden pointer-events-none shadow-2xl">
      <img src={src} alt={title} className="w-full h-full object-cover" />
    </div>
  );
}

export default function Work() {
  const [, navigate] = useLocation();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 32);
    mouseY.set(e.clientY - 80);
  };

  return (
    <section id="work" className="py-32 border-t border-border" ref={containerRef}>
      <div
        className="container mx-auto px-6"
        onMouseMove={handleMouseMove}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-light tracking-widest text-muted-foreground">02</span>
          <h2 className="text-sm font-bold uppercase tracking-widest">
            <ScrambleText text="Selected Work" />
          </h2>
        </motion.div>

        {/* Project list */}
        <div className="relative">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate(`/work/${project.slug}`)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex items-baseline justify-between gap-8 py-7 border-b border-border cursor-pointer"
            >
              {/* Index */}
              <span
                className="text-xs tabular-nums font-light shrink-0 transition-colors duration-300"
                style={{
                  color: hoveredId === project.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3
                className="flex-1 text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none transition-all duration-300"
                style={{
                  color: hoveredId !== null && hoveredId !== project.id
                    ? "hsl(var(--muted-foreground) / 0.3)"
                    : "hsl(var(--foreground))",
                  transform: hoveredId === project.id ? "translateX(12px)" : "translateX(0)",
                }}
              >
                {project.title}
              </h3>

              {/* Right meta */}
              <div className="hidden md:flex items-center gap-8 shrink-0">
                <span
                  className="text-xs uppercase tracking-widest transition-colors duration-300"
                  style={{
                    color: hoveredId === project.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {project.category}
                </span>
                <span
                  className="text-xs font-light tabular-nums transition-colors duration-300"
                  style={{
                    color: hoveredId === project.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {project.year}
                </span>
                <motion.span
                  className="text-xs uppercase tracking-widest overflow-hidden"
                  animate={{ width: hoveredId === project.id ? "auto" : 0, opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  View →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating cursor image — fixed so it escapes container clipping */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ x: springX, y: springY }}
        animate={{ opacity: hoveredId !== null ? 1 : 0, scale: hoveredId !== null ? 1 : 0.92 }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      >
        {hoveredId !== null && (
          <FloatingImage
            src={projects.find((p) => p.id === hoveredId)?.heroImage ?? ""}
            title={projects.find((p) => p.id === hoveredId)?.title ?? ""}
          />
        )}
      </motion.div>
    </section>
  );
}
