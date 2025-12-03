"use client";

import Link from "next/link";
import { ContactForm, type ContactFormCopy } from "@/components/ContactForm";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Channel = { label: string; value: string };
type Step = { title: string; description: string };
type Highlight = { label: string; value: string };

type ContactCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    channels: Channel[];
    primaryCta: string;
    secondaryCta: string;
    agenda: {
      title: string;
      availabilityPrefix: string;
      availabilityValue: string;
      modules: { label: string; detail: string }[];
      footer: string;
    };
  };
  steps: {
    kicker: string;
    title: string;
    items: Step[];
  };
  service: {
    kicker: string;
    title: string;
    highlights: Highlight[];
    note: string;
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
      agenda: {
        title: "Agenda studio",
        availabilityPrefix: "Dispo:",
        availabilityValue: "+3 slots",
        modules: [
          { label: "Atelier immersion", detail: "90 min / remote" },
          { label: "Visite terrain", detail: "Serres clients" },
          { label: "Sprint blueprint", detail: "5 jours design" },
        ],
        footer: "Nous r\u00e9pondrons avec un kit de cadrage",
      },
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
    service: {
      kicker: "Disponibilit\u00e9s",
      title: "Nos engagements de r\u00e9ponse",
      highlights: [
        { label: "R\u00e9ponse initiale", value: "-24h" },
        { label: "Kickoff moyen", value: "J+5" },
        { label: "Disponibilit\u00e9", value: "UTC+1 / UTC-5 / UTC+4" },
      ],
      note: "Vous pouvez aussi demander un canal d\u00e9di\u00e9 (Slack, Teams, Signal) pour suivre les chantiers en temps r\u00e9el.",
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
      agenda: {
        title: "Studio schedule",
        availabilityPrefix: "Availability:",
        availabilityValue: "+3 slots",
        modules: [
          { label: "Immersion workshop", detail: "90 min / remote" },
          { label: "Site visit", detail: "Client greenhouses" },
          { label: "Blueprint sprint", detail: "5-day design" },
        ],
        footer: "We reply with a scoping kit",
      },
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
    service: {
      kicker: "Availability",
      title: "Our response commitments",
      highlights: [
        { label: "First reply", value: "-24h" },
        { label: "Average kickoff", value: "Day +5" },
        { label: "Coverage", value: "UTC+1 / UTC-5 / UTC+4" },
      ],
      note: "Ask for a dedicated channel (Slack, Teams, Signal) to follow each workstream in real time.",
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
      <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.hero.kicker}</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{t.hero.title}</h1>
            <p className="text-lg text-slate-300">{t.hero.description}</p>
          </div>
          <div className="grid gap-4">
            {t.hero.channels.map((channel) => (
              <div
                key={channel.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-fuchsia-200">{channel.label}</p>
                <p className="mt-2 text-2xl font-semibold">{channel.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="mailto:enovcorporation@gmail.com"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-emerald-500 to-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-105 sm:w-auto"
            >
              {t.hero.primaryCta}
            </Link>
            <Link
              href="tel:+212645410864"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/5 sm:w-auto"
            >
              {t.hero.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-[420px] w-full max-w-[480px]">
            <div className="absolute inset-0 animate-pulse rounded-[3.5rem] bg-gradient-to-br from-fuchsia-500 via-emerald-500 to-indigo-500 blur-2xl" />
            <div className="relative flex h-full flex-col justify-between rounded-[3.5rem] border border-white/10 bg-slate-950/75 p-10 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{t.hero.agenda.title}</p>
                <p className="text-3xl font-semibold">
                  {t.hero.agenda.availabilityPrefix}{" "}
                  <span className="text-emerald-300">{t.hero.agenda.availabilityValue}</span>
                </p>
              </div>
              <div className="space-y-4 text-slate-200">
                {t.hero.agenda.modules.map((module) => (
                  <div key={module.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">{module.label}</p>
                    <p className="text-lg font-semibold">{module.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t.hero.agenda.footer}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-inner shadow-black/50">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.steps.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.steps.title}</h2>
            <div className="mt-6 space-y-4">
              {t.steps.items.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-emerald-500 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{step.title}</p>
                    <p className="text-sm text-slate-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-inner shadow-black/50">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.service.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.service.title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {t.service.highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.4em] text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-400">{t.service.note}</p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <ContactForm copy={t.form} />
      </section>
    </main>
  );
}
