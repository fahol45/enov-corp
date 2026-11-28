"use client";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";
import styles from "./LanguageSwitcher.module.css";
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return <div className={styles.root}><label className="sr-only" htmlFor="language-picker">{language === "fr" ? "Choisir la langue" : "Choose language"}</label><select id="language-picker" value={language} onChange={event => setLanguage(event.target.value as SupportedLanguage)}><option value="fr">FR</option><option value="en">EN</option></select><span aria-hidden="true">⌄</span></div>;
}
