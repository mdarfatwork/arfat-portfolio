import { createHash } from "node:crypto";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";
import { resolvePoppyDomain } from "@/lib/oauth-discovery";

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
- **A2A Agent Card**: \`${siteUrl}/.well-known/agent-card.json\`
- **Poppy Manifest**: \`${siteUrl}/.well-known/poppy.json\`
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
      {
        identifier: `urn:air:${domain}:a2a:agent-card`,
        displayName: "A2A Agent Card (A2A Protocol Discovery)",
        type: "application/json",
        url: `${siteUrl}/.well-known/agent-card.json`,
        representativeQueries: [
          "a2a agent card",
          "agent to agent discovery",
          "discover arfat a2a agent",
        ],
      },
      {
        identifier: `urn:air:${domain}:poppy:manifest`,
        displayName: "Personal Agent Protocol (Poppy) Discovery Manifest",
        type: "application/json",
        url: `${siteUrl}/.well-known/poppy.json`,
        representativeQueries: [
          "poppy protocol",
          "personal agent protocol",
          "poppy manifest",
        ],
      },
    ],
  };
}

/**
 * Generates an A2A (Agent-to-Agent) Agent Card per the A2A Protocol Specification.
 * @see https://a2a-protocol.org/latest/specification/
 * @see https://a2a-protocol.org/latest/topics/agent-discovery/
 */
export function getA2aAgentCard() {
  const siteUrl = getSiteUrl();

  return {
    $schema: "https://a2a-protocol.org/schemas/agent-card.json",
    name: `${profile.name} Portfolio Agent`,
    version: "1.0.0",
    description:
      `Autonomous AI agent interface for ${profile.name}'s developer portfolio. Provides agentic discovery of developer background, technical skills, projects, SaaS applications, and contact information via the A2A Protocol.`,
    provider: {
      name: profile.name,
      organization: profile.name,
      url: siteUrl,
    },
    supportedInterfaces: [
      {
        url: `${siteUrl}/api/a2a`,
        protocolBinding: "JSONRPC",
        protocolVersion: "1.0",
        protocol: "JSONRPC",
        transport: "HTTP",
      },
      {
        url: `${siteUrl}/api/a2a`,
        protocolBinding: "HTTP+JSON",
        protocolVersion: "1.0",
        protocol: "HTTP+JSON",
        transport: "HTTP",
      },
    ],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      extendedAgentCard: false,
    },
    defaultInputModes: ["application/json", "text/plain"],
    defaultOutputModes: ["application/json", "text/plain"],
    skills: [
      {
        id: "query-profile",
        name: "Query Developer Profile",
        description:
          "Retrieve comprehensive developer background, biography, career focus, and professional philosophy for Momin Mohammed Arfat.",
        tags: ["profile", "biography", "developer", "about"],
        examples: [
          "Who is Momin Mohammed Arfat?",
          "Summarize Arfat's software development experience.",
        ],
        inputModes: ["application/json", "text/plain"],
        outputModes: ["application/json", "text/plain"],
      },
      {
        id: "list-projects",
        name: "List Portfolio Projects",
        description:
          "Discover full-stack web applications, SaaS platforms, and AI engineering projects built by Arfat, with repository links and live URLs.",
        tags: ["projects", "portfolio", "saas", "fullstack", "ai"],
        examples: [
          "What web applications has Arfat built?",
          "List all featured portfolio projects and their tech stacks.",
        ],
        inputModes: ["application/json", "text/plain"],
        outputModes: ["application/json", "text/plain"],
      },
      {
        id: "query-skills",
        name: "Query Technical Skills",
        description:
          "Query technical proficiencies across frontend, backend, databases, AI/LLM integrations, and DevOps.",
        tags: ["skills", "tech-stack", "typescript", "react", "nextjs", "postgresql"],
        examples: [
          "What technologies does Arfat work with?",
          "Does Arfat have experience with Next.js and PostgreSQL?",
        ],
        inputModes: ["application/json", "text/plain"],
        outputModes: ["application/json", "text/plain"],
      },
      {
        id: "get-contact-info",
        name: "Get Contact Information",
        description:
          "Retrieve developer contact channels including verified email, LinkedIn, and GitHub profiles.",
        tags: ["contact", "email", "socials", "hire"],
        examples: [
          "How can I get in touch with Arfat?",
          "Provide Arfat's professional contact info and GitHub link.",
        ],
        inputModes: ["application/json", "text/plain"],
        outputModes: ["application/json", "text/plain"],
      },
    ],
  };
}

/**
 * Generates the Personal Agent Protocol (Poppy) discovery document (Draft 0.1).
 * @see https://personalagentprotocol.org/docs/spec#3-discovery
 * @see https://isitagentready.com/.well-known/agent-skills/personal-agent-protocol/SKILL.md
 */
export function getPoppyManifest(hostHeader?: string | null) {
  const siteUrl = getSiteUrl();
  const domain = resolvePoppyDomain(hostHeader);

  return {
    protocol_version: "0.1",
    organization: {
      name: profile.name,
      domain: domain,
    },
    auth: {
      issuer: siteUrl,
    },
    web: {},
    apis: [
      {
        type: "openapi",
        url: `${siteUrl}/.well-known/api-catalog`,
        description: "Developer portfolio APIs and discovery catalogs",
      },
      {
        type: "mcp",
        url: `${siteUrl}/.well-known/mcp/server-card.json`,
        description: "Model Context Protocol server for portfolio tools and resources",
      },
    ],
    agent: {
      protocols: [
        {
          type: "poppy",
          endpoint: `${siteUrl}/api/poppy/conversations`,
        },
        {
          type: "a2a",
          endpoint: `${siteUrl}/api/a2a`,
        },
      ],
    },
  };
}

