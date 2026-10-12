"use client";

import Link from "next/link";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type AboutCopy = {
  hero: { kicker: string; title: string; highlight: string; sub: string; cta: string };
  statsTitle: string;
  stats: Array<{ value: string; label: string }>;
  pillarsTitle: string;
  pillars: Array<{ num: string; title: string; tags: string; href: string }>;
  valuesTitle: string;
  values: Array<{ num: string; title: string }>;
  promiseTitle: string;
  promise: string;
  cta: { title: string; button: string };
};

const copy: Record<SupportedLanguage, AboutCopy> = {
  fr: {
    hero: {
      kicker: "À propos",
      title: "Serres, apps",
      highlight: "et formations.",
      sub: "On prend en charge le projet de A à Z — sans sous-traitance. Un seul interlocuteur du premier appel jusqu'à la mise en service.",
      cta: "Nous contacter",
    },
    pillarsTitle: "Ce qu'on fait concrètement.",
    pillars: [
      { num: "01", title: "Serres connectées", tags: "Capteurs installés. Arrosage automatisé. Données en temps réel sur votre téléphone.", href: "/hydroponie" },
      { num: "02", title: "Apps & Sites web", tags: "Android, iOS, web. Un seul interlocuteur. Livré en 3 mois.", href: "/web-mobile" },
      { num: "03", title: "Formation", tags: "8 participants max. Projet concret à rendre. Certificat Enov à la clé.", href: "/academy" },
    ],
    statsTitle: "En chiffres.",
    stats: [
      { value: "3", label: "Domaines maîtrisés" },
      { value: "< 3 mois", label: "De l'idée à la livraison" },
      { value: "8 max", label: "Participants par formation" },
      { value: "24h", label: "Délai de réponse garanti" },
    ],
    valuesTitle: "La façon dont on travaille.",
    values: [
      { num: "01", title: "On accepte un projet, on le livre" },
      { num: "02", title: "Vous parlez à la personne qui fait le travail" },
      { num: "03", title: "On reste disponible après la livraison" },
    ],
    promiseTitle: "Notre engagement.",
    promise: "Pas de sous-traitance. Pas de commercial entre vous et les techniciens. Quand on accepte un projet, on en prend la responsabilité du début à la fin — conception, développement, installation, formation et suivi.",
    cta: { title: "Un projet en tête. On vous répond en 24h.", button: "Nous contacter" },
  },
  en: {
    hero: {
      kicker: "About",
      title: "Greenhouses, apps",
      highlight: "and training.",
      sub: "We own the project end to end — no subcontracting. One contact from first call to deployment.",
      cta: "Contact us",
    },
    pillarsTitle: "What we concretely do.",
    pillars: [
      { num: "01", title: "Connected greenhouses", tags: "Sensors installed. Watering automated. Live data on your phone.", href: "/hydroponie" },
      { num: "02", title: "Apps & Websites", tags: "Android, iOS, web. One point of contact. Delivered in 3 months.", href: "/web-mobile" },
      { num: "03", title: "Training", tags: "Max 8 participants. Real project to complete. Enov certificate included.", href: "/academy" },
    ],
    statsTitle: "By the numbers.",
    stats: [
      { value: "3", label: "Domains mastered" },
      { value: "< 3 mo.", label: "From idea to delivery" },
      { value: "8 max", label: "Participants per training" },
      { value: "24h", label: "Guaranteed response time" },
    ],
    valuesTitle: "How we work.",
    values: [
      { num: "01", title: "We accept a project, we deliver it" },
      { num: "02", title: "You talk to the person doing the work" },
      { num: "03", title: "We stay available after delivery" },
    ],
    promiseTitle: "Our commitment.",
    promise: "No subcontracting. No sales reps between you and the engineers. When we take on a project, we own it from start to finish — design, development, installation, training and ongoing support.",
    cta: { title: "A project in mind. We reply within 24h.", button: "Contact us" },
  },
};

export function AProposView() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="interior-page app-shell about-page">
      <section className="interior-heading"><p className="brand-eyebrow">{t.hero.kicker} / ENOV CORP</p><h1>{t.hero.title}<br /><span>{t.hero.highlight}</span></h1><p>{t.hero.sub}</p><Link href="/contact" className="brand-button">{t.hero.cta} ?</Link></section>
      <section className="about-expertise"><h2>{t.pillarsTitle}</h2><div>{t.pillars.map(pillar => <Link key={pillar.num} href={pillar.href}><span>{pillar.num}</span><div><h3>{pillar.title}</h3><p>{pillar.tags}</p></div><span aria-hidden="true">?</span></Link>)}</div></section>
      <section className="about-values"><p className="brand-eyebrow">ENOV CORP</p><h2>{t.valuesTitle}</h2><div>{t.values.map(value => <article key={value.num}><span>{value.num}</span><h3>{value.title}</h3></article>)}</div></section>
      <section className="about-promise"><p className="brand-eyebrow">{t.promiseTitle}</p><p>{t.promise}</p></section>
      <section className="interior-cta"><h2>{language === "fr" ? "Parlons de votre projet." : "Let?s discuss your project."}</h2><Link href="/contact" className="brand-button">{t.cta.button} ?</Link></section>
    </main>
  );
}
