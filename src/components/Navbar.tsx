"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { navigation } from "@/lib/site-content";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Navbar.module.css";

export function Navbar({ account }: { account?: ReactNode }) {
  const { language } = useLanguage(); const fr = language === "fr";
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = () => document.documentElement.style.setProperty("--enov-header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
    measure();
    if (typeof ResizeObserver === "undefined") { window.addEventListener("resize", measure); return () => window.removeEventListener("resize", measure); }
    const observer = new ResizeObserver(measure); observer.observe(header);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty("--enov-header-height"); };
  }, []);
  const pathname = usePathname(); const [open, setOpen] = useState(false);
  const current = (href: string) => href === "/expertises" ? ["/expertises", "/web-mobile", "/intelligence-artificielle", "/systemes-connectes", "/hydroponie"].includes(pathname) : pathname === href || href !== "/" && pathname.startsWith(href+"/");
  const link = (item: typeof navigation[number]) => <Link key={item.href} href={item.href} aria-current={current(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{item[language]}</Link>;
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); document.getElementById("site-menu-toggle")?.focus(); } }; document.addEventListener("keydown",close); return () => document.removeEventListener("keydown",close); },[open]);
  return <header ref={headerRef} className={styles.header}>
    <a className={styles.skip} href="#page-content">{fr ? "Aller au contenu" : "Skip to content"}</a>
    <div className={`app-shell ${styles.row}`}><Link href="/" className={styles.logo} aria-label={fr ? "ENOV CORP — Accueil" : "ENOV CORP — Home"}><Image src="/icon-enov.png" alt="" width={44} height={36} priority /><span><strong>ENOV</strong> CORP</span></Link>
      <nav className={styles.desktop} aria-label={fr ? "Navigation principale" : "Main navigation"}>{navigation.slice(1).map(link)}</nav>
      <div className={styles.tools}><div className={styles.account}>{account}</div><LanguageSwitcher /><button id="site-menu-toggle" className={styles.toggle} aria-expanded={open} aria-controls="site-menu" type="button" onClick={() => setOpen(!open)}>{open ? (fr ? "Fermer" : "Close") : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button></div>
    </div>
    <nav className={styles.quick} aria-label={fr ? "Accès rapide" : "Quick links"}>{navigation.filter(item => ["/expertises","/portfolio","/academy","/contact"].includes(item.href)).map(item => <Link key={item.href} href={item.href} aria-current={current(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{item.href === "/portfolio" ? (fr ? "Réalisations" : "Work") : item.href === "/academy" ? "Academy" : item[language]}</Link>)}</nav>
    {open && <div id="site-menu" className={styles.panel}><nav className="app-shell" aria-label={fr ? "Toutes les pages" : "All pages"}>{navigation.map(link)}{account ?? <Link href="/mon-espace" onClick={() => setOpen(false)}>{fr ? "Mon espace Academy" : "My Academy account"}</Link>}</nav></div>}
  </header>;
}
