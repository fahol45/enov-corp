"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SupportedLanguage = "fr" | "en";

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "enov:language";

const isBrowser = typeof window !== "undefined";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("fr");

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const storedValue = window.localStorage.getItem(
      STORAGE_KEY,
    ) as SupportedLanguage | null;
    if (storedValue === "fr" || storedValue === "en") {
      setLanguageState(storedValue);
    } else {
      const fallback = window.navigator.language.startsWith("fr")
        ? "fr"
        : "en";
      setLanguageState(fallback);
    }
  }, []);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (isBrowser) {
      window.localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
