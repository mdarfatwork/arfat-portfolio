import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  children: ReactNode;
  href?: string;
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variants = {
    primary: "bg-foreground text-background hover:opacity-90",
    outline:
      "border border-border bg-background text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} suppressHydrationWarning {...props}>
      {children}
    </button>
  );
}
