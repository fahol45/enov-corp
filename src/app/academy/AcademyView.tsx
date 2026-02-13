"use client";

import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type AcademyCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
  };
  domains: {
    kicker: string;
    title: string;
    items: string[];
  };
  mission: {
    title: string;
    description: string;
  };
  resources: {
    title: string;
    items: string[];
  };
};

const academyCopy: Record<SupportedLanguage, AcademyCopy> = {
  fr: {
    hero: {
      kicker: "ENOV ACADEMY",
      title: "Le p\u00f4le formation d'ENOV CORP",
      description:
        "Enov Academy est d\u00e9di\u00e9e au d\u00e9veloppement des comp\u00e9tences dans les technologies innovantes.",
    },
    domains: {
      kicker: "Programmes",
      title: "Nous formons aux domaines suivants",
      items: [
        "Hydroponie intelligente & IoT",
        "D\u00e9veloppement web",
        "D\u00e9veloppement mobile",
        "IoT & robotique",
        "Infographie & design",
        "Design & mod\u00e9lisation 3D",
      ],
    },
    mission: {
      title: "Notre objectif est clair",
      description:
        "Former des talents capables de concevoir, d\u00e9velopper et piloter des projets technologiques concrets.",
    },
    resources: {
      title: "Ici, vous trouverez",
      items: [
        "Des contenus p\u00e9dagogiques",
        "Des annonces de formations",
        "Des opportunit\u00e9s",
        "Des \u00e9changes techniques",
        "Une communaut\u00e9 orient\u00e9e excellence",
      ],
    },
  },
  en: {
    hero: {
      kicker: "ENOV ACADEMY",
      title: "The training hub of ENOV CORP",
      description:
        "Enov Academy is dedicated to building skills in innovative technologies.",
    },
    domains: {
      kicker: "Programs",
      title: "We train in the following domains",
      items: [
        "Smart hydroponics & IoT",
        "Web development",
        "Mobile development",
        "IoT & robotics",
        "Infographics & design",
        "3D design & modeling",
      ],
    },
    mission: {
      title: "Our objective is clear",
      description:
        "Train talent capable of designing, developing, and leading real-world technology projects.",
    },
    resources: {
      title: "Here you will find",
      items: [
        "Learning resources",
        "Training announcements",
        "Opportunities",
        "Technical exchanges",
        "A community oriented toward excellence",
      ],
    },
  },
};

export function AcademyView() {
  const { language } = useLanguage();
  const t = academyCopy[language];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 right-8 h-72 w-72 rounded-full bg-rose-500/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-500/25 blur-3xl" />
      </div>
      <div className="app-shell section-flow">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/40 sm:p-6 lg:p-10">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">
              {t.hero.kicker}
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-lg text-slate-300 text-pretty text-left sm:text-justify">
              {t.hero.description}
            </p>
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              {t.domains.kicker}
            </p>
            <h2 className="text-3xl font-semibold">{t.domains.title}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.domains.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-rose-300" />
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-center shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <h2 className="text-3xl font-semibold">{t.mission.title}</h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            {t.mission.description}
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <h2 className="text-3xl font-semibold">{t.resources.title}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.resources.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-sky-300" />
                <span className="text-sm text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
