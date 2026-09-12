"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => { };
  const m1 = window.matchMedia("(pointer: coarse)");
  const m2 = window.matchMedia("(max-width: 1023px)");
  m1.addEventListener("change", callback);
  m2.addEventListener("change", callback);
  return () => {
    m1.removeEventListener("change", callback);
    m2.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    !window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(max-width: 1023px)").matches
  );
}

function getServerSnapshot() {
  return false;
}

export function SmoothScroll({ children }: Readonly<{ children: ReactNode }>) {
  const smoothWheel = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel }}
    >
      {children}
    </ReactLenis>
  );
}
