import type { Metadata } from "next";
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl =
  rawSiteUrl && rawSiteUrl.length > 0
    ? rawSiteUrl.replace(/\/+$/, "")
    : "https://www.enovcorp.com";

export const siteName = "ENOV CORP";
export const defaultTitle = "ENOV CORP | Ingénierie logicielle, IA & systèmes connectés";
export const defaultDescription = "Ingénierie logicielle, intégration de l’intelligence artificielle et systèmes connectés. ENOV CORP accompagne les organisations de la conception à la mise en service.";
export const ogImage = "/icon-enov.png";

export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") {
    return siteUrl;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, siteName, images: [{ url: ogImage, alt: siteName }] }, twitter: { card: "summary_large_image", title, description, images: [ogImage] } };
}
