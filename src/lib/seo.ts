const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl =
  rawSiteUrl && rawSiteUrl.length > 0
    ? rawSiteUrl.replace(/\/+$/, "")
    : "https://www.enovcorp.com";

export const siteName = "ENOV CORP";
export const defaultTitle = "ENOV CORP | Serres connectées, apps et formations";
export const defaultDescription =
  "ENOV CORP conçoit et livre des serres hydroponiques connectées, des applications web & mobile, et des formations certifiantes. Un seul interlocuteur, pas de sous-traitance.";
export const ogImage = "/logo-enov.png";

export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") {
    return siteUrl;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};
