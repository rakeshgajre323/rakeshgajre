"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidbuttonVariants = cva(
  "relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent/70 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-[1.03] text-foreground",
        outline:
          "border border-foreground/30 bg-white/5 hover:bg-white/10 text-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-6",
        xl: "h-12 px-8",
        xxl: "h-14 px-10",
      },
    },
    defaultVariants: { variant: "default", size: "xxl" },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean;
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        <GlassFilter />
        <Comp
          ref={ref}
          className={cn(liquidbuttonVariants({ variant, size, className }))}
          {...props}
        >
          {/* Glass layer */}
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              backdropFilter: "url(#liquid-glass-filter)",
              WebkitBackdropFilter: "url(#liquid-glass-filter)",
              background: "rgba(255,255,255,0.04)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 -8px 24px rgba(255,255,255,0.06), inset 0 8px 24px rgba(255,255,255,0.08)",
            }}
          />
          {/* Sheen */}
          <span
            className="pointer-events-none absolute inset-0 rounded-full opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.12) 100%)",
            }}
          />
          <span className="relative z-10 inline-flex items-center gap-2">
            {children}
          </span>
        </Comp>
      </>
    );
  }
);
LiquidButton.displayName = "LiquidButton";

export { liquidbuttonVariants };
