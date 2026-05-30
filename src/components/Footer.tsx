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
      <div className="app-shell py-8">
        <div className="flex flex-wrap items-start justify-between gap-8">

          {/* Brand */}
          <div className="space-y-2">
            <Link href="/" className="inline-block">
              <span className="text-lg font-black tracking-tight text-white">ENOV<span className="text-fuchsia-400">.</span></span>
            </Link>
            <p className="text-xs text-slate-500">{t.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-10">
            {/* Navigation */}
            <div className="space-y-3">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-slate-600">Pages</p>
              <ul className="space-y-2">
                {t.nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-xs text-slate-400 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-slate-600">{t.contactTitle}</p>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contact@enovcorp.com" className="text-xs text-slate-400 transition hover:text-white">
                    contact@enovcorp.com
                  </a>
                </li>
                <li>
                  <a href="tel:+212645410864" className="text-xs text-slate-400 transition hover:text-white">
                    +212 6 45 41 08 64
                  </a>
                </li>
              </ul>
            </div>

            {/* Réseaux sociaux */}
            <div className="space-y-3">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-slate-600">Suivez-nous</p>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.linkedin.com/company/enovcorp/" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 transition hover:text-white">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/enovcorp/" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 transition hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://web.facebook.com/profile.php?id=61590093913760" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 transition hover:text-white">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-white/5 pt-5 text-xs text-slate-600">
          &copy; {year} ENOV CORP — {t.rights}
        </p>
      </div>
    </footer>
  );
}
