import type { Metadata } from "next";
import { ContactView } from "./ContactView";
import { ogImage, siteName } from "@/lib/seo";

const title = "Contact";
const description =
  "Contactez ENOV CORP pour votre projet de serre connectée, d'application web & mobile, ou de formation. Réponse garantie en 24h.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title,
    description,
    url: "/contact",
    images: [{ url: ogImage, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
