"use client";

import Image from "next/image";
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
  return (
    <main className="welcome-page">
      <section className="welcome-hero app-shell">
        <p className="brand-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}<br /><span>{t.highlight}</span></h1>
        <p className="welcome-intro">{t.intro}</p>
        <div className="welcome-actions"><Link href="/contact" className="brand-button">{t.contact}<span aria-hidden="true">↗</span></Link><Link href="/academy" className="welcome-secondary">{t.academyLink}<span aria-hidden="true">→</span></Link></div>
      </section>
      <nav className="welcome-paths app-shell" aria-label={language === "fr" ? "Nos activités" : "Our services"}>
        {t.services.map((service, index) => <Link href={service.href} key={service.href}><span className="welcome-index">0{index + 1}</span><div><strong>{service.title}</strong><p>{service.short}</p></div><span aria-hidden="true">↗</span></Link>)}
        <Link href="/academy"><span className="welcome-index">03</span><div><strong>ENOV Academy</strong><p>{t.academyShort}</p></div><span aria-hidden="true">↗</span></Link>
      </nav>
      <section id="poles" className="welcome-expertise app-shell">
        <div className="welcome-section-heading"><p className="brand-eyebrow">{t.expertise}</p><h2>{t.expertiseIntro}</h2></div>
        {t.services.map((service, index) => <article className={`welcome-service welcome-service-${index}`} key={service.href}>
          <div className="welcome-service-visual"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 800px) 100vw, 50vw" className={index === 0 ? "welcome-product-image" : "welcome-field-image"} /><span className="welcome-image-label">{service.title}</span></div>
          <div className="welcome-service-copy"><p className="brand-eyebrow">0{index + 1} / {service.title}</p><h3>{service.heading}</h3><p>{service.description}</p><p className="welcome-service-tags">{service.tags}</p><Link href={service.href} className="brand-text-link">{service.link}<span aria-hidden="true">↗</span></Link></div>
        </article>)}
      </section>
      <section className="welcome-academy"><div className="app-shell welcome-academy-inner"><div><p className="brand-eyebrow">ENOV ACADEMY</p><h2>{t.academyTitle}</h2><p className="welcome-academy-description">{t.academyText}</p><Link href="/academy" className="brand-button">{t.catalogue}<span aria-hidden="true">↗</span></Link></div><Link href="/academy" className="welcome-academy-visual"><Image src="/Academy_images/IoT & Robotics Lab.webp" alt={language === "fr" ? "Équipements de formation IoT et robotique" : "IoT and robotics training equipment"} fill sizes="(max-width: 800px) 100vw, 45vw" /><span>{t.academyCaption}<span aria-hidden="true">↗</span></span></Link></div></section>
      <section className="welcome-about app-shell"><h2>{t.about}</h2><div><p>{t.aboutText}</p><Link href="/propos" className="brand-text-link">{t.aboutLink}<span aria-hidden="true">→</span></Link></div></section>
      <section className="welcome-contact app-shell"><div><p className="brand-eyebrow">ENOV CORP</p><h2>{t.closing}</h2><p>{t.closingText}</p></div><Link href="/contact" className="brand-button">{t.contact}<span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
