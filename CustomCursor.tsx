import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrambleText from "./ScrambleText";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you. I'll be in touch shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-light tracking-widest text-muted-foreground">04</span>
          <h2 className="text-sm font-bold uppercase tracking-widest">
            <ScrambleText text="Contact" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-8">
                <ScrambleText text="Let's Work" staggerMs={40} as="span" />
                <br />
                <ScrambleText text="Together." staggerMs={40} as="span" />
              </h2>
              <a
                href="mailto:hello@example.com"
                className="inline-block text-xl md:text-2xl border-b-2 border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
              >
                hello@example.com
              </a>
            </div>

            <div className="mt-20 flex gap-8 text-sm uppercase tracking-widest font-medium">
              <a href="#" className="hover:text-muted-foreground transition-colors">
                <ScrambleText text="Twitter" />
              </a>
              <a href="#" className="hover:text-muted-foreground transition-colors">
                <ScrambleText text="Instagram" />
              </a>
              <a href="#" className="hover:text-muted-foreground transition-colors">
                <ScrambleText text="LinkedIn" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="bg-transparent border-b border-border py-4 focus:outline-none focus:border-foreground transition-colors text-lg"
                  placeholder="Your name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="bg-transparent border-b border-border py-4 focus:outline-none focus:border-foreground transition-colors text-lg"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="bg-transparent border-b border-border py-4 focus:outline-none focus:border-foreground transition-colors text-lg resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start flex items-center gap-4 py-4 px-8 bg-foreground text-background font-bold uppercase tracking-widest hover:bg-muted-foreground transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-32 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
        <span>© {new Date().getFullYear()} UWIO. All rights reserved.</span>
        <span>Based in Amsterdam</span>
      </div>
    </section>
  );
}
