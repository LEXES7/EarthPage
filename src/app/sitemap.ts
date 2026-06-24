import type { MetadataRoute } from "next";
import { getAllPlants } from "@/lib/plants";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const plants = await getAllPlants();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/glossary`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const plantPages: MetadataRoute.Sitemap = plants.map((p) => ({
    url: `${SITE_URL}/plant/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: p.image ? [p.image] : undefined,
  }));

  return [...staticPages, ...plantPages];
}
