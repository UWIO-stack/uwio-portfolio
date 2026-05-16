import { useEffect, useRef } from "react";

const COLORS = [
  "#ff006e",
  "#fb5607",
  "#ffbe0b",
  "#8338ec",
  "#3a86ff",
  "#06d6a0",
];

export default function ThemeFlash() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const handler = () => {
      const el = overlayRef.current;
      if (!el) return;

      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];

      const STEP = 180;

      el.style.transition = `background-color ${STEP * 0.9}ms ease-in-out, opacity 0.3s ease-in-out`;

      COLORS.forEach((color, i) => {
        const t = setTimeout(() => {
          el.style.backgroundColor = color;
          el.style.opacity = "0.22";
        }, i * STEP);
        timerRef.current.push(t);
      });

      const fadeOut = setTimeout(() => {
        el.style.transition = "opacity 0.5s ease-out";
        el.style.opacity = "0";
      }, COLORS.length * STEP);

      const reset = setTimeout(() => {
        el.style.transition = "";
        el.style.backgroundColor = "transparent";
      }, COLORS.length * STEP + 600);

      timerRef.current.push(fadeOut, reset);
    };

    window.addEventListener("uwio-theme-toggle", handler);
    return () => {
      window.removeEventListener("uwio-theme-toggle", handler);
      timerRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen"
      style={{ opacity: 0, backgroundColor: "transparent" }}
    />
  );
}
