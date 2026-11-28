import type { Metadata } from "next";
import { WebMobileView } from "./WebMobileView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Ingénierie logicielle — Web, mobile & plateformes";
const description = "Applications web et mobiles, plateformes SaaS, logiciels métier et intégrations API. Conception, développement et mise en service par ENOV CORP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/web-mobile",
  },
  openGraph: {
    title,
    description,
    url: "/web-mobile",
    images: [
      {
        url: ogImage,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function WebMobilePage() {
  return <WebMobileView />;
}
