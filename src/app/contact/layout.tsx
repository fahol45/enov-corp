import type { Metadata } from "next";
import { ogImage, siteName } from "@/lib/seo";

const title = "Contact";
const description =
  "Parlez-nous de votre projet. Enov CORP réunit solutions connectées, produits digitaux et formation pour des résultats concrets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title,
    description,
    url: "/contact",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
