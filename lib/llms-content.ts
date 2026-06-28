import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { getSiteUrl } from "@/lib/site";

export function getLlmsTxt(): string {
  const siteUrl = getSiteUrl();

  return `# ${profile.name}

> ${profile.title}. ${profile.heroDescription}

${profile.aboutIntro}

## Contact

- Email: ${profile.email}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- Website: ${siteUrl}

## Sections

- [Home](${siteUrl}/#home): Hero and introduction
- [About](${siteUrl}/#about): Background and development philosophy
- [Skills](${siteUrl}/#skills): Technical expertise
- [Experience](${siteUrl}/#experience): Professional work history
- [Projects](${siteUrl}/#projects): Featured portfolio projects
- [Certifications](${siteUrl}/#certifications): Professional certifications
- [Services](${siteUrl}/#services): Freelance and consulting services
- [Contact](${siteUrl}/#contact): Get in touch

## Optional

- [Full profile for LLMs](${siteUrl}/llms-full.txt): Extended biography, projects, and experience
`;
}

export function getLlmsFullTxt(): string {
  const siteUrl = getSiteUrl();

  const skillBlocks = skills
    .map((group) => `### ${group.title}\n${group.tags.join(", ")}`)
    .join("\n\n");

  const experienceBlocks = experience
    .map(
      (job) =>
        `### ${job.role} @ ${job.company}\n${job.location} · ${job.period}\n\n${job.highlights.map((h) => `- ${h}`).join("\n")}`,
    )
    .join("\n\n");

  const projectBlocks = projects
    .map((project) => {
      const links = [
        project.liveUrl ? `Live: ${project.liveUrl}` : null,
        project.githubUrl ? `GitHub: ${project.githubUrl}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      return `### ${project.title}${project.context ? ` (${project.context})` : ""}\n${project.description}\n\n${project.details}\n\nTechnologies: ${project.technologies.join(", ")}${links ? `\n${links}` : ""}`;
    })
    .join("\n\n");

  const certBlocks = certifications
    .map((cert) => `- ${cert.title} — ${cert.issuer}${cert.url ? `: ${cert.url}` : ""}`)
    .join("\n");

  return `# ${profile.name} — Full Profile

> ${profile.title}

## Summary

${profile.aboutBio}

${profile.philosophy}

${profile.philosophyDetail}

## Contact & Links

- Name: ${profile.name}
- Email: ${profile.email}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}
- Portfolio: ${siteUrl}
- Availability: ${profile.availability}

## Skills

${skillBlocks}

## Experience

${experienceBlocks}

## Projects

${projectBlocks}

## Certifications

${certBlocks}

## Services

${profile.footerServices.map((s) => `- ${s}`).join("\n")}

## Site

- Framework: Next.js (App Router), TypeScript, Tailwind CSS
- Sitemap: ${siteUrl}/sitemap.xml
- Robots: ${siteUrl}/robots.txt
`;
}
