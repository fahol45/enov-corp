import type { Metadata } from "next";
import { AProposView } from "./AProposView";
import { ogImage, siteName } from "@/lib/seo";

const title = "À propos";
const description =
  "ENOV CORP : une équipe technique qui conçoit et livre des serres connectées, des apps web & mobile, et des formations — sans sous-traitance, un seul interlocuteur de A à Z.";

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
