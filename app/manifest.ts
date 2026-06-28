import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: `${profile.name} | Portfolio`,
    short_name: "MMA",
    description: profile.heroDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    lang: "en",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    id: siteUrl,
  };
}
