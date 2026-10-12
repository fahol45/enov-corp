"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FeatureGrid, PageCTA, PageHero, PageSection, ProcessSteps } from "@/components/SiteSections";

const copy = {
  fr: { title: "La technologie utile.", highlight: "Des idées qui prennent forme.", description: "ENOV CORP réunit le développement numérique, les systèmes agricoles connectés et la formation autour d’une même démarche : partir de votre besoin et construire une solution concrète.", action: "Échanger avec notre équipe", expertise: "Trois expertises complémentaires.", features: [
    { title: "Web & Mobile", text: "Concevoir des sites, des applications et des plateformes pour les usages de votre activité.", href: "/web-mobile" },
    { title: "Hydroponie & IoT", text: "Relier les installations, les mesures et les outils de pilotage sur le terrain.", href: "/hydroponie" },
    { title: "ENOV Academy", text: "Transmettre les compétences nécessaires pour comprendre et utiliser les technologies.", href: "/academy" },
  ], approach: "Comprendre avant de construire.", approachText: "Nous définissons avec vous les objectifs, le périmètre et les contraintes du projet. Les choix techniques suivent les usages, et la prise en main fait partie du parcours.", steps: [
    { title: "Un besoin clair", text: "Les utilisateurs, les objectifs et les priorités sont identifiés dès le départ." },
    { title: "Des étapes lisibles", text: "La conception, la réalisation et la mise en service suivent un parcours défini ensemble." },
    { title: "Une solution adoptée", text: "Les équipes disposent des repères utiles pour utiliser et suivre leurs nouveaux outils." },
  ], cta: "Construisons la prochaine étape de votre activité.", ctaText: "Un projet numérique, une installation connectée ou un besoin de formation : parlons-en.", },
  en: { title: "Technology with purpose.", highlight: "Ideas taking shape.", description: "ENOV CORP brings digital development, connected agriculture and training together with one approach: start with your needs and build a practical solution.", action: "Talk to our team", expertise: "Three complementary areas of expertise.", features: [
    { title: "Web & Mobile", text: "Design websites, applications and platforms around your business needs.", href: "/web-mobile" },
    { title: "Hydroponics & IoT", text: "Connect installations, measurements and monitoring tools in the field.", href: "/hydroponie" },
    { title: "ENOV Academy", text: "Share the skills needed to understand and use technology.", href: "/academy" },
  ], approach: "Understand before building.", approachText: "We define goals, scope and constraints together. Technical choices follow real uses, and adoption is part of the process.", steps: [
    { title: "A clear need", text: "Users, goals and priorities are identified from the start." },
    { title: "Visible steps", text: "Design, delivery and launch follow a process defined together." },
    { title: "Practical adoption", text: "Teams have the guidance they need to use and monitor their new tools." },
  ], cta: "Build the next step for your business.", ctaText: "A digital project, connected installation or training need: let’s talk.", },
};
export function AProposView() {
  const { language } = useLanguage(); const t = copy[language];
  return <main><PageHero eyebrow={language === "fr" ? "À PROPOS / ENOV CORP" : "ABOUT / ENOV CORP"} title={t.title} highlight={t.highlight} description={t.description} action={{ href: "/contact", label: t.action }} />
    <PageSection eyebrow={language === "fr" ? "01 / NOS DOMAINES" : "01 / OUR EXPERTISE"} title={t.expertise}><FeatureGrid items={t.features} /></PageSection>
    <PageSection eyebrow={language === "fr" ? "02 / NOTRE ENGAGEMENT" : "02 / OUR APPROACH"} title={t.approach} description={t.approachText}><ProcessSteps items={t.steps} /></PageSection>
    <PageCTA title={t.cta} text={t.ctaText} label={t.action} />
  </main>;
}
