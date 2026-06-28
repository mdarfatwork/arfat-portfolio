import { profile } from "@/data/profile";
import { FadeIn } from "@/components/ui/FadeIn";
import { Quote } from "lucide-react";

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Hello, I&apos;m {profile.shortName}.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-semibold text-foreground md:text-xl">
            {profile.aboutIntro}
          </p>
          <div className="mt-6 h-1 w-16 rounded-full bg-foreground" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.aboutBio}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.traits.map((trait, i) => (
            <FadeIn key={trait.title} delay={0.1 * i}>
              <div className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {trait.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {trait.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-16 rounded-2xl border border-dashed border-border bg-muted/30 p-8 md:p-10">
            <div className="flex items-start gap-4">
              <Quote className="mt-1 shrink-0 text-muted-foreground" size={24} />
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Development Philosophy
                </h3>
                <blockquote className="mt-4 text-lg italic text-muted-foreground">
                  &ldquo;{profile.philosophy}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {profile.philosophyDetail}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
