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
- [API Catalog](${siteUrl}/.well-known/api-catalog): RFC 9727 linkset API & resource catalog
- [Web Bot Auth JWKS Directory](${siteUrl}/.well-known/http-message-signatures-directory): Cryptographic HTTP message signatures key directory for bot authentication
`;
}

export function getLlmsFullTxt(): string {
  const siteUrl = getSiteUrl();

  const skillBlocks = skills
    .map((group) => `### ${group.title}\n${group.tags.join(", ")}`)
    .join("\n\n");

  const experienceBlocks = experience
    .map((job) => {
      const highlights = job.highlights.map((h) => `- ${h}`).join("\n");
      return `### ${job.role} @ ${job.company}\n${job.location} · ${job.period}\n\n${highlights}`;
    })
    .join("\n\n");

  const projectBlocks = projects
    .map((project) => {
      const links = [
        project.liveUrl ? `Live: ${project.liveUrl}` : null,
        project.githubUrl ? `GitHub: ${project.githubUrl}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      const contextSuffix = project.context ? ` (${project.context})` : "";
      const linksSuffix = links ? `\n${links}` : "";

      return `### ${project.title}${contextSuffix}\n${project.description}\n\n${project.details}\n\nTechnologies: ${project.technologies.join(", ")}${linksSuffix}`;
    })
    .join("\n\n");

  const certBlocks = certifications
    .map((cert) => {
      const urlSuffix = cert.url ? `: ${cert.url}` : "";
      return `- ${cert.title} — ${cert.issuer}${urlSuffix}`;
    })
    .join("\n");

  const serviceBlocks = profile.footerServices
    .map((s) => `- ${s}`)
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

${serviceBlocks}

## Site & Agent Discovery

- Framework: Next.js (App Router), TypeScript, Tailwind CSS
- Sitemap: ${siteUrl}/sitemap.xml
- Robots: ${siteUrl}/robots.txt
- API Catalog: ${siteUrl}/.well-known/api-catalog
- Web Bot Auth Directory: ${siteUrl}/.well-known/http-message-signatures-directory
- LLMs Summary: ${siteUrl}/llms.txt
- LLMs Full: ${siteUrl}/llms-full.txt
`;
}

/**
 * Estimates the token count for LLM context budgeting (standard heuristic: ~4 chars per token).
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Returns the markdown representation for a given route pathname.
 */
export function getMarkdownForPath(pathname: string): string {
  let normalized = pathname;
  while (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  if (normalized === "/llms.txt") {
    return getLlmsTxt();
  }
  return getLlmsFullTxt();
}
