import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

export function JsonLd() {
  const siteUrl = getSiteUrl();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    alternateName: profile.shortName,
    url: siteUrl,
    email: profile.email,
    jobTitle: profile.title,
    description: profile.aboutIntro,
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "Full Stack Development",
      "SaaS Development",
      "AI Integrations",
      "PostgreSQL",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${profile.name} | Portfolio`,
    description: profile.heroDescription,
    inLanguage: "en-US",
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${profile.name} — ${profile.title}`,
    description: profile.aboutBio,
    mainEntity: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: project.liveUrl ?? project.githubUrl ?? siteUrl,
        author: { "@id": `${siteUrl}/#person` },
      },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [personSchema, websiteSchema, profilePageSchema, projectsSchema],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
