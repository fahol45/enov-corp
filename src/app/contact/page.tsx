"use client";

import Link from "next/link";
import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Channel = { label: string; value: string };
type Step = { title: string; description: string };
type ContactCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    channels: Channel[];
    primaryCta: string;
    secondaryCta: string;
  };
  steps: {
    kicker: string;
    title: string;
    items: Step[];
  };
  form: ContactFormCopy;
};

const contactCopy: Record<SupportedLanguage, ContactCopy> = {
  fr: {
    hero: {
      kicker: "Contact ENOV CORP",
      title: "Contact direct avec les squads Hydroponie x IoT",
      description:
        "Expliquez vos objectifs (capteurs, edge, exp\u00e9rience op\u00e9rateur). Nous r\u00e9pondons en moins de 24h avec les bons experts et un premier plan d'action.",
      channels: [
        { label: "Email", value: "enovcorporation@gmail.com" },
        { label: "Ops Center", value: "+212 6 45 41 08 64" },
      ],
      primaryCta: "Envoyer un mail",
      secondaryCta: "Appeler",
    },
    steps: {
      kicker: "Comment \u00e7a se passe ?",
      title: "Un d\u00e9marrage simple en trois \u00e9tapes",
      items: [
        {
          title: "Brief & NDA",
          description:
            "Nous s\u00e9curisons vos donn\u00e9es, cadrons les objectifs et validons les indicateurs prioritaires.",
        },
        {
          title: "Visite terrain ou visio",
          description: "Nos leads se d\u00e9placent sur site ou pr\u00e9parent un atelier remote de 90 minutes.",
        },
        {
          title: "Blueprint & chiffrage",
          description: "Sous 5 jours ouvrables, vous recevez parcours cible, planning et budget d\u00e9taill\u00e9.",
        },
      ],
    },
    form: {
      title: "Envoyer une fiche projet",
      description:
        "Partagez votre contexte, vos objectifs et les prochains jalons. Nous revenons vers vous avec un plan d\u00e9taill\u00e9.",
      fields: {
        name: { label: "Nom complet", placeholder: "Jane Dupont" },
        email: { label: "Email professionnel", placeholder: "vous@entreprise.com" },
        phone: { label: "T\u00e9l\u00e9phone", placeholder: "+212 6 45 41 08 64" },
        company: { label: "Entreprise / site", placeholder: "Ferme ENOV Casablanca" },
        message: {
          label: "Brief / besoins",
          placeholder: "Expliquez votre projet, les serres concern\u00e9es, la priorit\u00e9...",
        },
      },
      submitLabel: "Envoyer le brief",
      successMessage: "Merci ! Nous revenons vers vous dans les prochaines 24h.",
      errorMessage: "Impossible d'envoyer le message. R\u00e9essayez ou contactez-nous directement.",
      requiredLabel: "*",
    },
  },
  en: {
    hero: {
      kicker: "Contact ENOV CORP",
      title: "Talk directly with the Hydroponics x IoT squads",
      description:
        "Share your goals (sensors, edge, operator experience). We reply in under 24h with the right experts and a first action plan.",
      channels: [
        { label: "Email", value: "enovcorporation@gmail.com" },
        { label: "Ops Center", value: "+212 6 45 41 08 64" },
      ],
      primaryCta: "Send an email",
      secondaryCta: "Call us",
    },
    steps: {
      kicker: "How does it work?",
      title: "A simple three-step kickoff",
      items: [
        {
          title: "Brief & NDA",
          description:
            "We secure your data, align on objectives and lock the key metrics we will track.",
        },
        {
          title: "Site visit or video session",
          description: "Leads travel on-site or host a 90-minute remote workshop.",
        },
        {
          title: "Blueprint & budget",
          description: "Within five business days you get the target journey, planning and detailed budget.",
        },
      ],
    },
    form: {
      title: "Send your project brief",
      description:
        "Share the context, goals and upcoming milestones. We will follow up within 24 hours with a tailored plan.",
      fields: {
        name: { label: "Full name", placeholder: "Jane Doe" },
        email: { label: "Work email", placeholder: "you@company.com" },
        phone: { label: "Phone", placeholder: "+212 6 45 41 08 64" },
        company: { label: "Company / site", placeholder: "ENOV Farm Casablanca" },
        message: {
          label: "Brief / needs",
          placeholder: "Describe your project, affected greenhouses, priorities...",
        },
      },
      submitLabel: "Send the brief",
      successMessage: "Thanks! We will get back to you within the next 24 hours.",
      errorMessage: "Unable to send your message. Please try again or contact us directly.",
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
        <section className="relative grid w-full gap-10 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/50 sm:p-8 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] lg:gap-14">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.hero.kicker}</p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{t.hero.title}</h1>
            <p className="text-base text-slate-300 sm:text-lg">{t.hero.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.hero.channels.map((channel) => (
              <div
                key={channel.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200">{channel.label}</p>
                <p className="mt-2 text-2xl font-semibold">{channel.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="mailto:enovcorporation@gmail.com"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-emerald-500 to-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-105"
            >
              {t.hero.primaryCta}
            </Link>
            <Link
              href="tel:+212645410864"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/5"
            >
              {t.hero.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/50 sm:p-8">
          <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.steps.kicker}</p>
          <h2 className="text-3xl font-semibold">{t.steps.title}</h2>
          <div className="mt-6 space-y-4">
            {t.steps.items.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-emerald-500 text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{step.title}</p>
                  <p className="text-sm text-slate-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-inner shadow-black/40 sm:p-8">
        <ContactForm copy={t.form} />
      </section>
    </div>
    </main>
  );
}
