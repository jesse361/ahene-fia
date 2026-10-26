import type { MetadataRoute } from "next";

import { speakers } from "@/data/speakers";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/speakers", "/schedule", "/tickets", "/contact", "/about", "/privacy", "/terms"];
  const lastModified = new Date("2026-10-26T00:00:00Z");
  return [
    ...paths.map((path) => ({
      url: `${siteConfig.url}${path || "/"}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...speakers.map((speaker) => ({
      url: `${siteConfig.url}/speakers/${speaker.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
