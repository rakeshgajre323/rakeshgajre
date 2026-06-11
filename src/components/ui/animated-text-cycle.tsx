"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  interval = 2800,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<number | "auto">("auto");
  const measureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!measureRef.current) return;
    const el = measureRef.current.children[currentIndex] as HTMLElement | undefined;
    if (el) {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setWidth(w);
    }
  }, [currentIndex, words]);

  useEffect(() => {
    const t = setInterval(
      () => setCurrentIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(t);
  }, [interval, words.length]);

  const variants = {
    hidden: { y: "-60%", opacity: 0, filter: "blur(8px)" },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: "easeOut" as const },
    },
    exit: {
      y: "60%",
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  return (
    <span className="relative inline-flex items-baseline align-baseline">
      {/* Hidden measurement copy (kept in flow but invisible) */}
      <span
        ref={measureRef as any}
        aria-hidden="true"
        className="invisible pointer-events-none absolute left-0 top-0 whitespace-nowrap"
      >
        {words.map((w, i) => (
          <span key={i} className={cn("inline-block font-bold", className)}>
            {w}
          </span>
        ))}
      </span>

      {/* Animated visible word — keeps layout width via motion animation */}
      <motion.span
        className="relative inline-block overflow-hidden align-baseline leading-[1.05]"
        animate={{ width }}
        initial={false}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
        style={{ minWidth: "1ch" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={cn(
              "inline-block whitespace-nowrap font-bold text-foreground",
              className,
            )}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
