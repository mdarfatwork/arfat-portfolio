import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function generateRobotsTxt(): string {
  const siteUrl = getSiteUrl();

  const allowedAgentPaths = [
    "/",
    "/llms.txt",
    "/llms-full.txt",
    "/.well-known/api-catalog",
    "/.well-known/http-message-signatures-directory",
  ];

  const agentBlocks = [
    {
      userAgent: "*",
      allows: ["/"],
      contentSignal: "ai-train=no, search=yes, ai-input=no",
    },
    {
      userAgent: "GPTBot",
      allows: allowedAgentPaths,
      contentSignal: "ai-train=no, search=yes, ai-input=no",
    },
    {
      userAgent: "ChatGPT-User",
      allows: allowedAgentPaths,
      contentSignal: "ai-train=no, search=yes, ai-input=no",
    },
    {
      userAgent: "Google-Extended",
      allows: ["/", "/.well-known/api-catalog", "/.well-known/http-message-signatures-directory"],
      contentSignal: "ai-train=no, search=yes, ai-input=no",
    },
    {
      userAgent: "anthropic-ai",
      allows: allowedAgentPaths,
      contentSignal: "ai-train=no, search=yes, ai-input=no",
    },
    {
      userAgent: "ClaudeBot",
      allows: allowedAgentPaths,
      contentSignal: "ai-train=no, search=yes, ai-input=no",
    },
    {
      userAgent: "PerplexityBot",
      allows: allowedAgentPaths,
      contentSignal: "ai-train=no, search=yes, ai-input=no",
    },
  ];

  const sections = agentBlocks.map((block) => {
    const lines = [
      `User-agent: ${block.userAgent}`,
      ...block.allows.map((path) => `Allow: ${path}`),
      `Content-Signal: ${block.contentSignal}`,
    ];
    return lines.join("\n");
  });

  return `${sections.join("\n\n")}

Host: ${siteUrl}
Sitemap: ${siteUrl}/sitemap.xml
`;
}

export function GET() {
  const content = generateRobotsTxt();

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Vary": "Accept",
    },
  });
}

export function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Vary": "Accept",
    },
  });
}
