"use client";

import Link from "next/link";
import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type ContactCopy = {
  hero: { kicker: string; title: string; highlight: string; sub: string };
  channels: Array<{ label: string; value: string; href: string }>;
  form: ContactFormCopy;
};

const copy: Record<SupportedLanguage, ContactCopy> = {
  fr: {
    hero: {
      kicker: "Contact",
      title: "Décrivez ce que vous voulez.",
      highlight: "On vous répond en 24h.",
      sub: "Envoyez le formulaire ou appelez. On lit, on analyse, on vous rappelle — pas un commercial, la personne qui fera le travail.",
    },
    channels: [
      { label: "Email", value: "contact@enovcorp.com", href: "mailto:contact@enovcorp.com" },
      { label: "Téléphone", value: "+212 6 45 41 08 64", href: "tel:+212645410864" },
    ],
    form: {
      title: "Décrivez votre projet",
      description: "On lit chaque message et on répond vite.",
      fields: {
        name: { label: "Votre nom", placeholder: "Fatima Zahra" },
        email: { label: "Votre email", placeholder: "vous@exemple.com" },
        phone: { label: "Téléphone (optionnel)", placeholder: "+212 6 00 00 00 00" },
        company: { label: "Entreprise ou site", placeholder: "Mon entreprise" },
        message: { label: "Votre besoin", placeholder: "Ex. : je cherche une app de suivi pour mes équipes terrain, ou je veux connecter ma serre..." },
      },
      submitLabel: "Envoyer",
      successMessage: "Message reçu ! On revient vers vous très vite.",
      errorMessage: "Impossible d'envoyer. Écrivez-nous à contact@enovcorp.com",
      requiredLabel: "*",
    },
  },
  en: {
    hero: {
      kicker: "Contact",
      title: "Let?s talk about your project.",
      highlight: "Build what comes next.",
      sub: "Send the form or call. We read, we assess, we call back — not a salesperson, the person who will do the work.",
    },
    channels: [
      { label: "Email", value: "contact@enovcorp.com", href: "mailto:contact@enovcorp.com" },
      { label: "Phone", value: "+212 6 45 41 08 64", href: "tel:+212645410864" },
    ],
    form: {
      title: "Describe your project",
      description: "We read every message and reply fast.",
      fields: {
        name: { label: "Your name", placeholder: "John Doe" },
        email: { label: "Your email", placeholder: "you@example.com" },
        phone: { label: "Phone (optional)", placeholder: "+212 6 00 00 00 00" },
        company: { label: "Company or site", placeholder: "My company" },
        message: { label: "Your need", placeholder: "E.g.: I need a field team tracking app, or I want to connect my greenhouse..." },
      },
      submitLabel: "Send",
      successMessage: "Message received! We'll get back to you very soon.",
      errorMessage: "Couldn't send. Email us at contact@enovcorp.com",
      requiredLabel: "*",
    },
  },
};

export function ContactView() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="interior-page app-shell">
      <div className="contact-layout">
        <section className="contact-intro">
          <p className="brand-eyebrow">{t.hero.kicker}</p>
          <h1>{t.hero.title}<br /><span>{t.hero.highlight}</span></h1>
          <p>{t.hero.sub}</p>
          <div className="contact-channels">{t.channels.map(channel => <Link key={channel.label} href={channel.href}><span>{channel.label}</span><strong>{channel.value}</strong><span aria-hidden="true">?</span></Link>)}</div>
        </section>
        <section className="contact-form-panel"><ContactForm copy={t.form} /></section>
      </div>
    </main>
  );
}
