import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";

const articles = [
  {
    id: 1,
    title: "Typography as Interface: Beyond Decoration",
    date: "OCT 12, 2023",
    readTime: "5 MIN READ",
  },
  {
    id: 2,
    title: "The Case for Structural Brutalism in Web Design",
    date: "SEP 04, 2023",
    readTime: "8 MIN READ",
  },
  {
    id: 3,
    title: "Removing the Non-Essential: A Guide to Reduction",
    date: "AUG 18, 2023",
    readTime: "4 MIN READ",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-24"
        >
          <span className="text-xs font-light tracking-widest text-muted-foreground">03</span>
          <h2 className="text-sm font-bold uppercase tracking-widest">
            <ScrambleText text="Journal" />
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {articles.map((article, i) => (
            <motion.a
              href="#"
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group py-8 border-b border-border last:border-0 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:ml-4 transition-all duration-300">
                {article.title}
              </h3>
              <div className="flex items-center gap-6 text-xs font-medium uppercase tracking-widest text-muted-foreground shrink-0">
                <span>{article.date}</span>
                <span className="hidden md:inline-block w-1 h-1 bg-border rounded-full" />
                <span>{article.readTime}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
