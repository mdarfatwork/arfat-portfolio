"use client";

import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import { ContactFormSkeleton } from "@/components/sections/ContactFormSkeleton";
import { FadeIn } from "@/components/ui/FadeIn";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const ContactForm = dynamic(
  () =>
    import("@/components/sections/ContactForm").then((mod) => mod.ContactForm),
  {
    ssr: false,
    loading: () => <ContactFormSkeleton />,
  },
);

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Ready to innovate?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              I&apos;m currently available for freelance projects, technical
              consulting, and full-time opportunities.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Direct Email
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 flex items-center gap-3 font-heading text-lg font-semibold text-foreground hover:underline"
                >
                  <Mail size={20} />
                  {profile.email}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Digital Presence
                </p>
                <div className="mt-4 flex gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <GitHubIcon size={16} />
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <LinkedInIcon size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
