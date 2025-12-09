"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

const navLinks: {
  href: string;
  labels: Record<SupportedLanguage, string>;
}[] = [
  {
    href: "/chronologie",
    labels: {
      fr: "Chronologie",
      en: "Timeline",
    },
  },
  {
    href: "/hydroponie",
    labels: {
      fr: "Hydroponie x IoT",
      en: "Hydroponics x IoT",
    },
  },
  {
    href: "/web-mobile",
    labels: {
      fr: "D\u00e9veloppement Web & Mobile",
      en: "Web & Mobile Development",
    },
  },
  {
    href: "/propos",
    labels: {
      fr: "\u00c0 propos",
      en: "About",
    },
  },
  {
    href: "/contact",
    labels: {
      fr: "Contact",
      en: "Contact",
    },
  },
];

const menuLabel: Record<SupportedLanguage, string> = {
  fr: "Menu principal",
  en: "Main menu",
};

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();

  const linkClasses = (href: string) =>
    `transition-colors duration-200 ${
      pathname === href
        ? "text-fuchsia-300"
        : "text-slate-300 hover:text-fuchsia-300"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="app-shell flex h-16 items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-enov.png"
              alt="Logo ENOV CORP"
              width={72}
              height={72}
              className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-fuchsia-500/20"
              priority
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium uppercase md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses(link.href)}
              >
                {link.labels[language]}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuLabel[language]}
              aria-expanded={menuOpen}
              className="group relative h-10 w-10 rounded-full border border-white/10 text-white shadow-lg shadow-fuchsia-500/5 transition hover:border-fuchsia-400 hover:text-fuchsia-200 md:hidden"
            >
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                <span
                  className={`h-0.5 w-6 bg-current transition ${
                    menuOpen ? "translate-y-1 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-current transition ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-current transition ${
                    menuOpen ? "-translate-y-1 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur md:hidden">
          <div className="flex flex-col gap-4 text-base font-medium text-slate-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-2 py-2 transition hover:bg-white/5 ${
                  pathname === link.href
                    ? "text-fuchsia-300"
                    : "text-slate-200"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.labels[language]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
