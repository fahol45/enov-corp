import type { Metadata } from "next";
import { HydroponieView } from "./HydroponieView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Hydroponie x IoT & Edge";
const description =
  "Hydroponie intelligente augmentée par l'IoT et l'edge computing pour booster la production et économiser l'eau avec ENOV CORP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/hydroponie",
  },
  openGraph: {
    title,
    description,
    url: "/hydroponie",
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

export default function HydroponiePage() {
  return <HydroponieView />;
}
