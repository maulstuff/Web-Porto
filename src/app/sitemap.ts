import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];

  const lastModified = new Date();
  const projectSlugs = ["raven-claw", "willow-studio", "maison-laiv", "mystic-meadows", "synclab"];

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/case-study`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projectSlugs.map((slug) => ({ url: `${siteUrl}/projects/${slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
