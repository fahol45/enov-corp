import type { Metadata } from "next";
import { WebMobileView } from "./WebMobileView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Développement Web & Mobile";
const description =
  "Applications mobiles et sites web multi-secteurs : finance, e-commerce, opérations, service client, santé et logistique.";

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
