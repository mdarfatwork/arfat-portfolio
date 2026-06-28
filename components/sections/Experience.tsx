import { experience } from "@/data/experience";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeader
            title="Professional Experience"
            subtitle="Building production-ready applications, collaborating with teams, and delivering scalable software solutions across SaaS and AI-powered products."
          />
        </FadeIn>

        <div className="space-y-8">
          {experience.map((job, i) => (
            <FadeIn key={job.company} delay={0.1 * i}>
              <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                      <Briefcase size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                        {job.company.split(" ")[0]}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-bold text-foreground">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {job.company} · {job.location}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex w-fit rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
                      job.status === "current"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {job.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 border-t border-border pt-6">
                  {job.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
