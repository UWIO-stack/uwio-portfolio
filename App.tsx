import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
const ORIGINAL = "UWIO";

const COLORS = [
  "#FF3B3B", "#FF8C00", "#FFD600", "#00E676",
  "#00B0FF", "#D500F9", "#FF4081", "#1DE9B6",
  "#AEEA00", "#FF6D00",
];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function ScrambleLetter({
  char,
  delay,
  isScrambling,
}: {
  char: string;
  delay: number;
  isScrambling: boolean;
}) {
  const [display, setDisplay] = useState(char);
  const [color, setColor] = useState<string>("inherit");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isScrambling_ref = useRef(isScrambling);
  useEffect(() => { isScrambling_ref.current = isScrambling; }, [isScrambling]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isScrambling) {
      timeoutRef.current = setTimeout(() => {
        let count = 0;
        intervalRef.current = setInterval(() => {
          setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
          setColor(randomColor());
          count++;
          if (count > 8) {
            if (isScrambling_ref.current) {
              // still hovering — reset and keep looping
              count = 0;
            } else {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
              setDisplay(char);
              setColor("inherit");
            }
          }
        }, 52);
      }, delay);
    } else {
      setDisplay(char);
      setColor("inherit");
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isScrambling, char, delay]);

  return (
    <span
      className="inline-block cursor-default select-none transition-colors duration-150"
      style={{ color }}
    >
      {display}
    </span>
  );
}

export default function Hero() {
  const [isScrambling, setIsScrambling] = useState(false);
  const scrambleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-fire on load once the entrance animation settles
  useEffect(() => {
    const trigger = setTimeout(() => {
      setIsScrambling(true);
      scrambleTimeout.current = setTimeout(() => setIsScrambling(false), 700);
    }, 900);
    return () => clearTimeout(trigger);
  }, []);

  const handleMouseEnter = () => {
    if (scrambleTimeout.current) clearTimeout(scrambleTimeout.current);
    setIsScrambling(true);
  };

  const handleMouseLeave = () => {
    if (scrambleTimeout.current) clearTimeout(scrambleTimeout.current);
    setIsScrambling(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2"
        >
          <div className="overflow-visible">
            <motion.h1
              variants={item}
              className="text-[18vw] leading-[0.85] font-black tracking-tighter uppercase m-0 p-0 flex gap-[0.02em]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              data-testid="hero-title"
            >
              {ORIGINAL.split("").map((char, i) => (
                <ScrambleLetter
                  key={i}
                  char={char}
                  delay={i * 72}
                  isScrambling={isScrambling}
                />
              ))}
            </motion.h1>
          </div>

          <div className="mt-12 overflow-hidden max-w-xl">
            <motion.p
              variants={item}
              className="text-xl md:text-2xl font-light tracking-tight text-foreground/80 leading-snug"
            >
              Independent Art Director & Digital Designer focusing on typographic systems and structural interfaces.
            </motion.p>
          </div>

          <div className="mt-8 overflow-hidden">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-3 px-4 py-2 border border-border rounded-full text-xs font-medium uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for new projects
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-muted-foreground/50"
        />
      </motion.div>
    </section>
  );
}
