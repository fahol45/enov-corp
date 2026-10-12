"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FeatureGrid, PageCTA, PageHero, PageSection, ProcessSteps } from "@/components/SiteSections";

const copy = {
  fr: {
    title: "Une agriculture connectée.", highlight: "Un pilotage plus précis.", description: "Hydroponie, capteurs et automatisation : nous concevons des installations adaptées à votre terrain et aux besoins de vos cultures.", action: "Parlons de votre installation", secondary: "Comprendre la solution", solutionsTitle: "De la culture à la donnée utile.", features: [
      { title: "Culture hydroponique", text: "Définir un système de culture hors-sol, avec une solution nutritive et une organisation adaptées à votre projet." },
      { title: "Capteurs & suivi", text: "Suivre les paramètres utiles : pH, conductivité, température et humidité, selon les équipements retenus." },
      { title: "Automatisation", text: "Configurer l’irrigation et les actions de contrôle en fonction des mesures et de vos seuils de fonctionnement." },
      { title: "Tableau de bord", text: "Consulter les données de votre installation dans une interface claire, sur ordinateur ou mobile." },
      { title: "Alertes", text: "Identifier les écarts et être informé lorsque les mesures dépassent les seuils définis." },
      { title: "Prise en main", text: "Accompagner vos équipes dans l’utilisation de l’installation et le suivi des mesures." },
    ], processTitle: "Une installation préparée avec vous.", steps: [
      { title: "Étudier le terrain", text: "Échanger sur les cultures, les ressources et les contraintes du site." },
      { title: "Concevoir", text: "Définir l’installation, les équipements et les paramètres à suivre." },
      { title: "Installer", text: "Mettre en place les équipements et vérifier leur fonctionnement." },
      { title: "Accompagner", text: "Former les utilisateurs et organiser le suivi de l’installation." },
    ], cta: "Une serre à connecter ou un projet à construire ?", ctaText: "Présentez votre installation et vos objectifs. Nous étudierons les prochaines étapes avec vous.",
  },
  en: {
    title: "Connected agriculture.", highlight: "More precise monitoring.", description: "Hydroponics, sensors and automation: we design installations around your site and your crops.", action: "Discuss your installation", secondary: "Understand the solution", solutionsTitle: "From crops to useful data.", features: [
      { title: "Hydroponic growing", text: "Define a soil-free growing system with a nutrient solution and setup suited to your project." },
      { title: "Sensors & monitoring", text: "Track useful parameters: pH, conductivity, temperature and humidity, depending on the selected equipment." },
      { title: "Automation", text: "Configure irrigation and control actions around measurements and defined operating thresholds." },
      { title: "Dashboard", text: "View installation data in a clear interface on desktop or mobile." },
      { title: "Alerts", text: "Identify deviations and receive notifications when readings exceed your thresholds." },
      { title: "Adoption", text: "Help your teams use the installation and follow its measurements." },
    ], processTitle: "An installation planned together.", steps: [
      { title: "Assess", text: "Discuss crops, resources and site constraints." },
      { title: "Design", text: "Define the installation, equipment and monitoring parameters." },
      { title: "Install", text: "Set up equipment and verify its operation." },
      { title: "Support", text: "Train users and organise ongoing monitoring." },
    ], cta: "A greenhouse to connect or a project to build?", ctaText: "Share your installation and goals. We’ll assess the next steps together.",
  },
};
export function HydroponieView() {
  const { language } = useLanguage(); const t = copy[language];
  return <main><PageHero eyebrow="HYDROPONIE & IOT / ENOV CORP" title={t.title} highlight={t.highlight} description={t.description} image={{ src: "/Academy_images/Hydroponie intelligente & data.jpg", alt: language === "fr" ? "Culture hydroponique et suivi connecté" : "Hydroponic crops and connected monitoring" }} action={{ href: "/contact", label: t.action }} secondary={{ href: "#solutions", label: t.secondary }} />
    <PageSection id="solutions" eyebrow={language === "fr" ? "01 / LE SYSTÈME" : "01 / THE SYSTEM"} title={t.solutionsTitle}><FeatureGrid items={t.features} /></PageSection>
    <PageSection eyebrow={language === "fr" ? "02 / LE PARCOURS" : "02 / THE PROCESS"} title={t.processTitle}><ProcessSteps items={t.steps} /></PageSection>
    <PageCTA title={t.cta} text={t.ctaText} label={t.action} />
  </main>;
}
