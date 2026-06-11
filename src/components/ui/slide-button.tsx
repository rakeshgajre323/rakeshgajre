import React, { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Check, Loader2, SendHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DRAG_CONSTRAINTS = { left: 0, right: 175 };
const DRAG_THRESHOLD = 0.9;

const BUTTON_STATES = {
  initial: { width: "14rem" },
  completed: { width: "8rem" },
};

const ANIMATION_CONFIG = {
  spring: { type: "spring" as const, stiffness: 400, damping: 40, mass: 0.8 },
};

type Status = "idle" | "loading" | "success" | "error";

const StatusIcon: React.FC<{ status: Status }> = ({ status }) => {
  const map: Partial<Record<Status, JSX.Element>> = {
    loading: <Loader2 className="animate-spin" size={20} />,
    success: <Check size={20} />,
    error: <X size={20} />,
  };
  const icon = map[status];
  if (!icon) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {icon}
    </motion.div>
  );
};

interface SlideButtonProps {
  onComplete: () => void;
  status?: Status;
  className?: string;
}

export const SlideButton: React.FC<SlideButtonProps> = ({
  onComplete,
  status = "idle",
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [completed, setCompleted] = useState(false);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);

  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, ANIMATION_CONFIG.spring);
  const dragProgress = useTransform(springX, [0, DRAG_CONSTRAINTS.right], [0, 1]);

  const handleDragStart = useCallback(() => {
    if (completed) return;
    setIsDragging(true);
  }, [completed]);

  const handleDragEnd = () => {
    if (completed) return;
    setIsDragging(false);
    const progress = dragProgress.get();
    if (progress >= DRAG_THRESHOLD) {
      setCompleted(true);
      onComplete();
    } else {
      dragX.set(0);
    }
  };

  const handleDrag = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (completed) return;
    const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right));
    dragX.set(newX);
  };

  const adjustedWidth = useTransform(springX, (x) => x + 10);

  return (
    <motion.div
      animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
      transition={ANIMATION_CONFIG.spring}
      className={cn(
        "relative flex h-14 items-center justify-center rounded-full bg-white/5 border border-white/10 select-none",
        className
      )}
    >
      {!completed && (
        <>
          <motion.div
            style={{ width: adjustedWidth }}
            className="absolute inset-y-0 left-0 z-0 rounded-full bg-accent"
          />
          <span className="pointer-events-none relative z-[1] font-display text-sm uppercase tracking-[0.2em] text-foreground/80">
            Slide to submit
          </span>
          <motion.div
            ref={dragHandleRef}
            drag="x"
            dragConstraints={DRAG_CONSTRAINTS}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            style={{ x: springX }}
            className="absolute left-1 z-10 flex cursor-grab items-center justify-center active:cursor-grabbing"
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full bg-accent-foreground text-accent shadow-lg transition-transform",
                isDragging && "scale-105"
              )}
            >
              <SendHorizontal className="size-5" />
            </div>
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {completed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-accent text-accent-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StatusIcon status={status === "idle" ? "loading" : status} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SlideButton;
