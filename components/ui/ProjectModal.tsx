"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, CircleCheck, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/projects";
import { useIsClient } from "@/lib/use-is-client";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

function ProjectHeroImage({ project }: { project: Project }) {
  const initials = project.initials ?? project.title.charAt(0);

  return (
    <div className="relative mb-12 flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted md:h-96">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {project.image ? (
        <div className="absolute inset-0 z-10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
            priority
          />
        </div>
      ) : (
        <h3 className="relative z-10 font-heading text-[8rem] font-bold text-foreground/10 select-none md:text-[10rem]">
          {initials}
        </h3>
      )}
    </div>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const mounted = useIsClient();

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    globalThis.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      globalThis.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          className="fixed inset-0 z-[100] flex flex-col bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="z-10 flex w-full flex-none items-center justify-between border-b border-border bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-muted"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <div className="w-full flex-1 overflow-y-auto" data-lenis-prevent>
            <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:py-24 lg:px-8">
              <ProjectHeroImage project={project} />

              <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h2
                    id="project-detail-title"
                    className="mb-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl"
                  >
                    {project.title}
                  </h2>
                  {project.context && (
                    <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      {project.context}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-bold tracking-widest text-foreground/80 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold tracking-widest text-background uppercase transition-transform hover:scale-105"
                    >
                      <ExternalLink size={18} />
                      Visit Site
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold tracking-widest text-foreground uppercase transition-colors hover:bg-muted"
                    >
                      <ExternalLink size={18} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <hr className="mb-12 border-border" />

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h3 className="mb-6 font-heading text-2xl font-bold tracking-widest uppercase">
                    Project Overview
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {project.details}
                  </p>
                </div>

                <div>
                  <h3 className="mb-6 font-heading text-xl font-bold tracking-widest uppercase">
                    Key Features
                  </h3>
                  <ul className="space-y-4">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CircleCheck
                          size={20}
                          className="mt-0.5 shrink-0 text-foreground"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
