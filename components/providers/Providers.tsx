"use client";

import type { ReactNode } from "react";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/layout/BackToTop";

type AppShellProps = Readonly<{
  children: ReactNode;
}>;

function AppShell({ children }: AppShellProps) {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      {children}
      <BackToTop />
    </>
  );
}

type ProvidersProps = Readonly<{
  children: ReactNode;
}>;

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <SmoothScroll>
          <AppShell>{children}</AppShell>
        </SmoothScroll>
      </LoadingProvider>
    </ThemeProvider>
  );
}
