"use client";

import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

const languages: SupportedLanguage[] = ["fr", "en"];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const labelByLanguage: Record<SupportedLanguage, string> = {
    fr: "Choisir la langue",
    en: "Choose language",
  };

  const optionLabels: Record<SupportedLanguage, string> = {
    fr: "FR",
    en: "EN",
  };

  return (
    <div className="relative">
      <label htmlFor="language-picker" className="sr-only">
        {labelByLanguage[language]}
      </label>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-50 shadow-lg shadow-fuchsia-500/10">
        <span className="text-slate-400">
          {language === "fr" ? "Langue" : "Language"}
        </span>
        <select
          id="language-picker"
          value={language}
          onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
          className="bg-transparent text-white outline-none"
        >
          {languages.map((code) => {
            const label = optionLabels[code];
            return (
              <option key={code} value={code} className="bg-slate-900 text-white">
                {label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
