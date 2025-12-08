"use client";

import { useLanguage } from "@/context/LanguageContext";

const footerCopy = {
  fr: {
    rights: "Tous droits r\u00e9serv\u00e9s.",
    subtitle: "Hydroponie + IoT & Edge pour des serres autonomes.",
  },
  en: {
    rights: "All rights reserved.",
    subtitle: "Hydroponics + IoT & Edge for autonomous greenhouses.",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();
  const copy = footerCopy[language];

  return (
    <footer className="border-t border-white/5 py-8 text-center text-xs uppercase tracking-[0.3em] text-slate-500">
      <div className="app-shell">
        <p>
          &copy; {year} ENOV CORP - {copy.rights}
        </p>
        <p className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-slate-600">
          {copy.subtitle}
        </p>
      </div>
    </footer>
  );
}
