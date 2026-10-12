"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FeatureGrid, PageCTA, PageHero, PageSection, ProcessSteps } from "@/components/SiteSections";

const copy = {
  fr: {
    title: "Des outils numériques", highlight: "à la mesure de votre activité.", description: "Sites web, applications mobiles et plateformes métier : nous concevons des interfaces utiles, fiables et adaptées à vos utilisateurs.", action: "Présenter mon projet", secondary: "Explorer les solutions", section: "Du site vitrine à la plateforme métier.",
    features: [
      { title: "Sites web", text: "Présenter votre activité, vos offres et vos réalisations avec une expérience claire sur ordinateur et mobile." },
      { title: "Applications mobiles", text: "Accompagner vos utilisateurs et vos équipes sur le terrain, avec des parcours adaptés à leurs usages." },
      { title: "Gestion & opérations", text: "Réunir les stocks, les équipes, les commandes et les rapports dans un outil adapté à votre organisation." },
      { title: "Commerce en ligne", text: "Structurer le catalogue, les commandes et le parcours d’achat de votre boutique." },
      { title: "Portails clients", text: "Proposer un espace dédié pour suivre les demandes, partager des documents et simplifier les échanges." },
      { title: "Tableaux de bord", text: "Rassembler les données utiles à votre activité pour suivre les indicateurs et préparer vos décisions." },
    ],
    aiTitle: "L’intelligence artificielle, là où elle est utile.", aiText: "Nous étudions vos données et vos processus pour intégrer des fonctions d’analyse, de recherche et d’automatisation dans vos outils.", ai: [
      { title: "Recherche documentaire", text: "Retrouver et synthétiser les informations de vos documents, avec un périmètre de données défini." },
      { title: "Assistants métier", text: "Aider vos utilisateurs à naviguer dans vos contenus et à préparer des réponses adaptées à leur contexte." },
      { title: "Automatisation", text: "Relier les étapes répétitives de vos processus avec des validations adaptées à votre organisation." },
    ],
    processTitle: "Un projet structuré, de l’idée au lancement.", steps: [
      { title: "Cadrer", text: "Comprendre les utilisateurs, définir le périmètre et les priorités." },
      { title: "Concevoir", text: "Dessiner les parcours et valider les écrans essentiels." },
      { title: "Développer", text: "Construire, intégrer et vérifier le fonctionnement." },
      { title: "Déployer", text: "Mettre en ligne et accompagner la prise en main." },
    ], cta: "Votre prochain outil commence par un échange.", ctaText: "Décrivez votre contexte et vos objectifs. Nous définirons ensemble les prochaines étapes.",
  },
  en: {
    title: "Digital tools", highlight: "built around your business.", description: "Websites, mobile apps and business platforms: we design useful, reliable interfaces around your users.", action: "Discuss my project", secondary: "Explore the solutions", section: "From websites to business platforms.",
    features: [
      { title: "Websites", text: "Present your business, services and work with a clear experience on desktop and mobile." },
      { title: "Mobile apps", text: "Support your users and field teams with workflows designed around their needs." },
      { title: "Management & operations", text: "Bring inventory, teams, orders and reporting together in a tool designed for your organisation." },
      { title: "Online commerce", text: "Structure your catalogue, orders and online shopping journey." },
      { title: "Client portals", text: "Provide a dedicated space to track requests, share documents and simplify communication." },
      { title: "Dashboards", text: "Bring the data that matters together to monitor performance and support decisions." },
    ],
    aiTitle: "Artificial intelligence where it adds value.", aiText: "We assess your data and workflows to add analysis, search and automation to your tools.", ai: [
      { title: "Document search", text: "Retrieve and summarise information within a defined set of documents." },
      { title: "Business assistants", text: "Help users navigate your content and prepare context-aware responses." },
      { title: "Automation", text: "Connect repetitive steps with checks designed around your organisation." },
    ],
    processTitle: "A structured project, from idea to launch.", steps: [
      { title: "Define", text: "Understand users, scope and priorities." },
      { title: "Design", text: "Map journeys and validate the essential screens." },
      { title: "Build", text: "Develop, integrate and verify the solution." },
      { title: "Launch", text: "Deploy and support adoption." },
    ], cta: "Your next tool starts with a conversation.", ctaText: "Share your context and goals. Let’s define the next steps together.",
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
