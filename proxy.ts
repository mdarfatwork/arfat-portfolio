import { NextRequest, NextResponse } from "next/server";
import { estimateTokens, getMarkdownForPath } from "@/lib/llms-content";

const LINK_HEADERS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
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

export function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";

  if (prefersMarkdown(acceptHeader)) {
    const pathname = request.nextUrl.pathname;
    const markdownContent = getMarkdownForPath(pathname);
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
