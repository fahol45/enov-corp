"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

const copy = {
  fr: { tagline: "Des idées aux solutions concrètes.", description: "Solutions numériques, agriculture connectée et formation.", expertise: "Expertises", company: "ENOV CORP", contact: "Contact", rights: "Tous droits réservés.", top: "Retour en haut", links: ["Hydroponie & IoT", "Web & Mobile", "ENOV Academy", "Nos réalisations", "À propos", "Contact"], social: "Retrouvez-nous" },
  en: { tagline: "From ideas to practical solutions.", description: "Digital solutions, connected agriculture and training.", expertise: "Expertise", company: "ENOV CORP", contact: "Contact", rights: "All rights reserved.", top: "Back to top", links: ["Hydroponics & IoT", "Web & Mobile", "ENOV Academy", "Our work", "About", "Contact"], social: "Follow us" },
};
const destinations = ["/hydroponie", "/web-mobile", "/academy", "/portfolio", "/propos", "/contact"];
const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/enovcorp/" },
  { label: "Instagram", href: "https://www.instagram.com/enovcorp/" },
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61590093913760" },
];
export function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <footer className={styles.root}>
      <div className={`app-shell ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}><Link href="/" className={styles.logo}><Image src="/icon-enov.png" alt="" width={52} height={43} /><span><strong>ENOV</strong> CORP</span></Link><p className={styles.tagline}>{t.tagline}</p><p>{t.description}</p></div>
          <nav aria-label={t.expertise}><h2>{t.expertise}</h2><ul>{destinations.slice(0, 3).map((href, index) => <li key={href}><Link href={href}>{t.links[index]}</Link></li>)}</ul></nav>
          <nav aria-label={t.company}><h2>{t.company}</h2><ul>{destinations.slice(3).map((href, index) => <li key={href}><Link href={href}>{t.links[index + 3]}</Link></li>)}<li><Link href="/mon-espace">{language === "fr" ? "Mon espace" : "My account"}</Link></li></ul></nav>
          <div className={styles.contact}><h2>{t.contact}</h2><a href="mailto:contact@enovcorp.com">contact@enovcorp.com <span aria-hidden="true">↗</span></a><a href="tel:+212645410864">+212 6 45 41 08 64</a><p className={styles.socialLabel}>{t.social}</p><div className={styles.social}>{socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}</div></div>
        </div>
        <div className={styles.bottom}><p>© {new Date().getFullYear()} ENOV CORP. {t.rights}</p><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>{t.top}<span aria-hidden="true">↑</span></button></div>
      </div>
    </footer>
  );
}
