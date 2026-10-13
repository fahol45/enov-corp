"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FeatureGrid, PageCTA, PageHero, PageSection, ProcessSteps } from "@/components/SiteSections";

const copy = {
  fr: {
    title: "Cultures hors-sol.", highlight: "Installations connectées.", description: "Nous concevons des installations hydroponiques et équipons les cultures de capteurs.", action: "Nous contacter", secondary: "Voir les équipements", solutionsTitle: "Culture, mesure et irrigation.", features: [
      { title: "Culture hydroponique", text: "Systèmes de culture hors-sol avec apport de solution nutritive." },
      { title: "Capteurs & suivi", text: "Mesure du pH, de la conductivité, de la température et de l’humidité." },
      { title: "Automatisation", text: "Déclenchement de l’irrigation selon les mesures et les seuils fixés." },
      { title: "Tableau de bord", text: "Consultation des mesures sur ordinateur ou téléphone." },
      { title: "Alertes", text: "Notifications lorsque les mesures dépassent les seuils fixés." },
      { title: "Prise en main", text: "Formation à l’utilisation des équipements et à la lecture des mesures." },
    ], processTitle: "Les étapes de l’installation.", steps: [
      { title: "Étudier le terrain", text: "Échanger sur les cultures, les ressources et les contraintes du site." },
      { title: "Concevoir", text: "Définir l’installation, les équipements et les paramètres à suivre." },
      { title: "Installer", text: "Mettre en place les équipements et vérifier leur fonctionnement." },
      { title: "Accompagner", text: "Former les utilisateurs et organiser le suivi de l’installation." },
    ], cta: "Vous préparez une installation ?", ctaText: "Indiquez les cultures prévues et les équipements existants.",
  },
  en: {
    title: "Hydroponic growing.", highlight: "Connected equipment.", description: "Hydroponics, sensors and automation: we design installations around your site and your crops.", action: "Contact us", secondary: "View equipment", solutionsTitle: "Growing, monitoring and irrigation.", features: [
      { title: "Hydroponic growing", text: "Define a soil-free growing system with a nutrient solution and setup suited to your project." },
      { title: "Sensors & monitoring", text: "Track useful parameters: pH, conductivity, temperature and humidity, depending on the selected equipment." },
      { title: "Automation", text: "Configure irrigation and control actions around measurements and defined operating thresholds." },
      { title: "Dashboard", text: "View installation data in a clear interface on desktop or mobile." },
      { title: "Alerts", text: "Identify deviations and receive notifications when readings exceed your thresholds." },
      { title: "Adoption", text: "Help your teams use the installation and follow its measurements." },
    ], processTitle: "Installation stages.", steps: [
      { title: "Assess", text: "Discuss crops, resources and site constraints." },
      { title: "Design", text: "Define the installation, equipment and monitoring parameters." },
      { title: "Install", text: "Set up equipment and verify its operation." },
      { title: "Support", text: "Train users and organise ongoing monitoring." },
    ], cta: "Planning an installation?", ctaText: "Tell us about the crops and existing equipment.",
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
