import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import ScrambleText from "./ScrambleText";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Journal", href: "#journal" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-lg tracking-tighter uppercase">
            <ScrambleText text="UWIO" className="font-bold" staggerMs={55} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest text-muted-foreground"
              >
                <ScrambleText text={link.name} />
              </a>
            ))}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("uwio-theme-toggle"));
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("uwio-theme-toggle"));
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-foreground">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between border-b border-border">
              <Link href="/" className="text-lg tracking-tighter uppercase" onClick={() => setMobileMenuOpen(false)}>
                <ScrambleText text="UWIO" className="font-bold" staggerMs={55} />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-foreground">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-bold uppercase tracking-tighter"
                >
                  <ScrambleText text={link.name} staggerMs={40} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
