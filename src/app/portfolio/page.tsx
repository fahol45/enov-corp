import type { Metadata } from "next";
import { PortfolioView } from "./PortfolioView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Portfolio — Projets livrés";
const description =
  "Serres connectées, applications web & mobile, formations certifiantes : découvrez les projets concrètement réalisés par ENOV CORP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title,
    description,
    url: "/portfolio",
    images: [{ url: ogImage, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function PortfolioPage() {
  return <PortfolioView />;
}
