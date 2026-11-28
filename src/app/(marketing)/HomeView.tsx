"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { expertise, deliverySteps } from "@/lib/site-content";
import { HomeWork } from "./HomeWork";
import { EngineeringVisual } from "@/components/EngineeringVisual";
import { Reveal } from "@/components/Reveal";
import { ProcessSteps } from "@/components/SiteSections";
import styles from "./HomeSections.module.css";

export function HomeView({ work }: { work?: ReactNode }) {
  const { language } = useLanguage(); const fr = language === "fr";
  const domains = expertise[language];
  const needs = fr ? [
    { title: "Vos opérations reposent sur des fichiers dispersés.", text: "Une application métier réunit les données, les validations et les équipes.", href: "/web-mobile" },
    { title: "Les mêmes tâches mobilisent vos équipes chaque jour.", text: "Nous identifions les étapes automatisables et les contrôles à conserver.", href: "/intelligence-artificielle" },
    { title: "Vous avez des données, mais peu de visibilité.", text: "Nous organisons leur collecte et leur lecture dans un tableau de bord.", href: "/systemes-connectes" },
    { title: "Vous souhaitez lancer une plateforme.", text: "Nous cadrons les fonctionnalités, concevons l’architecture et développons le produit.", href: "/web-mobile" },
  ] : [
    { title: "Your operations rely on scattered files.", text: "A business application brings data, approvals and teams together.", href: "/web-mobile" },
    { title: "The same tasks take up your team’s time every day.", text: "We identify what can be automated and which checks must remain.", href: "/intelligence-artificielle" },
    { title: "You have data, but limited visibility.", text: "We organise collection and reporting in a dashboard.", href: "/systemes-connectes" },
    { title: "You want to launch a platform.", text: "We scope the features, design the architecture and develop the product.", href: "/web-mobile" },
  ];
  return <main className={styles.root} id="main-content">
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroLines} aria-hidden="true" />
      <div className={`app-shell ${styles.heroInner}`}>
        <div className={styles.heroCopy}><p className={styles.eyebrow}>{fr ? "INGÉNIERIE LOGICIELLE · IA · SYSTÈMES CONNECTÉS" : "SOFTWARE ENGINEERING · AI · CONNECTED SYSTEMS"}</p><h1 id="home-title">{fr ? "Votre activité évolue." : "Your business is changing."}<br /><span>{fr ? "Vos technologies aussi." : "Your technology should too."}</span></h1><p className={styles.intro}>{fr ? "ENOV CORP conçoit des logiciels, intègre l’intelligence artificielle et connecte vos systèmes pour faire évoluer vos opérations." : "ENOV CORP develops software, integrates artificial intelligence and connects systems to support your operations."}</p><div className={styles.actions}><Link className={styles.primary} href="/contact">{fr ? "Discuter de votre projet" : "Discuss your project"}</Link><Link className={styles.secondary} href="/expertises">{fr ? "Nos expertises" : "Our expertise"}</Link></div></div>
        <div className={styles.heroVisual}><EngineeringVisual /><div className={styles.visualCaption}><span>ENOV / ENGINEERING</span><span>{fr ? "Logiciel. Données. Terrain." : "Software. Data. Operations."}</span></div></div>
      </div>
      <div className={`app-shell ${styles.heroFoot}`}>{domains.map(domain => <Link href={domain.href} key={domain.key}>{domain.name}</Link>)}</div>
    </section>
    <section className={`app-shell ${styles.expertise}`} id="expertises"><Reveal><div className={styles.heading}><p className="brand-eyebrow">{fr ? "NOS EXPERTISES" : "OUR EXPERTISE"}</p><h2>{fr ? "Du logiciel au système connecté." : "From software to connected systems."}</h2><p>{fr ? "Trois domaines qui se complètent, selon les besoins de votre projet." : "Three complementary disciplines, brought together around your project."}</p></div></Reveal>
      {domains.map(domain => <Reveal key={domain.key}><article className={styles.domain}><div className={`${styles.domainVisual} ${styles[domain.key]}`}><EngineeringVisual variant={domain.key} /></div><div className={styles.domainBody}><p className={styles.domainLabel}>{domain.label}</p><h3>{domain.title}</h3><p>{domain.text}</p><ul>{domain.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link href={domain.href} className={styles.textLink}>{fr ? "Découvrir cette expertise" : "Explore this expertise"}</Link></div></article></Reveal>)}
    </section>
    <section className={styles.needs}><div className="app-shell"><Reveal><div className={styles.heading}><p className="brand-eyebrow">{fr ? "VOS ENJEUX" : "YOUR CHALLENGES"}</p><h2>{fr ? "Partons du problème à résoudre." : "Start with the problem to solve."}</h2></div><div className={styles.needsGrid}>{needs.map(need => <article key={need.href+need.title}><h3><Link href={need.href}>{need.title}</Link></h3><p>{need.text}</p></article>)}</div></Reveal></div></section>
    <section className={`app-shell ${styles.method}`}><Reveal><div className={styles.heading}><p className="brand-eyebrow">{fr ? "NOTRE DÉMARCHE" : "OUR APPROACH"}</p><h2>{fr ? "Un cadre clair, jusqu’à la mise en service." : "A clear process, through to delivery."}</h2></div><ProcessSteps items={deliverySteps[language]} /></Reveal></section>
    <section className={`app-shell ${styles.work}`}><Reveal>{work ?? <HomeWork />}</Reveal></section>
    <section className={styles.lab}><div className={`app-shell ${styles.labInner}`}><div className={styles.labMark} aria-hidden="true"><span /><span /><span /></div><Reveal><p className={styles.eyebrow}>ENOV / INNOVATION LAB</p><h2>{fr ? "Expérimenter avant de promettre." : "Test before making promises."}</h2><p>{fr ? "Notre démarche de R&D explore les usages de l’IA, de l’IoT et des systèmes embarqués. Les prototypes servent à vérifier la faisabilité. Ils ne sont pas présentés comme des produits disponibles." : "Our R&D approach explores AI, IoT and embedded systems. Prototypes establish feasibility; they are not presented as available products."}</p><Link href="/innovation" className={styles.secondary}>{fr ? "Notre démarche d’innovation" : "Our approach to innovation"}</Link></Reveal></div></section>
    <section className={`app-shell ${styles.academy}`}><Reveal><div><p className="brand-eyebrow">ENOV ACADEMY</p><h2>{fr ? "Transmettre les compétences." : "Sharing technical skills."}</h2><p>{fr ? "Des formations en développement, data, design et systèmes connectés, en complément de nos activités d’ingénierie." : "Training in development, data, design and connected systems, alongside our engineering work."}</p></div><Link href="/academy" className={styles.textLink}>{fr ? "Voir les programmes" : "View programmes"}</Link></Reveal></section>
    <section className={styles.final}><div className={`app-shell ${styles.finalInner}`}><div><p className="brand-eyebrow">{fr ? "PARLONS DE VOTRE PROJET" : "LET’S DISCUSS YOUR PROJECT"}</p><h2>{fr ? "Quel problème souhaitez-vous résoudre ?" : "What problem would you like to solve?"}</h2></div><div><Link href="/contact" className={styles.primary}>{fr ? "Discuter de votre projet" : "Discuss your project"}</Link><a href="mailto:contact@enovcorp.com">contact@enovcorp.com</a></div></div></section>
  </main>;
}
