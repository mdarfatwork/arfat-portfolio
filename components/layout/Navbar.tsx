"use client";

import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { profile } from "@/data/profile";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

const letsTalkClassName =
  "rounded-full bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-widest text-background shadow-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const lenis = useLenis();

  const scrollToContact = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setOpen(false);
      setActive("#contact");

      const contact = document.getElementById("contact");
      if (lenis && contact) {
        lenis.scrollTo(contact, { offset: -100, duration: 1.2 });
      } else if (contact) {
        contact.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.history.pushState(null, "", "#contact");
    },
    [lenis],
  );

  useEffect(() => {
    const sections = [
      ...profile.navLinks.map((l) => l.href.replace("#", "")),
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4 md:top-6 md:px-6">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-border bg-card/80 px-5 py-3 backdrop-blur-xl"
        aria-label="Main navigation"
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {profile.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={scrollToContact}
            className={cn("hidden md:inline-flex", letsTalkClassName)}
          >
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-border bg-card/95 p-4 backdrop-blur-xl md:hidden">
          {profile.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                active === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={scrollToContact}
            className={cn("mt-3 block w-full text-center", letsTalkClassName)}
          >
            Let&apos;s Talk
          </a>
        </div>
      )}
    </header>
  );
}
