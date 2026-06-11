"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const liquidButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 overflow-hidden isolate",
  {
    variants: {
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean;
}

let filterIdCounter = 0;

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, size, asChild = false, children, ...props }, ref) => {
    const Comp: any = asChild ? Slot : "button";
    const filterId = React.useMemo(() => `liquid-glass-${++filterIdCounter}`, []);

    return (
      <Comp
        ref={ref}
        className={cn(liquidButtonVariants({ size }), "text-foreground", className)}
        {...props}
      >
        {/* Glass layer */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            backdropFilter: `url(#${filterId}) blur(2px)`,
            WebkitBackdropFilter: `blur(8px)`,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
          }}
        />
        {/* Border highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_30px_-12px_rgba(0,0,0,0.4)]"
        />
        {/* Specular sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-2xl bg-gradient-to-b from-white/25 to-transparent opacity-60 blur-[2px]"
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

        {/* SVG filter (scoped) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0"
        >
          <defs>
            <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.012"
                numOctaves="1"
                seed="7"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurredNoise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurredNoise"
                scale="60"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </Comp>
    );
  },
);
LiquidButton.displayName = "LiquidButton";
