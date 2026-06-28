import { skills } from "@/data/skills";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-card/30">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeader
            title="Technical Expertise"
            subtitle="A collection of technologies and tools I use to build scalable SaaS products, AI-powered applications, and modern full-stack solutions."
          />
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <FadeIn key={skill.title} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {skill.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
