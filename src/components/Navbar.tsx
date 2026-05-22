"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClasses = (href: string) =>
    `text-[0.7rem] font-semibold uppercase tracking-widest transition-colors duration-200 ${
      pathname === href ? "text-white" : "text-slate-400 hover:text-white"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/95 shadow-lg shadow-black/30"
          : "bg-slate-950/50"
      } backdrop-blur-md`}
    >
      <div className="app-shell flex h-14 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-enov.png"
            alt="Enov CORP"
            width={38}
            height={38}
            className="rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-md shadow-fuchsia-500/10"
            priority
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.labels[language]}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={language === "fr" ? "Menu principal" : "Main menu"}
            aria-expanded={menuOpen}
            className="relative h-9 w-9 rounded-full border border-white/10 text-white transition hover:border-fuchsia-400 hover:text-fuchsia-200 md:hidden"
          >
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`grid transition-all duration-200 ease-out md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        aria-hidden={!menuOpen}
      >
        <div className="overflow-hidden">
          <div className="border-b border-white/10 bg-slate-950/98 px-4 py-3">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/5 ${
                    pathname === link.href ? "text-white" : "text-slate-400"
                  }`}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.labels[language]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
