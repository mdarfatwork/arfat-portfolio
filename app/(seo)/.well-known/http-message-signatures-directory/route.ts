import { getWebBotAuthJwks } from "@/lib/web-bot-auth";

export const dynamic = "force-static";

const LINK_HEADER = [
  '</.well-known/http-message-signatures-directory>; rel="http-message-signatures-directory"',
  '</auth.md>; rel="describedby"; type="text/markdown"',
  '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
  '</.well-known/openid-configuration>; rel="openid-configuration"',
  '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"',
  '</.well-known/jwks.json>; rel="jwks"',
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</llms-full.txt>; rel="describedby"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const COMMON_HEADERS = {
  "Content-Type": "application/http-message-signatures-directory+json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Signature, Signature-Input, Signature-Agent",
  "Vary": "Accept",
  "Link": LINK_HEADER,
};

export function GET() {
  const jwks = getWebBotAuthJwks();

  return new Response(JSON.stringify(jwks, null, 2), {
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
      "Access-Control-Allow-Headers": "Content-Type, Accept, Signature, Signature-Input, Signature-Agent",
      "Access-Control-Max-Age": "86400",
    },
  });
}
