"use client";

import { PageHero } from "@/components/SiteSections";
import { useLanguage } from "@/context/LanguageContext";
export function AcademyHero({ registrationUrl }: { registrationUrl: string | null }) {
  void registrationUrl;
  const { language } = useLanguage();
  return <PageHero eyebrow="ENOV ACADEMY / FORMATIONS" title={language === "fr" ? "Formations en" : "Courses in"} highlight={language === "fr" ? "web, data et IoT." : "web, data and IoT."} description={language === "fr" ? "Programmes, prérequis, tarifs et dates des sessions." : "Programmes, prerequisites, fees and session dates."} image={{ src: "/Academy_images/IoT & Robotics Lab.webp", alt: language === "fr" ? "Technologies IoT et robotique" : "IoT and robotics technologies" }} action={{ href: "#formations", label: language === "fr" ? "Voir les formations" : "View courses" }} secondary={{ href: "/contact", label: language === "fr" ? "Former mon équipe" : "Train my team" }} />;
}
