"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [smoothWheel, setSmoothWheel] = useState(false);

  useEffect(() => {
    setSmoothWheel(
      !window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(max-width: 1023px)").matches,
    );
  }, []);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel }}
    >
      {children}
    </ReactLenis>
  );
}
