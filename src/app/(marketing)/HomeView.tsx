"use client";

import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import styles from "./HomeSections.module.css";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  fr: {
    eyebrow: "ENOV CORP · TECHNOLOGIE & FORMATION",
    title: "Des idées aux", highlight: "solutions concrètes.",
    intro: "Nous concevons vos applications, connectons vos systèmes agricoles et formons vos équipes aux technologies qui font avancer votre activité.",
    contact: "Parlons de votre projet", academyLink: "Découvrir Academy", expertise: "Nos expertises", expertiseIntro: "Des solutions pensées pour votre activité.",
    services: [
      { title: "Web & Mobile", short: "Des outils adaptés à votre métier.", heading: "Votre activité mérite les bons outils.", description: "Site web, application mobile ou plateforme métier : nous concevons une expérience adaptée à vos utilisateurs, de la première idée à la mise en ligne.", tags: "Sites web · Applications mobiles · Plateformes métier", href: "/web-mobile", image: "/pc-portable.png", alt: "Exemple d’interface web ENOV CORP", link: "Nos solutions numériques" },
      { title: "Hydroponie & IoT", short: "Des cultures et des systèmes connectés.", heading: "Connecter le terrain à vos décisions.", description: "Capteurs, automatisation et suivi des cultures : nous réunissons les outils nécessaires pour piloter votre installation et suivre les données utiles au quotidien.", tags: "Hydroponie · Capteurs · Automatisation", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Installation hydroponique et suivi des cultures", link: "L’hydroponie connectée" },
    ],
    academyShort: "Apprendre. Pratiquer. Progresser.", academyTitle: "La technologie s’apprend en la pratiquant.", academyText: "Développement web, data, design et systèmes connectés. Explorez les programmes d’ENOV Academy et trouvez le parcours adapté à votre niveau.", catalogue: "Explorer les formations", academyCaption: "ENOV ACADEMY / FORMATIONS PRATIQUES", about: "Une équipe, de la conception à la mise en service.", aboutText: "Nous partons de votre besoin, définissons une solution adaptée et vous accompagnons dans sa réalisation et sa prise en main.", aboutLink: "Rencontrer ENOV CORP", closing: "Votre prochain projet commence ici.", closingText: "Présentez-nous votre besoin. Définissons ensemble la prochaine étape.",
  },
  en: {
    eyebrow: "ENOV CORP · TECHNOLOGY & TRAINING",
    title: "From ideas to", highlight: "practical solutions.",
    intro: "We build your applications, connect your agricultural systems and train your teams in the technologies that move your business forward.",
    contact: "Let’s discuss your project", academyLink: "Discover Academy", expertise: "Our expertise", expertiseIntro: "Solutions designed around your business.",
    services: [
      { title: "Web & Mobile", short: "Tools built around your business.", heading: "Your business deserves the right tools.", description: "Websites, mobile applications and business platforms: we design an experience around your users, from the first idea through launch.", tags: "Websites · Mobile applications · Business platforms", href: "/web-mobile", image: "/pc-portable.png", alt: "ENOV CORP web interface example", link: "Our digital solutions" },
      { title: "Hydroponics & IoT", short: "Connected crops and systems.", heading: "Connect the field to your decisions.", description: "Sensors, automation and crop monitoring: we bring together the tools to manage your installation and follow the data that matters day to day.", tags: "Hydroponics · Sensors · Automation", href: "/hydroponie", image: "/Academy_images/Hydroponie intelligente & data.jpg", alt: "Hydroponic installation and crop monitoring", link: "Connected hydroponics" },
    ],
    academyShort: "Learn. Practice. Progress.", academyTitle: "Learn technology by putting it to work.", academyText: "Web development, data, design and connected systems. Explore ENOV Academy programmes and find the right path for your level.", catalogue: "Explore the courses", academyCaption: "ENOV ACADEMY / PRACTICAL TRAINING", about: "One team, from design through launch.", aboutText: "We start with your needs, define the right solution and support you through delivery and adoption.", aboutLink: "Meet ENOV CORP", closing: "Your next project starts here.", closingText: "Tell us what you need. Let’s define the next step together.",
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
        <div className={styles.sectionHeading}><div><p className="brand-eyebrow">01 / {t.expertise}</p><h2>{t.expertiseIntro}</h2></div><Link href="/portfolio" className={styles.textLink}>{language === "fr" ? "Explorer nos réalisations" : "Explore our work"}<span aria-hidden="true">&#8599;</span></Link></div>
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
      <section className={`app-shell ${styles.contactSection}`}><div className={styles.contactPanel}><div><p className="brand-eyebrow">{language === "fr" ? "CONSTRUISONS LA SUITE / ENOV CORP" : "BUILD WHAT COMES NEXT / ENOV CORP"}</p><h2>{t.closing}</h2><p>{t.closingText}</p></div><div className={styles.contactActions}><Link href="/contact" className={styles.primary}>{t.contact}<span aria-hidden="true">&#8599;</span></Link><a href="mailto:contact@enovcorp.com">contact@enovcorp.com</a></div></div></section>
    </main>
  );
}
