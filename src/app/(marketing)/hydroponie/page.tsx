import type { Metadata } from "next";
import { HydroponieView } from "./HydroponieView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Hydroponie & IoT — Agriculture connectée";
const description = "Hydroponie, capteurs, automatisation et suivi des cultures : des installations connectées adaptées à votre terrain.";

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
