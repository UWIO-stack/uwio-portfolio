import { useState, useRef, useEffect, ElementType } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
const COLORS = [
  "#FF3B3B", "#FF8C00", "#FFD600", "#00E676",
  "#00B0FF", "#D500F9", "#FF4081", "#1DE9B6",
  "#AEEA00", "#FF6D00",
];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function ScrambleChar({
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
          if (count > 6) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setDisplay(char);
            setColor("inherit");
          }
        }, 40);
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
    <span className="inline-block transition-colors duration-75" style={{ color }}>
      {display}
    </span>
  );
}

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  staggerMs?: number;
}

export default function ScrambleText({
  text,
  className,
  as: Tag = "span",
  staggerMs = 28,
}: ScrambleTextProps) {
  const [isScrambling, setIsScrambling] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setIsScrambling(true);
    const visibleChars = text.replace(/ /g, "").length;
    timeout.current = setTimeout(
      () => setIsScrambling(false),
      visibleChars * staggerMs + 380
    );
  };

  return (
    <Tag className={className} onMouseEnter={handleMouseEnter}>
      {text.split("").map((char, i) =>
        char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <ScrambleChar
            key={i}
            char={char}
            delay={i * staggerMs}
            isScrambling={isScrambling}
          />
        )
      )}
    </Tag>
  );
}
