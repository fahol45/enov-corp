"use client";

import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import styles from "./HomeSections.module.css";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  fr: {
    contact: "Nous contacter", academyLink: "Découvrir Academy", expertise: "Nos services", expertiseIntro: "Ce que nous faisons.",
    services: [
      { title: "Web & Mobile", short: "Sites, applications et logiciels.", heading: "Sites web et applications.", description: "Nous réalisons des sites, des boutiques en ligne et des outils de gestion. Nous assurons aussi leur mise en ligne.", tags: "Sites web · Applications mobiles · Plateformes métier", href: "/web-mobile", image: "/pc-portable.png", alt: "Exemple d’interface web ENOV CORP", link: "Nos solutions numériques" },
      { title: "Hydroponie & IoT", short: "Des cultures et des systèmes connectés.", heading: "Hydroponie et suivi des cultures.", description: "Nous équipons les installations de capteurs pour mesurer le pH, la température et l’humidité, et automatiser l’irrigation.", tags: "Hydroponie · Capteurs · Automatisation", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Installation hydroponique et suivi des cultures", link: "L’hydroponie connectée" },
    ],
    academyShort: "Formations web, data et IoT.", academyTitle: "Les formations ENOV Academy.", academyText: "Consultez les programmes, les niveaux requis, les tarifs et les dates des sessions.", catalogue: "Voir les formations", academyCaption: "ENOV ACADEMY / FORMATIONS PRATIQUES", about: "Comment se passe un projet ?", aboutText: "Nous précisons le besoin, réalisons le projet et vous montrons comment utiliser les outils livrés.", aboutLink: "À propos d’ENOV CORP", closing: "Vous avez un projet ?", closingText: "Écrivez-nous pour en discuter.",
  },
  en: {
    contact: "Contact us", academyLink: "Discover Academy", expertise: "Our services", expertiseIntro: "What we do.",
    services: [
      { title: "Web & Mobile", short: "Websites, apps and software.", heading: "Websites and applications.", description: "We develop websites, online stores and business software, and handle deployment.", tags: "Websites · Mobile applications · Business platforms", href: "/web-mobile", image: "/pc-portable.png", alt: "ENOV CORP web interface example", link: "Our digital solutions" },
      { title: "Hydroponics & IoT", short: "Connected crops and systems.", heading: "Hydroponics and crop monitoring.", description: "We install sensors to measure pH, temperature and humidity, and automate irrigation.", tags: "Hydroponics · Sensors · Automation", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Hydroponic installation and crop monitoring", link: "Connected hydroponics" },
    ],
    academyShort: "Web, data and IoT courses.", academyTitle: "ENOV Academy courses.", academyText: "Check programmes, entry requirements, fees and session dates.", catalogue: "View courses", academyCaption: "ENOV ACADEMY / PRACTICAL TRAINING", about: "How does a project work?", aboutText: "We define the requirements, build the project and show you how to use the delivered tools.", aboutLink: "About ENOV CORP", closing: "Have a project in mind?", closingText: "Contact us to discuss it.",
  },
};

export function HomeView() {
  const { language } = useLanguage();
  const t = content[language];
  const steps = language === "fr" ? [
    { title: "Comprendre", text: "Votre besoin, vos utilisateurs, vos contraintes." },
    { title: "Concevoir", text: "Une solution adaptée, un périmètre défini ensemble." },
    { title: "Accompagner", text: "La mise en service et la prise en main de vos outils." },
  ] : [
    { title: "Understand", text: "Your needs, your users and your constraints." },
    { title: "Design", text: "The right solution, with a scope defined together." },
    { title: "Support", text: "Launch and adoption of your new tools." },
  ];
  return (
    <main className={`welcome-page ${styles.root}`}>
      <HeroCarousel />
      <nav className={`app-shell ${styles.paths}`} aria-label={language === "fr" ? "Nos activités" : "Our services"}>
        {t.services.map((service, index) => <Link href={service.href} key={service.href}><span>0{index + 1}</span><div><strong>{service.title}</strong><p>{service.short}</p></div><span aria-hidden="true">&#8599;</span></Link>)}
        <Link href="/academy"><span>03</span><div><strong>ENOV Academy</strong><p>{t.academyShort}</p></div><span aria-hidden="true">&#8599;</span></Link>
      </nav>
      <section id="poles" className={`app-shell ${styles.expertise}`}>
        <div className={styles.sectionHeading}><div><p className="brand-eyebrow">01 / {t.expertise}</p><h2>{t.expertiseIntro}</h2></div><Link href="/portfolio" className={styles.textLink}>{language === "fr" ? "Voir les projets" : "View projects"}<span aria-hidden="true">&#8599;</span></Link></div>
        <div className={styles.serviceGrid}>{t.services.map((service, index) => <article className={styles.service} key={service.href}>
          <Link href={service.href} className={`${styles.serviceVisual} ${index === 0 ? styles.product : ""}`} aria-label={service.link}><Image src={service.image} alt={service.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /><span className={styles.imageLabel}>{service.title}</span><span className={styles.imageArrow} aria-hidden="true">&#8599;</span></Link>
          <div className={styles.serviceCopy}><p className="brand-eyebrow">0{index + 1} / {service.title}</p><h3>{service.heading}</h3><p>{service.description}</p><ul className={styles.tags}>{service.tags.split("·").map(tag => <li key={tag}>{tag.trim()}</li>)}</ul><Link href={service.href} className={styles.textLink}>{service.link}<span aria-hidden="true">&#8599;</span></Link></div>
        </article>)}</div>
      </section>
      <section className={styles.academy}><div className={`app-shell ${styles.academyInner}`}>
        <div className={styles.academyCopy}><p className="brand-eyebrow">02 / ENOV ACADEMY</p><h2>{t.academyTitle}</h2><p>{t.academyText}</p><ul className={styles.academyTopics}>{["Web & Mobile", "Data", "IoT & Robotique"].map(topic => <li key={topic}>{topic}</li>)}</ul><Link href="/academy" className={styles.primary}>{t.catalogue}<span aria-hidden="true">&#8599;</span></Link></div>
        <Link href="/academy" className={styles.academyVisual}><Image src="/Academy_images/IoT & Robotics Lab.webp" alt={language === "fr" ? "Technologies IoT et robotique" : "IoT and robotics technologies"} fill sizes="(max-width: 800px) 100vw, 45vw" /><span><Image src="/icon-enov.png" alt="" width={42} height={34} /><span>{t.academyCaption}</span><span aria-hidden="true">&#8599;</span></span></Link>
      </div></section>
      <section className={`app-shell ${styles.approach}`}><div className={styles.sectionHeading}><div><p className="brand-eyebrow">03 / {language === "fr" ? "NOTRE APPROCHE" : "OUR APPROACH"}</p><h2>{t.about}</h2></div><div className={styles.aboutCopy}><p>{t.aboutText}</p><Link href="/propos" className={styles.textLink}>{t.aboutLink}<span aria-hidden="true">&#8599;</span></Link></div></div><ol className={styles.steps}>{steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></section>
      <section className={`app-shell ${styles.contactSection}`}><div className={styles.contactPanel}><div><p className="brand-eyebrow">{language === "fr" ? "CONTACT / ENOV CORP" : "CONTACT / ENOV CORP"}</p><h2>{t.closing}</h2><p>{t.closingText}</p></div><div className={styles.contactActions}><Link href="/contact" className={styles.primary}>{t.contact}<span aria-hidden="true">&#8599;</span></Link><a href="mailto:contact@enovcorp.com">contact@enovcorp.com</a></div></div></section>
    </main>
  );
}
