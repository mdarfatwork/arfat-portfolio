import { certifications } from "@/data/certifications";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Award, ExternalLink } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeader
            title="Certifications"
            subtitle="A collection of my professional certifications, awards, and continuous learning milestones."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const link = cert.pdf ?? cert.url;

            return (
              <FadeIn key={cert.title} delay={0.06 * i}>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <Award size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-base font-semibold text-foreground group-hover:underline">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ) : (
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <Award size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {cert.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
