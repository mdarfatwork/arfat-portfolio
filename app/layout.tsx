import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { Providers } from "@/components/providers/Providers";
import { profile } from "@/data/profile";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();
const title = `${profile.name} | Full Stack Developer Portfolio`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "SaaS Engineer",
    "AI Integrations",
    "Momin Mohammed Arfat",
    "Portfolio Website",
    "React Developer",
    "India",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: `${profile.shortName} Portfolio`,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": `${siteUrl}/llms-full.txt`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    title,
    description: profile.heroDescription,
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: `${profile.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.heroDescription,
    images: ["/icon.svg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  other: {
    "ai-catalog": `${siteUrl}/.well-known/ai-catalog.json`,
    "mcp-server-card": `${siteUrl}/.well-known/mcp/server-card.json`,
    "agent-skills": `${siteUrl}/.well-known/agent-skills/index.json`,
    "auth-md": `${siteUrl}/auth.md`,
    "llms-txt": `${siteUrl}/llms.txt`,
    "llms-full-txt": `${siteUrl}/llms-full.txt`,
    "api-catalog": `${siteUrl}/.well-known/api-catalog`,
    "oauth-protected-resource": `${siteUrl}/.well-known/oauth-protected-resource`,
    "openid-configuration": `${siteUrl}/.well-known/openid-configuration`,
    "oauth-authorization-server": `${siteUrl}/.well-known/oauth-authorization-server`,
    jwks: `${siteUrl}/.well-known/jwks.json`,
    "http-message-signatures-directory": `${siteUrl}/.well-known/http-message-signatures-directory`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
        <link
          rel="mcp-server-card"
          href="/.well-known/mcp/server-card.json"
        />
        <link
          rel="agent-skills"
          href="/.well-known/agent-skills/index.json"
        />
        <link
          rel="oauth-protected-resource"
          href="/.well-known/oauth-protected-resource"
        />
        <link
          rel="openid-configuration"
          href="/.well-known/openid-configuration"
        />
        <link
          rel="oauth-authorization-server"
          href="/.well-known/oauth-authorization-server"
        />
        <link rel="jwks" href="/.well-known/jwks.json" />
        <link
          rel="http-message-signatures-directory"
          href="/.well-known/http-message-signatures-directory"
        />
        <link rel="describedby" href="/auth.md" type="text/markdown" />
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <link rel="describedby" href="/llms-full.txt" type="text/markdown" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
        suppressHydrationWarning
      >
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
