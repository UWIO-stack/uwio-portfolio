import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [visible]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
      style={{
        width: 10,
        height: 10,
        backgroundColor: "transparent",
        border: "1.5px solid currentColor",
        opacity: visible ? 1 : 0,
      }}
      animate={{
        x: mousePosition.x - 5,
        y: mousePosition.y - 5,
        scale: isHovering ? 2.2 : 1,
      }}
      transition={{
        x: { duration: 0 },
        y: { duration: 0 },
        scale: { type: "spring", stiffness: 400, damping: 25 },
        opacity: { duration: 0.2 },
      }}
    />
  );
}
