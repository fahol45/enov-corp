"use client";

import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Detail = { title: string; value: string; accent: string };
type Bullet = { title: string; description: string };
type Stat = { value: string; caption: string };

type ChronologieCopy = {
  hero: {
    label: string;
    span: string;
    details: Detail[];
    footer: string;
  };
  mission: {
    kicker: string;
    title: string;
    description: string;
    bullets: Bullet[];
  };
  focus: {
    kicker: string;
    title: string;
    description: string;
    stats: Stat[];
  };
};

const chronologieCopy: Record<SupportedLanguage, ChronologieCopy> = {
  fr: {
    hero: {
      label: "Chronologie",
      span: "2024 - Aujourd'hui",
      details: [
        { title: "Studio pilote", value: "Marrakech", accent: "text-amber-200" },
        { title: "\u00c9quipe", value: "5 experts noyau", accent: "text-rose-200" },
        { title: "Programmes", value: "3 MVP livr\u00e9s", accent: "text-indigo-200" },
      ],
      footer: "Pr\u00e9sence initiale Marrakech",
    },
    mission: {
      kicker: "Studio pilote",
      title: "Ce que nous orchestrons sur le terrain",
      description:
        "Nous op\u00e9rons depuis Marrakech pour connecter hydroponie, IoT et applications m\u00e9tiers. Chaque sprint rapproche nos MVP d'une exploitation totalement autonome.",
      bullets: [
        {
          title: "Cadre op\u00e9rationnel",
          description:
            "Mise en place de routines quotidiennes et d'un lab edge computing pour simuler nos sc\u00e9narios.",
        },
        {
          title: "Partenaires locaux",
          description:
            "Fermes et ateliers s'appuient sur notre studio pour co-construire des exp\u00e9riences web et mobiles.",
        },
        {
          title: "Boucles d'apprentissage",
          description:
            "Les retours terrain alimentent nos tableaux de bord et guident la roadmap data & logiciel.",
        },
      ],
    },
    focus: {
      kicker: "\u00c9tapes",
      title: "Ce que nous construisons actuellement",
      description:
        "Nous d\u00e9ployons nos premi\u00e8res plateformes hydroponie + IoT, en livrant des MVP centr\u00e9s op\u00e9rateurs et d\u00e9cisionnaires.",
      stats: [
        { value: "3", caption: "Serres pilotes accompagn\u00e9es" },
        { value: "5", caption: "Experts noyau mobilis\u00e9s" },
        { value: "3 MVP", caption: "Logiciels livr\u00e9s \u00e0 ce jour" },
      ],
    },
  },
  en: {
    hero: {
      label: "Timeline",
      span: "2024 - Today",
      details: [
        { title: "Pilot studio", value: "Marrakech", accent: "text-amber-200" },
        { title: "Core team", value: "5 experts", accent: "text-rose-200" },
        { title: "Programs", value: "3 MVPs shipped", accent: "text-indigo-200" },
      ],
      footer: "Initial presence in Marrakech",
    },
    mission: {
      kicker: "Pilot studio",
      title: "What we orchestrate on the ground",
      description:
        "Based in Marrakech, we connect hydroponics, IoT and business applications. Every sprint brings our MVPs closer to autonomous operations.",
      bullets: [
        {
          title: "Operational frame",
          description:
            "Daily runbooks and an edge-computing lab let us simulate the automation scenarios before rollout.",
        },
        {
          title: "Local partners",
          description:
            "Farms and workshops rely on the studio to co-build premium web and mobile experiences.",
        },
        {
          title: "Learning loops",
          description:
            "Field feedback feeds our dashboards and drives the roadmap for data and software.",
        },
      ],
    },
    focus: {
      kicker: "Milestones",
      title: "What we are building right now",
      description:
        "We are delivering the first hydroponics + IoT platforms, shipping MVPs for operators and decision makers.",
      stats: [
        { value: "3", caption: "Pilot greenhouses supported" },
        { value: "5", caption: "Core experts engaged" },
        { value: "3 MVPs", caption: "Software shipped so far" },
      ],
    },
  },
};

export default function ChronologiePage() {
  const { language } = useLanguage();
  const t = chronologieCopy[language];

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="app-shell section-flow relative">
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/40 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/20 via-rose-500/25 to-indigo-500/20 opacity-90 blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-300">
                {t.hero.label}
              </p>
              <p className="text-4xl font-bold leading-tight sm:text-5xl">
                {t.hero.span}
              </p>
              <div className="space-y-4">
                {t.hero.details.map((detail) => (
                  <div
                    key={detail.title}
                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 shadow-inner shadow-black/50"
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.45em] text-slate-400">
                      {detail.title}
                    </p>
                    <p className={`mt-1 text-2xl font-semibold ${detail.accent}`}>
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[0.6rem] uppercase tracking-[0.55em] text-slate-400">
                {t.hero.footer}
              </p>
            </div>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 backdrop-blur">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.45em] text-amber-200">
                  {t.mission.kicker}
                </p>
                <h2 className="text-2xl font-semibold sm:text-3xl">{t.mission.title}</h2>
                <p className="text-sm text-slate-200 text-pretty">{t.mission.description}</p>
              </div>
              <div className="mt-6 space-y-4">
                {t.mission.bullets.map((bullet) => (
                  <div
                    key={bullet.title}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40"
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.35em] text-pink-200">
                      {bullet.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-200">{bullet.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-center shadow-inner shadow-black/40 sm:p-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">
              {t.focus.kicker}
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t.focus.title}</h2>
            <p className="text-base text-slate-300 sm:text-lg">{t.focus.description}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {t.focus.stats.map((stat) => (
              <div
                key={stat.caption}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/40"
              >
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.caption}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
