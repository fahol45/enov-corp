"use client";

import Link from "next/link";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Pillar = { title: string; description: string };
type Stat = { value: string; label: string };
type Commitment = Pillar;

type AboutCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    pillars: Pillar[];
    cta: string;
  };
  impact: {
    kicker: string;
    title: string;
    description: string;
    stats: Stat[];
  };
  commitments: {
    items: Commitment[];
  };
};

const aboutCopy: Record<SupportedLanguage, AboutCopy> = {
  fr: {
    hero: {
      kicker: "ADN ENOV",
      title: "Une \u00e9quipe hybride qui relie terrain hydroponique, IoT et produit digital",
      description:
        "N\u00e9e dans les serres et ateliers de production, ENOV associe automation IoT, edge computing, design produit et apps web/mobile afin de livrer des plateformes fiables pour les agriculteurs, op\u00e9rateurs et dirigeants qui acc\u00e9l\u00e8rent la transition alimentaire.",
      pillars: [
        {
          title: "Innovation terrain",
          description:
            "Nos squads s'installent dans les fermes et ateliers clients pour co-construire capteurs, passerelles edge et outils digitaux avec les op\u00e9rateurs.",
        },
        {
          title: "Culture craft",
          description:
            "Designers, ing\u00e9nieurs, d\u00e9veloppeurs web/mobile et data scientists partagent le m\u00eame backlog pour prototyper vite et it\u00e9rer jusqu'\u00e0 la mise en production.",
        },
        {
          title: "Produits web & mobile",
          description:
            "Portails web, applications mobiles et workflows front-office sont con\u00e7us et op\u00e9r\u00e9s par ENOV pour donner aux \u00e9quipes terrain, vente et direction une vision temps r\u00e9el.",
        },
        {
          title: "Impact mesurable",
          description:
            "Chaque lot livre inclut des KPI carbone, eau, \u00e9nergie et business, diffus\u00e9s dans des dashboards multi-support pour piloter les gains obtenus.",
        },
      ],
      cta: "\u00c9changer avec nous",
    },
    impact: {
      kicker: "\u00c9tapes",
      title: "Ce que nous construisons actuellement",
      description:
        "Nous d\u00e9ployons nos premi\u00e8res plateformes hydroponie + IoT en construisant nos MVP avec les fermes pilotes.",
      stats: [
        { value: "3", label: "Serres pilotes en cadrage" },
        { value: "2", label: "MVP logiciels livr\u00e9s" },
        { value: "1 r\u00e9gion", label: "Pr\u00e9sence terrain locale" },
      ],
    },
    commitments: {
      items: [
        {
          title: "Partage de connaissance",
          description:
            "Documentation vivante, formations et rituels d'adoption pour rendre vos \u00e9quipes autonomes rapidement.",
        },
        {
          title: "Exigence s\u00e9curit\u00e9",
          description:
            "Audit code, runbooks, simulations d'incident et support 24/7 pour s\u00e9curiser capteurs, APIs et applications.",
        },
        {
          title: "Responsabilit\u00e9 climat",
          description:
            "Mesures d'empreinte eau/\u00e9nergie int\u00e9gr\u00e9es dans les dashboards pour suivre l'impact de chaque projet.",
        },
      ],
    },
  },
  en: {
    hero: {
      kicker: "ENOV DNA",
      title: "A hybrid team linking hydroponic fields, IoT and digital products",
      description:
        "Born inside greenhouses and production floors, ENOV blends IoT automation, edge computing, product design and web/mobile apps to deliver reliable platforms for growers, operators and leaders speeding up the food transition.",
      pillars: [
        {
          title: "Field innovation",
          description:
            "Squads embed within farms and workshops to co-build sensors, edge gateways and digital tools with operators.",
        },
        {
          title: "Craft culture",
          description:
            "Designers, engineers, mobile developers and data scientists share one backlog, prototype fast and iterate until production.",
        },
        {
          title: "Web & mobile products",
          description:
            "Web portals, mobile apps and front-office workflows are designed and operated by ENOV to give field, sales and leadership teams real-time visibility.",
        },
        {
          title: "Measurable impact",
          description:
            "Every delivery ships with carbon, water, energy and business KPIs inside shared dashboards to steer the gains.",
        },
      ],
      cta: "Talk with us",
    },
    impact: {
      kicker: "Milestones",
      title: "What we are building right now",
      description:
        "We are rolling out our first hydroponics + IoT platforms, co-designing MVPs with pilot farms.",
      stats: [
        { value: "3", label: "Pilot greenhouses in scope" },
        { value: "2", label: "Software MVPs delivered" },
        { value: "1 region", label: "Local field presence" },
      ],
    },
    commitments: {
      items: [
        {
          title: "Knowledge sharing",
          description:
            "Living documentation, training and adoption rituals so your teams become autonomous fast.",
        },
        {
          title: "Security first",
          description:
            "Code reviews, runbooks, incident drills and 24/7 support to secure sensors, APIs and apps.",
        },
        {
          title: "Climate focus",
          description:
            "Water/energy footprint measurements embedded in dashboards to track every project's impact.",
        },
      ],
    },
  },
};

export default function AProposPage() {
  const { language } = useLanguage();
  const t = aboutCopy[language];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-24 h-72 w-72 rounded-full bg-amber-400/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
      </div>
      <div className="app-shell section-flow">
        <section className="relative flex flex-col gap-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 pb-10 shadow-2xl shadow-black/40 sm:p-6 sm:pb-14 lg:flex-row lg:items-center lg:p-10 lg:pb-16">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.hero.kicker}</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{t.hero.title}</h1>
            <p className="text-lg text-slate-300 text-pretty text-left sm:text-justify">{t.hero.description}</p>
          </div>
          <div className="grid gap-4">
            {t.hero.pillars.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-amber-200">{item.title}</p>
                <p className="mt-2 text-slate-200 text-pretty text-left sm:text-justify">{item.description}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:scale-105 sm:w-auto"
          >
            {t.hero.cta}
          </Link>
        </div>
        </section>
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/50 sm:p-6 md:p-8">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.impact.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.impact.title}</h2>
            <p className="text-base text-slate-300">{t.impact.description}</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {t.impact.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center shadow-lg shadow-black/40"
              >
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="grid gap-6 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8 lg:grid-cols-3">
          {t.commitments.items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.4em] text-amber-200">{item.title}</p>
              <p className="mt-3 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
