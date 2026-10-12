const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl =
  rawSiteUrl && rawSiteUrl.length > 0
    ? rawSiteUrl.replace(/\/+$/, "")
    : "https://www.enovcorp.com";

export const siteName = "ENOV CORP";
export const defaultTitle = "ENOV CORP | Solutions numériques, IoT et formations";
export const defaultDescription = "ENOV CORP conçoit des solutions numériques et des installations agricoles connectées, et accompagne vos équipes avec ENOV Academy.";
export const ogImage = "/icon-enov.png";

export const absoluteUrl = (path = "/") => {
  if (!path || path === "/") {
    return siteUrl;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};
