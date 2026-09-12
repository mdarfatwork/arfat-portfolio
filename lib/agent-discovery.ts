import { createHash } from "node:crypto";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return process.env.NEXT_PUBLIC_SITE_URL || "arfat.is-a.dev";
  }
}

/**
 * Skill Markdown content for the portfolio-assistant skill.
 */
export function getPortfolioAssistantSkillMd(): string {
  const siteUrl = getSiteUrl();

  return `---
name: portfolio-assistant
description: Interact with and query Momin Mohammed Arfat's developer portfolio, projects, skills, and contact info.
version: 1.0.0
---

# Portfolio Assistant Skill

This skill allows AI agents to interact with **${profile.name}**'s developer portfolio and APIs.

## Capabilities

1. **Profile Summary**: Query background, hero summary, and development philosophy.
2. **Projects Discovery**: Inspect full-stack web applications, SaaS tools, and AI projects.
3. **Skills & Tech Stack**: Retrieve technologies, frameworks, databases, and DevOps tools.
4. **Contact & Availability**: Fetch direct contact info, email, LinkedIn, and GitHub.

## Endpoints

- **LLM Summary**: \`${siteUrl}/llms.txt\`
- **LLM Full Profile**: \`${siteUrl}/llms-full.txt\`
- **MCP Server Card**: \`${siteUrl}/.well-known/mcp/server-card.json\`
- **AI Catalog**: \`${siteUrl}/.well-known/ai-catalog.json\`
- **API Catalog**: \`${siteUrl}/.well-known/api-catalog\`
- **Auth.md**: \`${siteUrl}/auth.md\`
`;
}

/**
 * Generates an MCP Server Card according to SEP-1649.
 * @see https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127
 */
export function getMcpServerCard() {
  const siteUrl = getSiteUrl();

  return {
    $schema: "https://modelcontextprotocol.io/schemas/server-card/v1.json",
    serverInfo: {
      name: "momin-mohammed-arfat-portfolio-mcp",
      title: `${profile.name} Portfolio MCP Server`,
      version: "1.0.0",
      description:
        "Model Context Protocol server for querying portfolio details, projects, skills, certifications, and developer contact info.",
    },
    transport: {
      type: "streamable-http",
      endpoint: `${siteUrl}/api/mcp`,
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
    },
    tools: [
      {
        name: "get_profile",
        description:
          "Get full profile information including biography, skills, contact, and experience summary.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
      },
      {
        name: "list_projects",
        description:
          "List all featured portfolio projects with tech stack and live URLs.",
        inputSchema: {
          type: "object",
          properties: {
            technology: {
              type: "string",
              description:
                "Optional filter by technology (e.g. Next.js, AI, PostgreSQL)",
            },
          },
          additionalProperties: false,
        },
      },
      {
        name: "get_skills",
        description:
          "Retrieve developer skills categorized by domain (frontend, backend, AI/ML, cloud).",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
      },
      {
        name: "get_contact_info",
        description:
          "Get direct contact details, email, GitHub, and LinkedIn profiles.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
      },
    ],
    resources: [
      {
        uri: "portfolio://profile/full",
        name: "Full Developer Profile",
        mimeType: "text/markdown",
        description: "Complete developer biography, project details, and experience.",
      },
      {
        uri: "portfolio://skills/catalog",
        name: "Skills Catalog",
        mimeType: "application/json",
        description: "Structured JSON of technical proficiencies.",
      },
    ],
  };
}

/**
 * Generates the Agent Skills Discovery Index document per Agent Skills Discovery RFC v0.2.0.
 * @see https://github.com/cloudflare/agent-skills-discovery-rfc
 */
export function getAgentSkillsIndex() {
  const siteUrl = getSiteUrl();
  const skillMdContent = getPortfolioAssistantSkillMd();
  const skillSha256 = createHash("sha256")
    .update(skillMdContent, "utf8")
    .digest("hex");

  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "portfolio-assistant",
        type: "skill-md",
        description:
          "Interact with and query Momin Mohammed Arfat's developer portfolio, projects, skills, and contact info.",
        url: `${siteUrl}/.well-known/agent-skills/portfolio-assistant/SKILL.md`,
        digest: `sha256:${skillSha256}`,
      },
    ],
  };
}

/**
 * Generates the ARD (Agentic Resource Discovery) AI Catalog manifest.
 * @see https://agenticresourcediscovery.org/
 * @see https://github.com/ards-project/ard-spec
 */
export function getAiCatalog() {
  const siteUrl = getSiteUrl();
  const domain = getDomain(siteUrl);

  return {
    specVersion: "1.0",
    host: {
      displayName: `${profile.name} - Portfolio & Agent Services`,
      identifier: `did:web:${domain}`,
    },
    entries: [
      {
        identifier: `urn:air:${domain}:mcp:server-card`,
        displayName: `${profile.shortName} Portfolio MCP Server`,
        type: "application/mcp-server-card+json",
        url: `${siteUrl}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          "connect to portfolio mcp server",
          "discover arfat mcp tools",
          "run developer portfolio mcp",
        ],
      },
      {
        identifier: `urn:air:${domain}:skills:portfolio-assistant`,
        displayName: "Portfolio Assistant Skill",
        type: "text/markdown",
        url: `${siteUrl}/.well-known/agent-skills/portfolio-assistant/SKILL.md`,
        representativeQueries: [
          "how to query arfat portfolio",
          "arfat agent skills",
          "developer assistant skill",
        ],
      },
      {
        identifier: `urn:air:${domain}:auth:agent-registration`,
        displayName: "Auth.md Agent Authentication & Registration",
        type: "text/markdown",
        url: `${siteUrl}/auth.md`,
        representativeQueries: [
          "how to authenticate as an agent",
          "register ai bot with arfat api",
          "get oauth access token",
        ],
      },
      {
        identifier: `urn:air:${domain}:catalog:api-linkset`,
        displayName: "RFC 9727 API & Resource Catalog",
        type: "application/linkset+json",
        url: `${siteUrl}/.well-known/api-catalog`,
        representativeQueries: [
          "api catalog linkset",
          "list all agent ready endpoints",
          "discover portfolio resources",
        ],
      },
      {
        identifier: `urn:air:${domain}:context:llms-full`,
        displayName: "Full Profile Context for LLMs",
        type: "text/markdown",
        url: `${siteUrl}/llms-full.txt`,
        representativeQueries: [
          "who is momin mohammed arfat",
          "arfat work experience and projects",
          "full developer resume for llm",
        ],
      },
    ],
  };
}
