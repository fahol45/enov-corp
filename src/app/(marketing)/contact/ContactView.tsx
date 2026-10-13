"use client";

import Link from "next/link";
import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { PageHero } from "@/components/SiteSections";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ContactView.module.css";

const copy = {
  fr: { title: "Contactez", highlight: "ENOV CORP.", description: "Pour un projet, une formation ou une question.", label: "NOS COORDONNÉES", heading: "Email et téléphone.", text: "Vous pouvez nous écrire ici ou utiliser le formulaire.", email: "Par email", phone: "Par téléphone", form: {
    title: "Votre projet", description: "Les champs marqués d’un astérisque sont obligatoires.", fields: {
      name: { label: "Votre nom", placeholder: "Nom et prénom" }, email: { label: "Adresse email", placeholder: "vous@entreprise.com" },
      phone: { label: "Téléphone (optionnel)", placeholder: "+212 6 00 00 00 00" }, company: { label: "Entreprise (optionnel)", placeholder: "Votre organisation" },
      message: { label: "Votre besoin", placeholder: "Décrivez votre demande…" },
    }, submitLabel: "Envoyer mon message", successMessage: "Votre message a été reçu. Notre équipe reviendra vers vous.", errorMessage: "L’envoi a échoué. Vous pouvez nous écrire à contact@enovcorp.com.", requiredLabel: "*",
  } satisfies ContactFormCopy },
  en: { title: "Contact", highlight: "ENOV CORP.", description: "For a project, a course or a question.", label: "CONTACT DETAILS", heading: "Email and phone.", text: "Email us or use the form.", email: "By email", phone: "By phone", form: {
    title: "Your project", description: "Fields marked with an asterisk are required.", fields: {
      name: { label: "Your name", placeholder: "Full name" }, email: { label: "Email address", placeholder: "you@company.com" },
      phone: { label: "Phone (optional)", placeholder: "+212 6 00 00 00 00" }, company: { label: "Company (optional)", placeholder: "Your organisation" },
      message: { label: "Your needs", placeholder: "Describe your request…" },
    }, submitLabel: "Send my message", successMessage: "Your message has been received. Our team will get back to you.", errorMessage: "Sending failed. You can email contact@enovcorp.com.", requiredLabel: "*",
  } satisfies ContactFormCopy },
};
export function ContactView() {
  const { language } = useLanguage(); const t = copy[language];
  return <main><PageHero eyebrow="CONTACT / ENOV CORP" title={t.title} highlight={t.highlight} description={t.description} />
    <div className={`app-shell ${styles.layout}`}><section className={styles.info}><p className="brand-eyebrow">{t.label}</p><h2>{t.heading}</h2><p>{t.text}</p><div className={styles.channels}><Link href="mailto:contact@enovcorp.com"><span>{t.email}</span><strong>contact@enovcorp.com</strong><span aria-hidden="true">↗</span></Link><Link href="tel:+212645410864"><span>{t.phone}</span><strong>+212 6 45 41 08 64</strong><span aria-hidden="true">↗</span></Link></div></section><section className={styles.formPanel}><ContactForm copy={t.form} /></section></div>
  </main>;
}
