import { NextRequest, NextResponse } from "next/server";
import { estimateTokens, getMarkdownForPath } from "@/lib/llms-content";
import { getAuthMd } from "@/lib/oauth-discovery";
import { getPortfolioAssistantSkillMd } from "@/lib/agent-discovery";

const LINK_HEADERS = [
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

/**
 * Checks whether the incoming request prefers or accepts markdown over html.
 */
function prefersMarkdown(acceptHeader: string): boolean {
  if (!acceptHeader) return false;
  return acceptHeader.toLowerCase().includes("text/markdown");
}

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";

  if (prefersMarkdown(acceptHeader)) {
    const pathname = request.nextUrl.pathname;
    let markdownContent = "";

    if (pathname === "/auth.md") {
      markdownContent = getAuthMd();
    } else if (
      pathname ===
      "/.well-known/agent-skills/portfolio-assistant/SKILL.md"
    ) {
      markdownContent = getPortfolioAssistantSkillMd();
    } else {
      markdownContent = getMarkdownForPath(pathname);
    }

    const tokenCount = estimateTokens(markdownContent);

    return new Response(markdownContent, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": tokenCount.toString(),
        "Vary": "Accept",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Link": LINK_HEADERS,
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Link", LINK_HEADERS);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, icon.svg, manifest.webmanifest
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|manifest.webmanifest).*)",
  ],
};
