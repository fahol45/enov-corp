"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

const navLinks: { href: string; labels: Record<SupportedLanguage, string> }[] = [
  { href: "/hydroponie", labels: { fr: "Hydroponie", en: "Hydroponics" } },
  { href: "/web-mobile", labels: { fr: "Web & Mobile", en: "Web & Mobile" } },
  { href: "/academy", labels: { fr: "Academy", en: "Academy" } },
  { href: "/portfolio", labels: { fr: "Portfolio", en: "Portfolio" } },
  { href: "/propos", labels: { fr: "À propos", en: "About" } },
  { href: "/contact", labels: { fr: "Contact", en: "Contact" } },
];

export function Navbar() {
  const pathname = usePathname();
  const mobileNav = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = mobileNav.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (nav) nav.scrollLeft = active ? Math.max(0, active.offsetLeft - nav.offsetLeft - 20) : 0;
  }, [pathname]);
  const { language } = useLanguage();
  const links = navLinks.map((link) => {
    const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
    return (
      <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className="site-nav-link">
        {link.labels[language]}
      </Link>
    );
  });

  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="app-shell site-header-row">
        <Link href="/" className="brand-logo flex shrink-0 items-center gap-2">
          <Image src="/icon-enov.png" alt="Enov CORP" width={48} height={40} className="object-contain" priority />
          <span><strong>ENOV</strong> CORP</span>
        </Link>
        <nav className="site-desktop-nav" aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}>{links}</nav>
        <div className="site-header-tools">
          <Link href="/mon-espace" className="site-account-link">{language === "fr" ? "Mon espace" : "My account"}</Link>
          <LanguageSwitcher />
        </div>
      </div>
      <nav ref={mobileNav} className="site-small-nav app-shell" aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}>{links}</nav>
    </header>
  );
}
