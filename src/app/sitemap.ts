import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { trainings } from "@/lib/trainings";

const routes = [
  { path: "/", priority: 1 },
  { path: "/hydroponie", priority: 0.9 },
  { path: "/web-mobile", priority: 0.9 },
  { path: "/academy", priority: 0.9 },
  { path: "/propos", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries = routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  const academyEntries = trainings.map((training) => ({
    url: absoluteUrl(`/academy/${training.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...academyEntries];
}
