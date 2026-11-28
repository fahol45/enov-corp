import type { Metadata } from "next";
import { AProposView } from "./AProposView";
import { ogImage, siteName } from "@/lib/seo";

const title = "À propos";
const description =
  "ENOV CORP : ingénierie logicielle, intelligence artificielle, systèmes connectés et recherche appliquée. Notre mission et notre méthode de travail.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/propos" },
  openGraph: {
    title,
    description,
    url: "/propos",
    images: [{ url: ogImage, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function AProposPage() {
  return <AProposView />;
}
