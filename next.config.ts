import type { NextConfig } from "next";

const linkHeaders = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/http-message-signatures-directory>; rel="http-message-signatures-directory"',
  '</llms.txt>; rel="describedby"; type="text/markdown"',
  '</llms-full.txt>; rel="describedby"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|favicon.ico|icon.svg).*)",
        headers: [
          {
            key: "Vary",
            value: "Accept",
          },
          {
            key: "Link",
            value: linkHeaders,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

