const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl =
  rawSiteUrl && rawSiteUrl.length > 0
    ? rawSiteUrl.replace(/\/+$/, "")
    : "http://localhost:3000";

export const siteName = "ENOV CORP";
export const defaultTitle = "ENOV CORP | Hydroponie intelligente";
export const defaultDescription =
  "Plateforme ENOV CORP : IoT, Edge Computing et applications premium pour l'hydroponie autonome.";
export const ogImage = "/logo-enov.png";

export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") {
    return siteUrl;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};
