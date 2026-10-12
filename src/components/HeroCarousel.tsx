"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./HeroCarousel.module.css";

const slides = {
  fr: [
    { category: "WEB & MOBILE", title: "Votre prochaine", highlight: "avancée numérique.", description: "Sites web, applications et plateformes métier. Des solutions conçues pour vos utilisateurs et votre activité.", action: "Explorer nos solutions", href: "/web-mobile", image: "/pc-portable.png", alt: "Interface numérique ENOV CORP", kind: "product", tag: "CONCEPTION / DÉVELOPPEMENT / INTÉGRATION" },
    { category: "HYDROPONIE & IOT", title: "Le terrain connecté.", highlight: "Les décisions éclairées.", description: "Capteurs, irrigation et suivi des cultures. Connectez votre installation aux données qui comptent.", action: "Découvrir l’hydroponie", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Cultures hydroponiques et suivi connecté", kind: "photo", tag: "CAPTEURS / AUTOMATISATION / PILOTAGE" },
    { category: "ENOV ACADEMY", title: "Apprenez aujourd’hui.", highlight: "Construisez demain.", description: "Développement, data et systèmes connectés. Passez de la théorie à la pratique avec ENOV Academy.", action: "Explorer les formations", href: "/academy", image: "/Academy_images/IoT & Robotics Lab.webp", alt: "Technologies IoT et robotique", kind: "photo", tag: "DÉVELOPPEMENT / DATA / SYSTÈMES CONNECTÉS" },
  ],
  en: [
    { category: "WEB & MOBILE", title: "Your next", highlight: "digital breakthrough.", description: "Websites, apps and business platforms. Solutions designed around your users and your business.", action: "Explore our solutions", href: "/web-mobile", image: "/pc-portable.png", alt: "ENOV CORP digital interface", kind: "product", tag: "DESIGN / DEVELOPMENT / INTEGRATION" },
    { category: "HYDROPONICS & IOT", title: "Connected fields.", highlight: "Informed decisions.", description: "Sensors, irrigation and crop monitoring. Connect your installation to the data that matters.", action: "Explore hydroponics", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Hydroponic crops and connected monitoring", kind: "photo", tag: "SENSORS / AUTOMATION / MONITORING" },
    { category: "ENOV ACADEMY", title: "Learn today.", highlight: "Build tomorrow.", description: "Development, data and connected systems. Put knowledge into practice with ENOV Academy.", action: "Explore the courses", href: "/academy", image: "/Academy_images/IoT & Robotics Lab.webp", alt: "IoT and robotics technologies", kind: "photo", tag: "DEVELOPMENT / DATA / CONNECTED SYSTEMS" },
  ],
};
const DURATION = 7000;

export function HeroCarousel() {
  const { language } = useLanguage();
  const items = slides[language];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const touchStart = useRef<number | null>(null);
  const active = items[index];
  const running = !paused && !hovered && !focused && !hidden && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(preference.matches);
    const syncVisibility = () => setHidden(document.hidden);
    syncMotion(); syncVisibility();
    preference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => { preference.removeEventListener("change", syncMotion); document.removeEventListener("visibilitychange", syncVisibility); };
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % items.length), DURATION);
    return () => window.clearTimeout(timer);
  }, [index, running, items.length]);

  function choose(next: number) { setIndex((next + items.length) % items.length); setPaused(true); }
  return (
    <section className={styles.root} aria-label={language === "fr" ? "Découvrez ENOV CORP" : "Discover ENOV CORP"} aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); choose(index + 1); } if (event.key === "ArrowLeft") { event.preventDefault(); choose(index - 1); } }}
      onPointerDown={event => { if (event.pointerType === "touch") touchStart.current = event.clientX; }}
      onPointerCancel={() => { touchStart.current = null; }}
      onPointerUp={event => { if (event.pointerType === "touch" && touchStart.current !== null) { const delta = event.clientX - touchStart.current; if (Math.abs(delta) > 60) choose(index + (delta < 0 ? 1 : -1)); touchStart.current = null; } }}>
      <div className={styles.frame}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.visual} aria-hidden="true">
          {items.map((item, i) => <div key={item.href} className={`${styles.imageLayer} ${i === index ? styles.visible : ""} ${item.kind === "product" ? styles.product : ""}`}><Image src={item.image} alt="" fill priority={i === 0} sizes="(max-width: 700px) 100vw, 70vw" /></div>)}
        </div>
        <div className={styles.veil} aria-hidden="true" />
        <div className={styles.topline}><span>ENOV CORP</span><span>{language === "fr" ? "DES IDÉES AUX SOLUTIONS CONCRÈTES" : "FROM IDEAS TO PRACTICAL SOLUTIONS"}</span></div>
        <div className={styles.content} role="group" aria-roledescription="slide" aria-label={`${index + 1} / ${items.length}`} aria-live={running ? "off" : "polite"}>
          <p className={styles.eyebrow}><span aria-hidden="true" />{active.category}</p>
          <h1 className={styles.title}>{active.title}<br /><span>{active.highlight}</span></h1>
          <p className={styles.description}>{active.description}</p>
          <div className={styles.actions}><Link href={active.href} className={styles.primary}>{active.action}<span aria-hidden="true">↗</span></Link><Link href="/contact" className={styles.secondary}>{language === "fr" ? "Parlons de votre projet" : "Let’s discuss your project"}<span aria-hidden="true">→</span></Link></div>
        </div>
        <div className={styles.visualLabel} aria-hidden="true"><span className={styles.cross}>+</span><span>{active.tag}</span><span>0{index + 1}</span></div>
        <div className={styles.controls}>
          <div className={styles.selectors}>{items.map((item, i) => <button key={item.href} type="button" onClick={() => choose(i)} aria-pressed={i === index} className={i === index ? styles.selected : ""}><span className={styles.number}>0{i + 1}</span><span>{item.category}</span><span className={styles.track} aria-hidden="true"><span key={`${index}-${running}`} className={i === index && running ? styles.progress : ""} /></span></button>)}</div>
          <div className={styles.arrows}><button type="button" onClick={() => choose(index - 1)} aria-label={language === "fr" ? "Diapositive précédente" : "Previous slide"}>←</button><button type="button" onClick={() => { setPaused(p => !p); setFocused(false); }} aria-label={paused || reducedMotion ? (language === "fr" ? "Reprendre le défilement" : "Resume slideshow") : (language === "fr" ? "Mettre en pause" : "Pause slideshow")} disabled={reducedMotion}>{paused || reducedMotion ? "▶" : "Ⅱ"}</button><button type="button" onClick={() => choose(index + 1)} aria-label={language === "fr" ? "Diapositive suivante" : "Next slide"}>→</button></div>
        </div>
      </div>
    </section>
  );
}
