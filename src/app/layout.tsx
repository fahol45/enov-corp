import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ENOV CORP | Hydroponie intelligente",
  description:
    "Plateforme ENOV CORP : IoT, Edge Computing et applications premium pour l'hydroponie autonome.",
  icons: {
    icon: "/icon-enov.png",
    shortcut: "/icon-enov.png",
    apple: "/icon-enov.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/icon-enov.png" />
        <link rel="apple-touch-icon" href="/icon-enov.png" />
        <link rel="shortcut icon" href="/icon-enov.png" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <div className="flex min-h-screen flex-col bg-slate-950 text-white">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
