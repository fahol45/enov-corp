"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FeatureGrid, PageCTA, PageHero, PageSection, ProcessSteps } from "@/components/SiteSections";

const copy = {
  fr: { title: "ENOV CORP.", highlight: "Développement et formation.", description: "Nous développons des applications, installons des systèmes de culture connectés et proposons des formations techniques.", action: "Nous contacter", expertise: "Nos activités.", features: [
    { title: "Web & Mobile", text: "Sites web, applications mobiles et logiciels de gestion.", href: "/web-mobile" },
    { title: "Hydroponie & IoT", text: "Culture hors-sol, capteurs et irrigation automatisée.", href: "/hydroponie" },
    { title: "ENOV Academy", text: "Formations en développement, data, design et IoT.", href: "/academy" },
  ], approach: "Notre façon de travailler.", approachText: "Avant de commencer, nous convenons des fonctionnalités, du calendrier et des contraintes techniques.", steps: [
    { title: "Le besoin", text: "Nous listons les fonctionnalités attendues et les contraintes." },
    { title: "La réalisation", text: "Nous concevons les écrans ou l’installation, puis réalisons les tests." },
    { title: "La prise en main", text: "Nous montrons à vos équipes comment utiliser les outils." },
  ], cta: "Contactez ENOV CORP.", ctaText: "Pour un projet ou une formation.", },
  en: { title: "ENOV CORP.", highlight: "Development and training.", description: "We develop applications, install connected growing systems and provide technical training.", action: "Talk to our team", expertise: "Our activities.", features: [
    { title: "Web & Mobile", text: "Design websites, applications and platforms around your business needs.", href: "/web-mobile" },
    { title: "Hydroponics & IoT", text: "Connect installations, measurements and monitoring tools in the field.", href: "/hydroponie" },
    { title: "ENOV Academy", text: "Share the skills needed to understand and use technology.", href: "/academy" },
  ], approach: "How we work.", approachText: "We define goals, scope and constraints together. Technical choices follow real uses, and adoption is part of the process.", steps: [
    { title: "A clear need", text: "Users, goals and priorities are identified from the start." },
    { title: "Visible steps", text: "Design, delivery and launch follow a process defined together." },
    { title: "Practical adoption", text: "Teams have the guidance they need to use and monitor their new tools." },
  ], cta: "Contact ENOV CORP.", ctaText: "A digital project, connected installation or training need: let’s talk.", },
};
export function AProposView() {
  const { language } = useLanguage(); const t = copy[language];
  return <main><PageHero eyebrow={language === "fr" ? "À PROPOS / ENOV CORP" : "ABOUT / ENOV CORP"} title={t.title} highlight={t.highlight} description={t.description} action={{ href: "/contact", label: t.action }} />
    <PageSection eyebrow={language === "fr" ? "01 / NOS DOMAINES" : "01 / OUR EXPERTISE"} title={t.expertise}><FeatureGrid items={t.features} /></PageSection>
    <PageSection eyebrow={language === "fr" ? "02 / NOTRE MÉTHODE" : "02 / OUR APPROACH"} title={t.approach} description={t.approachText}><ProcessSteps items={t.steps} /></PageSection>
    <PageCTA title={t.cta} text={t.ctaText} label={t.action} />
  </main>;
}
