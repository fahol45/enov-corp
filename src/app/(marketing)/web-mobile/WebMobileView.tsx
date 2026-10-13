"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FeatureGrid, PageCTA, PageHero, PageSection, ProcessSteps } from "@/components/SiteSections";

const copy = {
  fr: {
    title: "Sites web.", highlight: "Applications mobiles.", description: "Nous développons des sites, des applications et des logiciels de gestion.", action: "Nous contacter", secondary: "Voir les services", section: "Nos services.",
    features: [
      { title: "Sites web", text: "Sites vitrines pour présenter votre activité, vos offres et vos coordonnées." },
      { title: "Applications mobiles", text: "Applications pour vos clients ou vos équipes, sur Android et iOS." },
      { title: "Gestion & opérations", text: "Gestion des stocks, commandes, équipes et rapports." },
      { title: "Commerce en ligne", text: "Boutiques en ligne avec catalogue et suivi des commandes." },
      { title: "Portails clients", text: "Espaces clients pour les demandes et le partage de documents." },
      { title: "Tableaux de bord", text: "Tableaux de bord pour consulter vos données et suivre vos indicateurs." },
    ],
    aiTitle: "IA et automatisation.", aiText: "Nous intégrons des fonctions de recherche et d’analyse dans vos logiciels.", ai: [
      { title: "Recherche documentaire", text: "Recherche et résumé dans vos documents." },
      { title: "Assistants métier", text: "Assistants pour consulter vos contenus et préparer des réponses." },
      { title: "Automatisation", text: "Automatisation des tâches répétitives, avec validation humaine si nécessaire." },
    ],
    processTitle: "Les étapes du projet.", steps: [
      { title: "Cadrer", text: "Comprendre les utilisateurs, définir le périmètre et les priorités." },
      { title: "Concevoir", text: "Dessiner les parcours et valider les écrans essentiels." },
      { title: "Développer", text: "Construire, intégrer et vérifier le fonctionnement." },
      { title: "Déployer", text: "Mettre en ligne et accompagner la prise en main." },
    ], cta: "Parlez-nous de votre projet.", ctaText: "Indiquez ce que vous souhaitez développer.",
  },
  en: {
    title: "Websites.", highlight: "Mobile apps.", description: "We develop websites, apps and business software.", action: "Contact us", secondary: "View services", section: "From websites to business platforms.",
    features: [
      { title: "Websites", text: "Present your business, services and work with a clear experience on desktop and mobile." },
      { title: "Mobile apps", text: "Support your users and field teams with workflows designed around their needs." },
      { title: "Management & operations", text: "Bring inventory, teams, orders and reporting together in a tool designed for your organisation." },
      { title: "Online commerce", text: "Structure your catalogue, orders and online shopping journey." },
      { title: "Client portals", text: "Provide a dedicated space to track requests, share documents and simplify communication." },
      { title: "Dashboards", text: "Bring the data that matters together to monitor performance and support decisions." },
    ],
    aiTitle: "AI and automation.", aiText: "We assess your data and workflows to add analysis, search and automation to your tools.", ai: [
      { title: "Document search", text: "Retrieve and summarise information within a defined set of documents." },
      { title: "Business assistants", text: "Help users navigate your content and prepare context-aware responses." },
      { title: "Automation", text: "Connect repetitive steps with checks designed around your organisation." },
    ],
    processTitle: "Project stages.", steps: [
      { title: "Define", text: "Understand users, scope and priorities." },
      { title: "Design", text: "Map journeys and validate the essential screens." },
      { title: "Build", text: "Develop, integrate and verify the solution." },
      { title: "Launch", text: "Deploy and support adoption." },
    ], cta: "Tell us about your project.", ctaText: "Tell us what you need to develop.",
  },
};
export function WebMobileView() {
  const { language } = useLanguage(); const t = copy[language];
  return <main><PageHero eyebrow="WEB & MOBILE / ENOV CORP" title={t.title} highlight={t.highlight} description={t.description} image={{ src: "/pc-portable.png", alt: language === "fr" ? "Exemple d’interface numérique ENOV" : "ENOV digital interface example", contain: true }} action={{ href: "/contact", label: t.action }} secondary={{ href: "#solutions", label: t.secondary }} />
    <PageSection id="solutions" eyebrow={language === "fr" ? "01 / NOS SOLUTIONS" : "01 / OUR SOLUTIONS"} title={t.section}><FeatureGrid items={t.features} /></PageSection>
    <PageSection eyebrow="02 / IA & AUTOMATISATION" title={t.aiTitle} description={t.aiText}><FeatureGrid items={t.ai} /></PageSection>
    <PageSection eyebrow={language === "fr" ? "03 / NOTRE MÉTHODE" : "03 / OUR PROCESS"} title={t.processTitle}><ProcessSteps items={t.steps} /></PageSection>
    <PageCTA title={t.cta} text={t.ctaText} label={t.action} />
  </main>;
}
