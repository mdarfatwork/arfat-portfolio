export const siteConfig = {
  name: "Momin Mohammed Arfat",
  shortName: "Arfat",
  title: "Full Stack Developer Portfolio",
  description:
    "Full-Stack SaaS Engineer specializing in Next.js, TypeScript, AI integrations, PostgreSQL, and modern web application development.",
  locale: "en_US",
  twitterHandle: undefined as string | undefined,
} as const;

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "https://mohammedarfat.vercel.app";

  if (url.startsWith("http")) return url.replace(/\/$/, "");
  return `https://${url.replace(/\/$/, "")}`;
}
