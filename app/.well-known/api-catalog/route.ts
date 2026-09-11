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
        "http-message-signatures-directory": [
          {
            href: `${siteUrl}/.well-known/http-message-signatures-directory`,
            type: "application/http-message-signatures-directory+json",
            title: "HTTP Message Signatures Directory (Web Bot Auth JWKS)",
          },
        ],
        describedby: [
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
    '</.well-known/http-message-signatures-directory>; rel="http-message-signatures-directory"',
    '</llms.txt>; rel="describedby"; type="text/markdown"',
    '</llms-full.txt>; rel="describedby"; type="text/markdown"',
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  ].join(", ");

  return new Response(JSON.stringify(apiCatalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Vary": "Accept",
      "Link": linkHeader,
    },
  });
}

