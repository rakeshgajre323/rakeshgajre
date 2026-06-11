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
  const [width, setWidth] = useState<string>("auto");
  const measureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!measureRef.current) return;
    const el = measureRef.current.children[currentIndex] as HTMLElement | undefined;
    if (el) setWidth(`${el.getBoundingClientRect().width}px`);
  }, [currentIndex, words]);

  useEffect(() => {
    const t = setInterval(
      () => setCurrentIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(t);
  }, [interval, words.length]);

  const variants = {
    hidden: { y: -20, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  return (
    <>
      {/* Hidden measurement copy */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 opacity-0"
        style={{ visibility: "hidden" }}
      >
        {words.map((w, i) => (
          <span key={i} className={cn("font-bold inline-block", className)}>
            {w}
          </span>
        ))}
      </div>

      <motion.span
        className="relative inline-block align-baseline overflow-hidden"
        animate={{ width }}
        transition={{ type: "spring", stiffness: 150, damping: 22 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={cn("inline-block font-bold text-foreground", className)}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
