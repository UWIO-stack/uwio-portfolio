import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import ScrambleText from "@/components/ScrambleText";
import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();

  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-20">
        {/* Full-bleed image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-[16/7] overflow-hidden"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Title block */}
        <div className="container mx-auto px-6 py-16 border-b border-border">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                data-testid="back-button"
              >
                <ArrowLeft size={14} />
                Work
              </button>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[10vw] leading-[0.85] font-black tracking-tighter uppercase"
            >
              {project.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl">
              {project.tagline}
            </motion.p>

            {/* Meta row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border"
            >
              {[
                { label: "Client", value: project.client },
                { label: "Category", value: project.category },
                { label: "Role", value: project.role },
                { label: "Year", value: project.year },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case study body */}
      <section className="container mx-auto px-6 py-24">

        {/* Challenge + Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Challenge</p>
            <p className="text-lg font-light leading-relaxed">{project.challenge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Approach</p>
            <p className="text-lg font-light leading-relaxed">{project.approach}</p>
          </motion.div>
        </div>

        {/* Full-width image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="w-full overflow-hidden mb-8"
        >
          <img
            src={project.images[0]}
            alt={`${project.title} detail`}
            className="w-full object-cover max-h-[70vh]"
          />
        </motion.div>

        {/* Two-column image row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {project.images.slice(1, 3).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="overflow-hidden"
            >
              <img
                src={img}
                alt={`${project.title} detail ${i + 2}`}
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </motion.div>
          ))}
        </div>

        {/* Last image full-width */}
        {project.images[3] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="w-full overflow-hidden mb-24"
          >
            <img
              src={project.images[3]}
              alt={`${project.title} detail 4`}
              className="w-full object-cover max-h-[60vh]"
            />
          </motion.div>
        )}

        {/* Outcome */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-24"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Outcome</p>
          <p className="text-2xl md:text-3xl font-light leading-relaxed">{project.outcome}</p>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 pb-24 border-b border-border"
        >
          {project.services.map((s) => (
            <span key={s} className="text-xs py-1 px-3 border border-border rounded-full uppercase tracking-widest">
              {s}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Next / Prev navigation */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {prev ? (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate(`/work/${prev.slug}`)}
              className="group flex flex-col gap-2 text-left"
              data-testid="prev-project"
            >
              <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <ArrowLeft size={12} />
                Previous
              </span>
              <span className="text-2xl md:text-4xl font-bold tracking-tighter uppercase group-hover:text-muted-foreground transition-colors">
                <ScrambleText text={prev.title} staggerMs={35} />
              </span>
            </motion.button>
          ) : <div />}

          {next ? (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate(`/work/${next.slug}`)}
              className="group flex flex-col gap-2 text-right ml-auto"
              data-testid="next-project"
            >
              <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                Next
                <ArrowRight size={12} />
              </span>
              <span className="text-2xl md:text-4xl font-bold tracking-tighter uppercase group-hover:text-muted-foreground transition-colors">
                <ScrambleText text={next.title} staggerMs={35} />
              </span>
            </motion.button>
          ) : <div />}
        </div>
      </section>
    </div>
  );
}
