import type { Metadata } from "next";
import { ogImage, siteName } from "@/lib/seo";

const title = "À propos";
const description =
  "Enov CORP aide les organisations à transformer leurs besoins en solutions utiles, via l'hydroponie connectée, le développement web & mobile et Enov Academy.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/propos",
  },
  openGraph: {
    title,
    description,
    url: "/propos",
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

export default function ProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
