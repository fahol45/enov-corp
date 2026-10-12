import type { Metadata } from "next";
import { PortfolioView } from "./PortfolioView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Portfolio — Projets et solutions";
const description = "Explorez les projets publiés par ENOV CORP et des exemples de solutions numériques, agricoles et pédagogiques.";

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
