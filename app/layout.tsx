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
    "llms-txt": `${siteUrl}/llms.txt`,
    "llms-full-txt": `${siteUrl}/llms-full.txt`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
