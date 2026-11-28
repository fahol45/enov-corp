"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { expertise, deliverySteps, type ExpertiseKey } from "@/lib/site-content";
import { EngineeringVisual } from "./EngineeringVisual";
import { PageHero, PageSection, FeatureGrid, ProcessSteps, PageCTA } from "./SiteSections";
import styles from "./ExpertiseView.module.css";

const details = {
  fr: {
    software: { title: "Ingénierie logicielle.", highlight: "Des outils reliés à votre métier.", intro: "Nous concevons des applications web et mobiles, des plateformes SaaS et des logiciels métier. Le projet commence par vos opérations, vos utilisateurs et les outils déjà en place.", problem: "Quand les outils ne suivent plus l’activité.", problemText: "Fichiers dispersés, saisies répétées, logiciels qui ne communiquent pas : nous identifions les points de blocage avant de proposer un développement.", features: [
      { title: "Applications web & mobiles", text: "Sites professionnels, applications pour vos clients et outils pour les équipes terrain." },
      { title: "Plateformes métier & SaaS", text: "Gestion des utilisateurs, processus de validation, portails clients et fonctions propres à votre activité." },
      { title: "Intégrations & API", text: "Connexion de vos logiciels pour limiter les doubles saisies et faciliter les échanges de données." },
      { title: "Données & tableaux de bord", text: "Organisation des données et restitution des indicateurs nécessaires au suivi des opérations." },
    ], outcome: "Ce que nous définissons avec vous.", outcomes: [
      { title: "Le périmètre", text: "Les fonctions à développer, les outils à connecter et les limites du projet." },
      { title: "Les livrables", text: "Les écrans, les intégrations, la documentation et les conditions de mise en service." },
      { title: "Les critères de validation", text: "Des scénarios de test fondés sur les usages de vos équipes." },
    ] },
    ai: { title: "Intelligence artificielle.", highlight: "Automatisation métier.", intro: "Nous étudions et intégrons des fonctions d’IA dans vos outils : recherche documentaire, assistants, traitement de données et automatisation des tâches.", problem: "Choisir un usage avant de choisir un modèle.", problemText: "Une tâche répétitive, des documents difficiles à consulter ou des données à traiter : nous évaluons la faisabilité, les sources disponibles et les risques d’erreur.", features: [
      { title: "Assistants & agents métier", text: "Assistance à la recherche et à la préparation de réponses. Les actions sensibles restent soumises à validation." },
      { title: "Recherche documentaire", text: "Accès aux informations d’un corpus défini, avec gestion des droits et vérification des réponses." },
      { title: "Automatisation des processus", text: "Extraction, classement et transmission de données entre vos outils, avec des points de contrôle." },
      { title: "IA dans vos applications", text: "Intégration de fonctions d’analyse ou d’assistance dans vos interfaces existantes." },
    ], outcome: "Une intégration qui se vérifie.", outcomes: [
      { title: "Données & confidentialité", text: "Nous précisons les données utilisables, les accès et les contraintes d’hébergement avant les tests." },
      { title: "Évaluation", text: "Un jeu de cas concrets permet de mesurer la qualité et les limites des réponses." },
      { title: "Contrôle humain", text: "Les erreurs possibles et les décisions qui nécessitent une validation sont définies dès le cadrage." },
    ] },
    systems: { title: "Systèmes connectés.", highlight: "Du capteur à la supervision.", intro: "Collecte de données, intégration IoT et supervision technique. Nous étudions les équipements, la connectivité et les conditions d’exploitation avant la réalisation.", problem: "Rendre le terrain visible dans vos outils.", problemText: "Des relevés manuels ou des équipements isolés peuvent compliquer le suivi. Nous organisons la collecte des mesures et leur transmission vers une interface de supervision.", features: [
      { title: "Capteurs & collecte", text: "Intégration des mesures disponibles : température, humidité, pH ou autres paramètres selon l’équipement." },
      { title: "Supervision & alertes", text: "Consultation des données, historique et alertes selon des seuils convenus." },
      { title: "Agriculture connectée", text: "L’hydroponie et le suivi des cultures constituent un domaine d’application présenté sur une page dédiée.", href: "/hydroponie" },
      { title: "Embarqué & robotique", text: "Axe de compétence et de prototypage étudié au cas par cas. Il ne s’agit pas d’un catalogue de robots commercialisés." },
    ], outcome: "La faisabilité précède l’engagement.", outcomes: [
      { title: "Contraintes du site", text: "Alimentation, réseau, environnement et maintenance sont examinés avant la conception." },
      { title: "Prototype si nécessaire", text: "Un essai permet de vérifier la collecte et la communication avant un déploiement plus large." },
      { title: "Prise en main", text: "Les utilisateurs doivent pouvoir lire les mesures, traiter les alertes et identifier les limites du système." },
    ] },
  },
  en: {
    software: { title: "Software engineering.", highlight: "Tools for your operations.", intro: "We design web and mobile applications, SaaS platforms and business software, starting with your operations, users and existing tools.", problem: "When tools no longer support the work.", problemText: "Scattered files, repeated data entry and disconnected software: we identify bottlenecks before proposing a development project.", features: [
      { title: "Web & mobile applications", text: "Professional websites, customer applications and tools for field teams." },
      { title: "Business & SaaS platforms", text: "Users, approval workflows, client portals and features specific to your operations." },
      { title: "Integrations & APIs", text: "Connecting software to reduce duplicate entry and exchange data." },
      { title: "Data & dashboards", text: "Organising data and reporting operational indicators." },
    ], outcome: "What we agree with you.", outcomes: [
      { title: "Scope", text: "Features, systems to connect and project boundaries." },
      { title: "Deliverables", text: "Screens, integrations, documentation and deployment requirements." },
      { title: "Acceptance criteria", text: "Test scenarios based on your teams’ work." },
    ] },
    ai: { title: "Artificial intelligence.", highlight: "Business automation.", intro: "We assess and integrate AI into your tools: document search, assistants, data processing and task automation.", problem: "Choose a use before choosing a model.", problemText: "Repetitive work, hard-to-search documents or data to process: we assess feasibility, sources and the risk of errors.", features: [
      { title: "Business assistants & agents", text: "Help finding information and drafting answers. Sensitive actions remain subject to approval." },
      { title: "Document search", text: "Access to a defined collection, with access controls and answer verification." },
      { title: "Process automation", text: "Extracting, classifying and transferring data between tools, with checkpoints." },
      { title: "AI in your applications", text: "Analysis or assistance features integrated into existing interfaces." },
    ], outcome: "An integration you can evaluate.", outcomes: [
      { title: "Data & privacy", text: "We define usable data, access and hosting requirements before testing." },
      { title: "Evaluation", text: "Practical test cases establish response quality and limitations." },
      { title: "Human oversight", text: "We define possible errors and decisions requiring approval at the scoping stage." },
    ] },
    systems: { title: "Connected systems.", highlight: "From sensor to monitoring.", intro: "Data collection, IoT integration and technical monitoring. We assess equipment, connectivity and operating conditions before implementation.", problem: "Bring field data into your tools.", problemText: "Manual readings and isolated equipment make monitoring difficult. We organise measurement collection and transmission to a monitoring interface.", features: [
      { title: "Sensors & data collection", text: "Temperature, humidity, pH and other measurements supported by selected equipment." },
      { title: "Monitoring & alerts", text: "Data access, history and alerts based on agreed thresholds." },
      { title: "Connected agriculture", text: "Hydroponics and crop monitoring are covered on a dedicated application page.", href: "/hydroponie" },
      { title: "Embedded systems & robotics", text: "A competence and prototyping area assessed case by case, not a catalogue of commercially available robots." },
    ], outcome: "Feasibility before commitment.", outcomes: [
      { title: "Site constraints", text: "Power, network, environment and maintenance are assessed before design." },
      { title: "Prototype where needed", text: "A trial verifies data collection and communication before wider deployment." },
      { title: "User handover", text: "Users need to read measurements, handle alerts and understand system limitations." },
    ] },
  },
};
export function ExpertiseView({ domain }: { domain: ExpertiseKey }) {
  const { language }=useLanguage(); const fr=language==="fr"; const t=details[language][domain];
  return <main id="main-content"><PageHero eyebrow={fr ? "EXPERTISES / ENOV CORP" : "EXPERTISE / ENOV CORP"} title={t.title} highlight={t.highlight} description={t.intro} action={{href:"/contact",label:fr?"Discuter de votre projet":"Discuss your project"}} secondary={{href:"/expertises",label:fr?"Toutes les expertises":"All expertise"}} /><PageSection eyebrow={fr?"VOTRE BESOIN":"YOUR REQUIREMENTS"} title={t.problem} description={t.problemText}><FeatureGrid items={t.features} /></PageSection><PageSection eyebrow={fr?"LE CADRE DU PROJET":"PROJECT FRAMEWORK"} title={t.outcome}><FeatureGrid items={t.outcomes} /></PageSection><PageSection eyebrow={fr?"NOTRE DÉMARCHE":"OUR APPROACH"} title={fr?"Du cadrage à la mise en service.":"From scope to delivery."}><ProcessSteps items={deliverySteps[language]} /></PageSection><PageCTA title={fr?"Décrivez-nous votre besoin.":"Tell us what you need."} text={fr?"Vos outils actuels, vos contraintes et ce que vous souhaitez améliorer.":"Your current tools, constraints and what you want to improve."} label={fr?"Prendre contact":"Get in touch"} /></main>;
}
export function ExpertiseIndex() {
  const {language}=useLanguage();const fr=language==="fr";
  return <main id="main-content"><PageHero eyebrow={fr?"NOS EXPERTISES":"OUR EXPERTISE"} title={fr?"Logiciel. Intelligence artificielle.":"Software. Artificial intelligence."} highlight={fr?"Systèmes connectés.":"Connected systems."} description={fr?"Nous choisissons les technologies à partir du problème à résoudre et des conditions dans lesquelles la solution sera utilisée.":"We choose technology around the problem and the conditions in which the solution will operate."} /><div className="app-shell">{expertise[language].map(item=><article key={item.key} className={styles.row}><div className={styles.diagram}><EngineeringVisual variant={item.key} /></div><div><p className="brand-eyebrow">{item.label}</p><h2>{item.name}</h2><p>{item.text}</p><Link href={item.href}>{fr?"Voir cette expertise":"Explore this expertise"}</Link></div></article>)}</div><PageCTA title={fr?"Plusieurs besoins dans le même projet ?":"Several needs in one project?"} text={fr?"Nous pouvons étudier ensemble les logiciels, les données et les équipements concernés.":"We can assess software, data and equipment together."} label={fr?"Discuter du projet":"Discuss your project"} /></main>;
}
