"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  fr: {
    label: "TECHNOLOGIE · AGRICULTURE · FORMATION",
    title: "Des idées aux", highlight: "solutions concrètes.",
    intro: "ENOV CORP conçoit des solutions numériques et des systèmes agricoles connectés, et accompagne vos équipes dans leur prise en main.",
    contact: "Parlons de votre projet", projects: "Voir nos réalisations", activities: "Nos activités", servicesIntro: "Trois expertises, un même engagement : répondre à vos besoins sur le terrain.",
    services: [
      { title: "Hydroponie & IoT", text: "Des serres connectées pour suivre vos cultures, automatiser l’irrigation et mieux gérer vos ressources.", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Hydroponie et cultures connectées" },
      { title: "Web & Mobile", text: "Des sites et applications sur mesure, conçus pour vos utilisateurs et les besoins de votre activité.", href: "/web-mobile", image: "/Academy_images/Web Fullstack.jpg", alt: "Développement web" },
      { title: "ENOV Academy", text: "Des formations pratiques en développement, data et systèmes connectés, pour apprendre en réalisant.", href: "/academy", image: "/Academy_images/IoT & Robotics Lab.webp", alt: "Formation en systèmes connectés" },
    ],
    more: "Découvrir", approach: "Un accompagnement de bout en bout.", approachText: "Nous prenons le temps de comprendre votre besoin, définissons une solution adaptée et vous accompagnons de la conception à la mise en service.", about: "À propos d’ENOV CORP", cta: "Un projet en tête ?", ctaText: "Échangeons sur vos besoins et les prochaines étapes.",
  },
  en: {
    label: "TECHNOLOGY · AGRICULTURE · TRAINING",
    title: "From ideas to", highlight: "practical solutions.",
    intro: "ENOV CORP builds digital solutions and connected agricultural systems, and helps your teams put them to work.",
    contact: "Let’s discuss your project", projects: "Explore our work", activities: "What we do", servicesIntro: "Three areas of expertise, one commitment: meeting your needs in the field.",
    services: [
      { title: "Hydroponics & IoT", text: "Connected greenhouses to monitor crops, automate irrigation and manage resources more efficiently.", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Hydroponics and connected crops" },
      { title: "Web & Mobile", text: "Custom websites and applications designed around your users and your business needs.", href: "/web-mobile", image: "/Academy_images/Web Fullstack.jpg", alt: "Web development" },
      { title: "ENOV Academy", text: "Hands-on training in development, data and connected systems. Learn by building.", href: "/academy", image: "/Academy_images/IoT & Robotics Lab.webp", alt: "Connected systems training" },
    ],
    more: "Explore", approach: "Support from start to finish.", approachText: "We take the time to understand your needs, define the right solution and support you from design through launch.", about: "About ENOV CORP", cta: "Have a project in mind?", ctaText: "Let’s talk about your needs and the next steps.",
  },
};

export function HomeView() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <main className="home-redesign">
      <section className="home-hero app-shell">
        <div className="home-hero-copy">
          <p className="brand-eyebrow">{t.label}</p>
          <h1>{t.title}<br /><span>{t.highlight}</span></h1>
          <p className="home-intro">{t.intro}</p>
          <div className="home-actions">
            <Link href="/contact" className="brand-button">{t.contact} <span aria-hidden="true">↗</span></Link>
            <Link href="/portfolio" className="brand-text-link">{t.projects} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="home-hero-photo">
          <Image src="/Academy_images/Hydroponie intelligente & data.jpg" alt={t.services[0].alt} fill priority sizes="(max-width: 800px) 100vw, 45vw" />
          <div className="home-photo-caption"><span>ENOV CORP</span><span>{t.services[0].title}</span></div>
        </div>
      </section>
      <section id="poles" className="home-services app-shell">
        <div className="home-section-heading"><h2>{t.activities}</h2><p>{t.servicesIntro}</p></div>
        <div className="home-service-grid">
          {t.services.map((service, index) => (
            <Link href={service.href} key={service.href} className="home-service">
              <div className="home-service-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 800px) 100vw, 33vw" /></div>
              <p className="home-service-number">0{index + 1}</p>
              <h3>{service.title}</h3><p>{service.text}</p>
              <span className="brand-text-link">{t.more} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-approach"><div className="app-shell home-approach-inner"><h2>{t.approach}</h2><div><p>{t.approachText}</p><Link href="/propos" className="brand-text-link">{t.about} <span aria-hidden="true">→</span></Link></div></div></section>
      <section className="app-shell home-contact"><div><h2>{t.cta}</h2><p>{t.ctaText}</p></div><Link href="/contact" className="brand-button">{t.contact} <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
