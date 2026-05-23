"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  fr: {
    tagline: "Hydroponie connectée, apps sur mesure, formations tech.",
    nav: [
      { label: "Hydroponie & IoT", href: "/hydroponie" },
      { label: "Web & Mobile", href: "/web-mobile" },
      { label: "Academy", href: "/academy" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "À propos", href: "/propos" },
      { label: "Contact", href: "/contact" },
    ],
    contactTitle: "Contact",
    rights: "Tous droits réservés.",
  },
  en: {
    tagline: "Connected hydroponics, custom apps, tech training.",
    nav: [
      { label: "Hydroponics & IoT", href: "/hydroponie" },
      { label: "Web & Mobile", href: "/web-mobile" },
      { label: "Academy", href: "/academy" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/propos" },
      { label: "Contact", href: "/contact" },
    ],
    contactTitle: "Contact",
    rights: "All rights reserved.",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="app-shell py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-black tracking-tight text-white">ENOV<span className="text-fuchsia-400">.</span></span>
            </Link>
            <p className="max-w-[220px] text-sm leading-relaxed text-slate-500">{t.tagline}</p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-600">Pages</p>
            <ul className="space-y-2.5">
              {t.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-600">{t.contactTitle}</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:enovcorporation@gmail.com" className="text-sm text-slate-400 transition hover:text-white">
                  enovcorporation@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+212645410864" className="text-sm text-slate-400 transition hover:text-white">
                  +212 6 45 41 08 64
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start gap-2 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            &copy; {year} ENOV CORP — {t.rights}
          </p>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-700">
            Abidjan, Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
