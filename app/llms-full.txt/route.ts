import { getLlmsFullTxt } from "@/lib/llms-content";

export const dynamic = "force-static";

const linkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/http-message-signatures-directory>; rel="http-message-signatures-directory"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</llms-full.txt>; rel="describedby"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

export function GET() {
  return new Response(getLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Vary": "Accept",
      "Link": linkHeader,
    },
  });
}
