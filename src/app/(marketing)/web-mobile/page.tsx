import type { Metadata } from "next";
import { WebMobileView } from "./WebMobileView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Web & Mobile — Solutions numériques";
const description = "Sites web, applications mobiles, plateformes métier et intégration IA : des outils numériques adaptés à votre activité.";

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
