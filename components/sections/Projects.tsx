"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { projects, PROJECTS_PAGE_SIZE, type Project } from "@/data/projects";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronDown, ExternalLink } from "lucide-react";

const ProjectModal = dynamic(
  () =>
    import("@/components/ui/ProjectModal").then((m) => ({
      default: m.ProjectModal,
    })),
  { ssr: false },
);

function ProjectCardImage({ project }: { project: Project }) {
  const initials = project.initials ?? project.title.charAt(0);

  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden border-b border-border bg-muted md:h-72">
      <div
        className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {project.image ? (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/10 transition-colors duration-700 group-hover:bg-transparent" />
        </div>
      ) : (
        <h3 className="relative z-10 font-heading text-5xl font-bold text-foreground/20 transition-colors duration-500 group-hover:text-foreground/40 md:text-6xl">
          {initials}
        </h3>
      )}

      {project.live && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-bold tracking-wider text-background uppercase shadow-lg">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Live
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PAGE_SIZE);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <section id="projects" className="section-padding bg-card/30">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <SectionHeader
            title="Featured Projects"
            subtitle="Priority work from Noorisys Technologies and personal SaaS builds — starting with production client platforms."
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {visibleProjects.map((project, i) => (
            <FadeIn key={project.id} delay={0.08 * i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <ProjectCardImage project={project} />

                <div className="flex flex-grow flex-col p-8 md:p-10">
                  <h3 className="font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-foreground/80 md:text-3xl">
                    {project.title}
                  </h3>
                  {project.context && (
                    <p className="mt-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      {project.context}
                    </p>
                  )}
                  <p className="mt-4 mb-8 flex-grow text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.description}
                  </p>

                  <div className="mb-10 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background px-4 py-2 text-xs font-bold tracking-widest text-foreground/80 uppercase transition-colors group-hover:border-foreground/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center border-t border-border pt-6">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold tracking-widest text-foreground uppercase transition-colors hover:text-muted-foreground"
                    >
                      <ExternalLink size={18} aria-hidden />
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {hasMore && (
          <FadeIn delay={0.2}>
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((count) =>
                    Math.min(count + PROJECTS_PAGE_SIZE, projects.length),
                  )
                }
                className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none"
              >
                View More Projects
                <ChevronDown size={16} />
              </button>
            </div>
          </FadeIn>
        )}
      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
