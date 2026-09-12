import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();

  const apiCatalog = {
    linkset: [
      {
        anchor: `${siteUrl}/`,
        "api-catalog": [
          {
            href: `${siteUrl}/.well-known/api-catalog`,
            type: "application/linkset+json",
            title: "API Catalog",
          },
        ],
        "ai-catalog": [
          {
            href: `${siteUrl}/.well-known/ai-catalog.json`,
            type: "application/json",
            title: "ARD Agentic Resource Discovery Manifest",
          },
        ],
        "mcp-server-card": [
          {
            href: `${siteUrl}/.well-known/mcp/server-card.json`,
            type: "application/json",
            title: "MCP Server Card (SEP-1649)",
          },
        ],
        "agent-skills": [
          {
            href: `${siteUrl}/.well-known/agent-skills/index.json`,
            type: "application/json",
            title: "Agent Skills Discovery Index (RFC v0.2.0)",
          },
        ],
        "oauth-protected-resource": [
          {
            href: `${siteUrl}/.well-known/oauth-protected-resource`,
            type: "application/json",
            title: "OAuth 2.0 Protected Resource Metadata (RFC 9728)",
          },
        ],
        "openid-configuration": [
          {
            href: `${siteUrl}/.well-known/openid-configuration`,
            type: "application/json",
            title: "OpenID Connect Discovery Metadata",
          },
        ],
        "oauth-authorization-server": [
          {
            href: `${siteUrl}/.well-known/oauth-authorization-server`,
            type: "application/json",
            title: "OAuth 2.0 Authorization Server Metadata (RFC 8414)",
          },
        ],
        jwks: [
          {
            href: `${siteUrl}/.well-known/jwks.json`,
            type: "application/jwk-set+json",
            title: "JSON Web Key Set (RFC 7517)",
          },
        ],
        "http-message-signatures-directory": [
          {
            href: `${siteUrl}/.well-known/http-message-signatures-directory`,
            type: "application/http-message-signatures-directory+json",
            title: "HTTP Message Signatures Directory (Web Bot Auth JWKS)",
          },
        ],
        describedby: [
          {
            href: `${siteUrl}/auth.md`,
            type: "text/markdown",
            title: "Auth.md Agent Authentication & Registration",
          },
          {
            href: `${siteUrl}/llms.txt`,
            type: "text/markdown",
            title: "LLM Context and Site Summary",
          },
          {
            href: `${siteUrl}/llms-full.txt`,
            type: "text/markdown",
            title: "Full Profile for AI Agents",
          },
        ],
        sitemap: [
          {
            href: `${siteUrl}/sitemap.xml`,
            type: "application/xml",
            title: "Sitemap",
          },
        ],
      },
    ],
  };

  const linkHeader = [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</.well-known/ai-catalog.json>; rel="ai-catalog"',
    '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
    '</.well-known/agent-skills/index.json>; rel="agent-skills"',
    '</auth.md>; rel="describedby"; type="text/markdown"',
    '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
    '</.well-known/openid-configuration>; rel="openid-configuration"',
    '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
    '</.well-known/jwks.json>; rel="jwks"',
    '</.well-known/http-message-signatures-directory>; rel="http-message-signatures-directory"',
    '</llms.txt>; rel="describedby"; type="text/markdown"',
    '</llms-full.txt>; rel="describedby"; type="text/markdown"',
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  ].join(", ");

  return new Response(JSON.stringify(apiCatalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
      "Vary": "Accept",
      "Link": linkHeader,
    },
  });
}
