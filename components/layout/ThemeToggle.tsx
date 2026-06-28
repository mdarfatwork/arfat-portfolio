"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsClient } from "@/lib/use-is-client";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useIsClient();
  const isDark = !mounted || theme === "dark" || theme === undefined;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
        className,
      )}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <Sun
        size={18}
        className={cn(
          "absolute transition-opacity",
          isDark ? "opacity-100" : "opacity-0",
        )}
      />
      <Moon
        size={18}
        className={cn(
          "absolute transition-opacity",
          isDark ? "opacity-0" : "opacity-100",
        )}
      />
    </button>
  );
}
