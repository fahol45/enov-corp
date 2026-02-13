"use client";

import Link from "next/link";
import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Channel = { label: string; value: string };

type ContactCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    channels: Channel[];
    primaryCta: string;
    secondaryCta: string;
  };
  reassurance: {
    title: string;
    items: string[];
  };
  form: ContactFormCopy;
};

const contactCopy: Record<SupportedLanguage, ContactCopy> = {
  fr: {
    hero: {
      kicker: "CONTACT",
      title: "Parlons de votre projet",
      description:
        "Enov CORP réunit solutions connectées, produits digitaux et formation pour des résultats concrets. Dites-nous ce que vous voulez construire, nous vous guidons.",
      channels: [
        { label: "Email", value: "enovcorporation@gmail.com" },
        { label: "Téléphone", value: "+212 6 45 41 08 64" },
      ],
      primaryCta: "Envoyer un mail",
      secondaryCta: "Appeler",
    },
    reassurance: {
      title: "Ce que vous obtenez",
      items: [
        "Une réponse claire sous 24h",
        "Un premier plan d'action simple",
        "Un interlocuteur unique",
      ],
    },
    form: {
      title: "Envoyer une demande",
      description:
        "Expliquez votre besoin, nous préparons une réponse rapide et utile.",
      fields: {
        name: { label: "Nom complet", placeholder: "Jane Dupont" },
        email: { label: "Email professionnel", placeholder: "vous@entreprise.com" },
        phone: { label: "Téléphone", placeholder: "+212 6 45 41 08 64" },
        company: { label: "Entreprise / site", placeholder: "Enov CORP" },
        message: {
          label: "Votre besoin",
          placeholder: "Décrivez votre projet en quelques lignes...",
        },
      },
      submitLabel: "Envoyer",
      successMessage: "Merci ! Nous revenons vers vous très vite.",
      errorMessage: "Impossible d'envoyer le message. Réessayez ou contactez-nous directement.",
      requiredLabel: "*",
    },
  },
  en: {
    hero: {
      kicker: "CONTACT",
      title: "Let\'s talk about your project",
      description:
        "Enov CORP brings connected solutions, digital products, and training to deliver real results. Tell us what you need, we will guide you.",
      channels: [
        { label: "Email", value: "enovcorporation@gmail.com" },
        { label: "Phone", value: "+212 6 45 41 08 64" },
      ],
      primaryCta: "Send an email",
      secondaryCta: "Call",
    },
    reassurance: {
      title: "What you get",
      items: [
        "A clear reply within 24h",
        "A simple first action plan",
        "One dedicated point of contact",
      ],
    },
    form: {
      title: "Send a request",
      description: "Share your need and we will reply quickly with a useful plan.",
      fields: {
        name: { label: "Full name", placeholder: "Jane Doe" },
        email: { label: "Work email", placeholder: "you@company.com" },
        phone: { label: "Phone", placeholder: "+212 6 45 41 08 64" },
        company: { label: "Company / site", placeholder: "Enov CORP" },
        message: {
          label: "Your need",
          placeholder: "Describe your project in a few lines...",
        },
      },
      submitLabel: "Send",
      successMessage: "Thanks! We will get back to you quickly.",
      errorMessage: "Unable to send the message. Please try again or contact us directly.",
      requiredLabel: "*",
    },
  },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = contactCopy[language];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute top-0 right-16 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl" />
      </div>
      <div className="app-shell section-flow">
        <section className="grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/50 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.5em] text-slate-400">
                {t.hero.kicker}
              </p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                {t.hero.title}
              </h1>
              <p className="text-base text-slate-300 text-pretty sm:text-lg">
                {t.hero.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.hero.channels.map((channel) => (
                <div
                  key={channel.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200">
                    {channel.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold break-all">
                    {channel.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="mailto:enovcorporation@gmail.com"
                className="inline-flex w-full min-w-[180px] items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-emerald-500 to-indigo-500 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:scale-105 sm:w-auto"
              >
                {t.hero.primaryCta}
              </Link>
              <Link
                href="tel:+212645410864"
                className="inline-flex w-full min-w-[180px] items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/5 sm:w-auto"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h2 className="text-2xl font-semibold">{t.reassurance.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {t.reassurance.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-inner shadow-black/40">
          <ContactForm copy={t.form} />
        </section>
      </div>
    </main>
  );
}