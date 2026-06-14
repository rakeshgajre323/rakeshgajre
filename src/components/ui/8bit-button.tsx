import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function Button({ children, href, className, onClick }: ButtonProps) {
  const classes = cn(
    "relative inline-flex items-center justify-center px-6 py-3",
    "bg-[#e0e0e0] text-black border-2 border-black",
    "font-pixel text-xs uppercase tracking-widest",
    "shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]",
    "transition-all duration-100",
    "hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-x-[2px] hover:-translate-y-[2px]",
    "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
    className
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
