import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { fetchAcademyTrainings } from "@/lib/academy-data";

const routes = [
  { path: "/", priority: 1 },
  { path: "/hydroponie", priority: 0.9 },
  { path: "/web-mobile", priority: 0.9 },
  { path: "/academy", priority: 0.9 },
  { path: "/propos", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
    "monthly";

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency,
    priority: route.priority,
  }));

  const trainings = await fetchAcademyTrainings();
  const academyEntries: MetadataRoute.Sitemap = trainings.map((training) => ({
    url: absoluteUrl(`/academy/${training.slug}`),
    lastModified,
    changeFrequency,
    priority: 0.7,
  }));

  return [...staticEntries, ...academyEntries];
}
