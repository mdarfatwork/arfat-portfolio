"use client";

import { useEffect, useRef, useState } from "react";
import { useLoading } from "@/components/providers/LoadingProvider";

const MIN_DISPLAY_MS = 800;
const FADE_OUT_MS = 500;
const PROGRESS_TICK_MS = 30;
const PROGRESS_STEP = 2;

export function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const startedAtRef = useRef(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!isLoading) return;

    startedAtRef.current = Date.now();
    finishedRef.current = false;
    document.body.style.overflow = "hidden";

    const tryFinish = () => {
      if (finishedRef.current) return;

      const elapsed = Date.now() - startedAtRef.current;
      if (document.readyState !== "complete" || elapsed < MIN_DISPLAY_MS) return;

      finishedRef.current = true;
      setProgress(100);
      setIsExiting(true);
      window.setTimeout(() => setIsLoading(false), FADE_OUT_MS);
    };

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (finishedRef.current) return 100;
        const next = Math.min(100, prev + PROGRESS_STEP);
        if (next >= 100) tryFinish();
        return next;
      });
    }, PROGRESS_TICK_MS);

    window.addEventListener("load", tryFinish);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("load", tryFinish);
      document.body.style.overflow = "";
    };
  }, [isLoading, setIsLoading]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-out"
      style={{ opacity: isExiting ? 0 : 1 }}
      aria-busy={!isExiting}
      aria-label="Loading portfolio"
    >
      <p className="font-heading text-6xl font-bold tracking-tighter text-foreground md:text-8xl">
        Loading
        <span className="text-muted-foreground">{progress}%</span>
      </p>
      <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-foreground transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
