import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  const allowedAgentPaths = [
    "/",
    "/llms.txt",
    "/llms-full.txt",
    "/.well-known/api-catalog",
    "/.well-known/http-message-signatures-directory",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: allowedAgentPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: allowedAgentPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/.well-known/api-catalog", "/.well-known/http-message-signatures-directory"],
      },
      {
        userAgent: "anthropic-ai",
        allow: allowedAgentPaths,
      },
      {
        userAgent: "ClaudeBot",
        allow: allowedAgentPaths,
      },
      {
        userAgent: "PerplexityBot",
        allow: allowedAgentPaths,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

