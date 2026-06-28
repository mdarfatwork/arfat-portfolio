"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

type ContactSuccessProps = Readonly<{
  onReset: () => void;
}>;

const ease = [0, 0, 0.2, 1] as const;

export function ContactSuccess({ onReset }: ContactSuccessProps) {
  const shouldReduceMotion = useReducedMotion();

  const instant = shouldReduceMotion;
  const container = instant
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease },
      };

  const iconSpring = instant
    ? {}
    : {
        initial: { scale: 0.6, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring" as const, stiffness: 320, damping: 22, delay: 0.05 },
      };

  const pulse = instant
    ? {}
    : {
        initial: { scale: 1, opacity: 0.35 },
        animate: { scale: 1.65, opacity: 0 },
        transition: { duration: 0.75, ease, delay: 0.15 },
      };

  const checkDraw = instant
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.35, ease, delay: 0.2 },
      };

  const textStagger = instant
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease },
      };

  return (
    <motion.div
      {...container}
      role="status"
      aria-live="polite"
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-foreground/4 blur-3xl"
      />

      <div className="relative mx-auto flex h-18 w-18 items-center justify-center">
        <motion.div
          {...pulse}
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-foreground/20"
        />
        <motion.div
          {...iconSpring}
          className="relative flex h-18 w-18 items-center justify-center rounded-full border border-foreground/15 bg-muted"
        >
          {shouldReduceMotion ? (
            <Check className="h-7 w-7 text-foreground" strokeWidth={2.25} aria-hidden="true" />
          ) : (
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-foreground"
            >
              <motion.path
                {...checkDraw}
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </motion.div>
      </div>

      <motion.p
        {...textStagger}
        transition={{ ...textStagger.transition, delay: instant ? 0 : 0.28 }}
        className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
      >
        Message delivered
      </motion.p>

      <motion.h3
        {...textStagger}
        transition={{ ...textStagger.transition, delay: instant ? 0 : 0.34 }}
        className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl"
      >
        You&apos;re on my radar
      </motion.h3>

      <motion.p
        {...textStagger}
        transition={{ ...textStagger.transition, delay: instant ? 0 : 0.4 }}
        className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground"
      >
        Thanks for reaching out. I&apos;ll read your message and reply as soon as I can.
      </motion.p>

      <motion.button
        {...textStagger}
        transition={{ ...textStagger.transition, delay: instant ? 0 : 0.46 }}
        type="button"
        onClick={onReset}
        className="mt-8 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        Send another message
      </motion.button>
    </motion.div>
  );
}
