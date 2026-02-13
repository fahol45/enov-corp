"use client";

import Link from "next/link";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Pillar = { title: string; description: string };

type Value = { title: string; description: string };

type AboutCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    bullets: string[];
    cta: string;
  };
  pillars: {
    title: string;
    description: string;
    items: Pillar[];
  };
  values: {
    title: string;
    items: Value[];
  };
  contact: {
    title: string;
    description: string;
    cta: string;
  };
};

const aboutCopy: Record<SupportedLanguage, AboutCopy> = {
  fr: {
    hero: {
      kicker: "À PROPOS",
      title: "Enov CORP, partenaire technologique de bout en bout",
      description:
        "Nous aidons les organisations à transformer leurs besoins en solutions utiles. Trois pôles complémentaires : hydroponie connectée, développement web & mobile, et formation via Enov Academy.",
      bullets: [
        "Solutions connectées simples à exploiter.",
        "Produits digitaux clairs et fiables.",
        "Compétences transférées à vos équipes.",
      ],
      cta: "Parler avec nous",
    },
    pillars: {
      title: "Nos pôles",
      description: "Une offre claire pour avancer vite et bien.",
      items: [
        {
          title: "Hydroponie intelligente & IoT",
          description:
            "Automatisation, capteurs et pilotage en temps réel pour vos systèmes agricoles.",
        },
        {
          title: "Développement Web & Mobile",
          description:
            "Applications et dashboards modernes pour décider et agir simplement.",
        },
        {
          title: "Enov Academy",
          description:
            "Formations pratiques pour étudiants et professionnels, orientées projets.",
        },
      ],
    },
    values: {
      title: "Notre manière de travailler",
      items: [
        {
          title: "Clarté",
          description:
            "Un discours simple, des choix compréhensibles, des livrables utiles.",
        },
        {
          title: "Pragmatisme",
          description:
            "Des solutions réalistes, testées et adaptées à votre terrain.",
        },
        {
          title: "Engagement",
          description:
            "Nous restons présents après la livraison pour optimiser et former.",
        },
      ],
    },
    contact: {
      title: "Un projet en tête ?",
      description:
        "Parlons de vos objectifs et construisons une solution claire et efficace.",
      cta: "Contacter Enov CORP",
    },
  },
  en: {
    hero: {
      kicker: "ABOUT",
      title: "Enov CORP, your end-to-end technology partner",
      description:
        "We help organizations turn needs into useful solutions. Three complementary pillars: smart hydroponics, web & mobile development, and training through Enov Academy.",
      bullets: [
        "Connected systems that are easy to run.",
        "Clear, reliable digital products.",
        "Skills transferred to your teams.",
      ],
      cta: "Talk with us",
    },
    pillars: {
      title: "Our pillars",
      description: "A clear offer to move fast and confidently.",
      items: [
        {
          title: "Smart Hydroponics & IoT",
          description:
            "Automation, sensors and real-time control for agricultural systems.",
        },
        {
          title: "Web & Mobile Development",
          description:
            "Modern apps and dashboards to decide and act simply.",
        },
        {
          title: "Enov Academy",
          description:
            "Hands-on training for students and professionals, project-driven.",
        },
      ],
    },
    values: {
      title: "How we work",
      items: [
        {
          title: "Clarity",
          description:
            "Simple language, understandable choices, useful deliverables.",
        },
        {
          title: "Pragmatism",
          description:
            "Realistic solutions, tested and adapted to your field.",
        },
        {
          title: "Commitment",
          description:
            "We stay after delivery to optimize and train your teams.",
        },
      ],
    },
    contact: {
      title: "Have a project in mind?",
      description:
        "Tell us your goals and we will build a clear and efficient solution.",
      cta: "Contact Enov CORP",
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
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/40 sm:p-10">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">
              {t.hero.kicker}
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-lg text-slate-300 text-pretty">
              {t.hero.description}
            </p>
            <ul className="space-y-2 text-sm text-slate-200 sm:text-base">
              {t.hero.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-slate-900 transition hover:scale-105 sm:w-auto"
            >
              {t.hero.cta}
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">{t.pillars.title}</h2>
            <p className="mt-2 text-base text-slate-300">
              {t.pillars.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {t.pillars.items.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/30"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
                  {item.title}
                </p>
                <p className="mt-3 text-sm text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 sm:p-8">
          <h2 className="text-3xl font-semibold">{t.values.title}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.values.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
              >
                <p className="text-base font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-center shadow-2xl sm:p-8">
          <h2 className="text-3xl font-semibold">{t.contact.title}</h2>
          <p className="mt-3 text-base text-slate-300">
            {t.contact.description}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
          >
            {t.contact.cta}
          </Link>
        </section>
      </div>
    </main>
  );
}