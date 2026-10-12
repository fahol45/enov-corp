"use client";

import { PageHero } from "@/components/SiteSections";
import { useLanguage } from "@/context/LanguageContext";
export function AcademyHero({ registrationUrl }: { registrationUrl: string | null }) {
  void registrationUrl;
  const { language } = useLanguage();
  return <PageHero eyebrow="ENOV ACADEMY / FORMATIONS" title={language === "fr" ? "Apprendre aujourd’hui." : "Learn today."} highlight={language === "fr" ? "Construire demain." : "Build tomorrow."} description={language === "fr" ? "Développement, data, design et systèmes connectés : explorez les programmes et choisissez un parcours adapté à votre niveau." : "Development, data, design and connected systems: explore the programmes and choose a path that matches your level."} image={{ src: "/Academy_images/IoT & Robotics Lab.webp", alt: language === "fr" ? "Technologies IoT et robotique" : "IoT and robotics technologies" }} action={{ href: "#formations", label: language === "fr" ? "Explorer les formations" : "Explore the courses" }} secondary={{ href: "/contact", label: language === "fr" ? "Former mon équipe" : "Train my team" }} />;
}
