"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidWrapperVariants = cva(
  "relative inline-flex items-center justify-center align-middle overflow-hidden rounded-full transition-all duration-300 hover:scale-[1.03]",
  {
    variants: {
      size: {
        default: "h-9 min-w-9",
        sm: "h-8 min-w-8 text-xs",
        lg: "h-11 min-w-11",
        xl: "h-12 min-w-12",
        xxl: "h-14 min-w-14",
      },
    },
    defaultVariants: { size: "xxl" },
  }
);

const liquidContentVariants = cva(
  "relative z-10 inline-flex h-full w-full items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "px-4 py-2 text-sm",
        sm: "px-4 text-xs",
        lg: "px-6 text-sm",
        xl: "px-8 text-base",
        xxl: "px-10 text-base",
      },
    },
    defaultVariants: { size: "xxl" },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidWrapperVariants> {
  asChild?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <span className={cn(liquidWrapperVariants({ size }), className)}>
        {/* Glass layer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: "color-mix(in oklab, var(--foreground) 6%, transparent)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            boxShadow:
              "inset 0 0 0 1px color-mix(in oklab, var(--foreground) 20%, transparent), inset 0 -8px 24px color-mix(in oklab, var(--foreground) 6%, transparent), inset 0 8px 24px color-mix(in oklab, var(--foreground) 8%, transparent)",
          }}
        />
        {/* Sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--foreground) 14%, transparent) 0%, transparent 35%, transparent 65%, color-mix(in oklab, var(--foreground) 10%, transparent) 100%)",
          }}
        />
        <Comp
          ref={ref}
          className={cn(liquidContentVariants({ size }))}
          {...props}
        >
          {children}
        </Comp>
      </span>
    );
  }
);
LiquidButton.displayName = "LiquidButton";
