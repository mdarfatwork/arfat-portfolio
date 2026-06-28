import { services } from "@/data/services";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeader
            title="Freelance Services"
            subtitle="Providing tailored digital solutions to help businesses grow, operate efficiently, and establish a powerful online presence."
          />
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={0.1 * i}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 md:p-8">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {"tags" in service && service.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {"bullets" in service && service.bullets && (
                  <ul className="mt-6 space-y-2 border-t border-border pt-6">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-foreground">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
