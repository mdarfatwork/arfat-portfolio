import { getAiCatalog } from "@/lib/agent-discovery";

export const dynamic = "force-static";

const LINK_HEADER = [
  '</.well-known/ai-catalog.json>; rel="ai-catalog"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</auth.md>; rel="describedby"; type="text/markdown"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
  '</.well-known/openid-configuration>; rel="openid-configuration"',
  '</.well-known/jwks.json>; rel="jwks"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</llms-full.txt>; rel="describedby"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const COMMON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
  "Vary": "Accept",
  "Link": LINK_HEADER,
};

export function GET() {
  const catalog = getAiCatalog();

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: COMMON_HEADERS,
  });
}

export function HEAD() {
  return new Response(null, {
    status: 200,
    headers: COMMON_HEADERS,
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
      "Access-Control-Max-Age": "86400",
    },
  });
}
