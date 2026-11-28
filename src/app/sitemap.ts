import type { MetadataRoute } from "next";
import { getPortfolio } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/seo";
import { fetchAcademyTrainings } from "@/lib/academy-data";

const routes = [
  { path: "/", priority: 1 },
  { path: "/expertises", priority: 0.9 },
  { path: "/intelligence-artificielle", priority: 0.9 },
  { path: "/systemes-connectes", priority: 0.9 },
  { path: "/innovation", priority: 0.8 },
  { path: "/hydroponie", priority: 0.7 },
  { path: "/web-mobile", priority: 0.9 },
  { path: "/academy", priority: 0.9 },
  { path: "/portfolio", priority: 0.8 },
  { path: "/propos", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
    "monthly";

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absoluteUrl(route.path),
    changeFrequency,
    priority: route.priority,
  }));

  const trainings = await fetchAcademyTrainings();
  const academyEntries: MetadataRoute.Sitemap = trainings.map((training) => ({
    url: absoluteUrl(`/academy/${training.slug}`),
    changeFrequency,
    priority: 0.7,
  }));

  const { items } = await getPortfolio();
  const portfolioEntries: MetadataRoute.Sitemap = items.map(item => ({url:absoluteUrl(`/portfolio/${item.id}`),changeFrequency,priority:0.6}));
  return [...staticEntries, ...academyEntries, ...portfolioEntries];
}
