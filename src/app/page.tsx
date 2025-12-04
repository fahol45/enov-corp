"use client";

import Link from "next/link";
import { DigitalTwinCard } from "@/components/DigitalTwinCard";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Track = {
  title: string;
  description: string;
  highlights: string[];
};

type Reason = {
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
};

type LandingCopy = {
  hero: {
    title: string;
    description: string;
    bullets: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  fusion: {
    kicker: string;
    title: string;
    description: string;
    tracks: Track[];
  };
  reasons: {
    title: string;
    items: Reason[];
  };
  timeline: {
    kicker: string;
    title: string;
    description: string;
    steps: Step[];
  };
  contact: {
    kicker: string;
    title: string;
    description: string;
    cta: string;
  };
};

const landingCopy: Record<SupportedLanguage, LandingCopy> = {
  fr: {
    hero: {
      title: "Enov CORP simplifie vos serres connect\u00e9es",
      description:
        "Nous combinons hydroponie, capteurs IoT et logiciels pour garantir des cultures stables faciles \u00e0 piloter.",
      bullets: [
        "Capteurs et actionneurs reli\u00e9s \u00e0 une m\u00eame couche de contr\u00f4le coordonnent l'irrigation.",
        "Recettes eau + nutriments se recalculent automatiquement selon les signaux terrain et les mod\u00e8les IA.",
        "Edge computing d\u00e9cide en local m\u00eame hors connexion avant de synchroniser le cloud.",
        "Applications web et mobiles permettent de superviser, diagnostiquer et guider vos \u00e9quipes.",
      ],
      primaryCta: "Voir nos solutions",
      secondaryCta: "Parler \u00e0 un architecte",
    },
    fusion: {
      kicker: "Hydroponie x IoT & Edge",
      title: "Une seule stack pour piloter vos cultures",
      description:
        "Nous combinons la pr\u00e9cision agronomique des syst\u00e8mes hydroponiques et la puissance d'une infrastructure IoT & Edge pour offrir une exp\u00e9rience continue, de la culture au cloud.",
      tracks: [
        {
          title: "Hydroponie intelligente",
          description:
            "Architecture hydroponique modulaire pilot\u00e9e par la donn\u00e9e pour garder la plante dans sa zone de confort.",
          highlights: [
            "Recettes eau + nutriments ajust\u00e9es automatiquement selon la g\u00e9n\u00e9tique et le cycle cultural.",
            "Surveillance continue du climat, de la conductivit\u00e9 et des flux \u00e0 chaque \u00e9tage nutritif.",
            "Actionneurs, pompes et lignes d'irrigation synchronis\u00e9s avec les sc\u00e9narios Edge.",
          ],
        },
        {
          title: "IoT & Edge computing",
          description:
            "Infrastructure IoT con\u00e7ue pour absorber les signaux terrain, les traiter en local et remonter des informations actionnables.",
          highlights: [
            "Capteurs plug-and-play, passerelles r\u00e9silientes et r\u00e9seau priv\u00e9 s\u00e9curis\u00e9.",
            "Edge computing pour agr\u00e9ger, nettoyer et agir sans latence m\u00eame hors connexion.",
            "Data lake cloud, API et connecteurs vers vos applications et partenaires.",
          ],
        },
      ],
    },
    reasons: {
      title: "Pourquoi confier la convergence Hydroponie + IoT \u00e0 Enov CORP ?",
      items: [
        {
          title: "Approche syst\u00e8me unique",
          description:
            "Nous alignons architecture hydroponique, IoT, edge et logiciels sur les m\u00eames objectifs business.",
        },
        {
          title: "Data & IA op\u00e9rationnelles",
          description:
            "Chaque mesure devient une recommandation concr\u00e8te gr\u00e2ce \u00e0 nos mod\u00e8les, r\u00e8gles m\u00e9tiers et boucles d'automatisation.",
        },
        {
          title: "Industrialisation ma\u00eetris\u00e9e",
          description:
            "M\u00e9thodologie de d\u00e9ploiement s\u00e9curis\u00e9e, tests de redondance et observabilit\u00e9 bout en bout.",
        },
        {
          title: "Support des \u00e9quipes en continu",
          description:
            "Formation, documentation vivante et assistance 24/7 pour faire monter vos \u00e9quipes en autonomie.",
        },
      ],
    },
    timeline: {
      kicker: "Parcours Hydroponie + IoT",
      title: "Notre trajectoire d'int\u00e9gration unifi\u00e9e",
      description:
        "Une m\u00e9thode \u00e9prouv\u00e9e pour passer de la vision \u00e0 l'op\u00e9rationnel tout en gardant vos cultures sous contr\u00f4le.",
      steps: [
        {
          title: "Co-design agronomique & IoT",
          description:
            "Diagnostic de vos serres, cartographie des flux physiques et data, d\u00e9finition des sc\u00e9narios d'automatisation.",
        },
        {
          title: "Int\u00e9gration unifi\u00e9e",
          description:
            "Installation synchronis\u00e9e des circuits hydroponiques, capteurs IoT, passerelles edge et jumeau num\u00e9rique.",
        },
        {
          title: "Pilotage continu",
          description:
            "Optimisation des param\u00e8tres, am\u00e9lioration des mod\u00e8les, support op\u00e9rateur et reporting de vos KPI.",
        },
      ],
    },
    contact: {
      kicker: "Pr\u00eat \u00e0 synchroniser vos cultures ?",
      title: "Parlons convergence Hydroponie + IoT & Edge",
      description:
        "Discutons de vos objectifs, de la maturit\u00e9 de vos serres et des leviers technologiques \u00e0 activer pour vous rapprocher d'une exploitation autonome.",
      cta: "Contactez Enov CORP",
    },
  },
  en: {
    hero: {
      title: "Enov CORP unifies hydroponics with IoT & Edge.",
      description:
        "We bring together automatic watering, smart sensors and software so your greenhouses stay resilient and run on their own.",
      bullets: [
        "Sensors, actuators and irrigation lines steered by a single control layer.",
        "Nutrient recipes recalibrated from field signals and AI models.",
        "Edge computing to decide locally while staying synchronized with the cloud.",
        "Mobile and web apps to supervise, diagnose and guide your teams.",
      ],
      primaryCta: "Explore the convergence",
      secondaryCta: "Talk to an architect",
    },
    fusion: {
      kicker: "Hydroponics x IoT & Edge",
      title: "One stack to run your crops",
      description:
        "We blend agronomic precision and IoT & Edge power to deliver a seamless experience from the crop to the cloud.",
      tracks: [
        {
          title: "Intelligent hydroponics",
          description:
            "Modular hydroponic architecture driven by data to keep every plant in its comfort zone.",
          highlights: [
            "Water + nutrient recipes auto-adjusted to genetics and crop stages.",
            "Continuous monitoring of climate, conductivity and flows at every nutritive layer.",
            "Actuators, pumps and irrigation lines synchronized with edge scenarios.",
          ],
        },
        {
          title: "IoT & Edge computing",
          description:
            "IoT infrastructure built to capture field signals, process them locally and push actionable insights.",
          highlights: [
            "Plug-and-play sensors, resilient gateways and a secure private network.",
            "Edge computing aggregates, cleans and acts with zero latency even offline.",
            "Cloud data lake, APIs and connectors to your apps and partners.",
          ],
        },
      ],
    },
    reasons: {
      title: "Why trust Enov CORP for the Hydroponics + IoT convergence?",
      items: [
        {
          title: "Unified system mindset",
          description:
            "We align hydroponic architecture, IoT, edge and software with the same business goals.",
        },
        {
          title: "Operational data & AI",
          description:
            "Each measurement becomes an actionable recommendation powered by our models, rules and automation loops.",
        },
        {
          title: "Controlled industrialization",
          description:
            "Secured deployment methodology, redundancy tests and end-to-end observability.",
        },
        {
          title: "Continuous enablement",
          description:
            "Training, living documentation and 24/7 assistance to ramp up your teams.",
        },
      ],
    },
    timeline: {
      kicker: "Hydroponics + IoT journey",
      title: "Our unified integration path",
      description:
        "A proven method to move from vision to operations while keeping your crops under control.",
      steps: [
        {
          title: "Agronomic & IoT co-design",
          description:
            "Greenhouse diagnostics, mapping of physical & data flows, definition of automation scenarios.",
        },
        {
          title: "Unified integration",
          description:
            "Synchronized installation of hydroponic circuits, IoT sensors, edge gateways and the digital twin.",
        },
        {
          title: "Continuous steering",
          description:
            "Parameter optimization, model improvements, operator support and KPI reporting.",
        },
      ],
    },
    contact: {
      kicker: "Ready to synchronize your crops?",
      title: "Let's connect Hydroponics + IoT & Edge",
      description:
        "Share your goals, greenhouse maturity and the levers we should activate to bring you closer to autonomous operations.",
      cta: "Contact Enov CORP",
    },
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = landingCopy[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="app-shell section-flow relative">
        <section className="grid gap-10 rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/40 backdrop-blur md:grid-cols-2 md:gap-12 md:rounded-3xl md:p-10 lg:p-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-base text-slate-300 sm:text-lg">{t.hero.description}</p>
            <ul className="space-y-3 text-sm text-slate-200 sm:text-base">
              {t.hero.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-pink-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#solutions"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-pink-500/40 transition hover:scale-105"
              >
                {t.hero.primaryCta}
              </a>
              <a
                href="#contact"
                className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center pb-10 md:pb-0">
            <DigitalTwinCard />
          </div>
        </section>

        <section className="space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              {t.fusion.kicker}
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t.fusion.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-slate-400">
              {t.fusion.description}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {t.fusion.tracks.map((track) => (
              <div
                key={track.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/30"
              >
                <h3 className="text-xl font-semibold text-white">{track.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{track.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {track.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-pink-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/50 sm:rounded-3xl sm:p-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t.reasons.title}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.reasons.items.map((reason) => (
              <li
                key={reason.title}
                className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <span className="text-base font-semibold text-white">{reason.title}</span>
                <span className="text-sm text-slate-300">{reason.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="solutions" className="space-y-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              {t.timeline.kicker}
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t.timeline.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
              {t.timeline.description}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.timeline.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-center shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-sky-500 text-lg font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-center shadow-2xl sm:rounded-3xl sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-pink-300">
            {t.contact.kicker}
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{t.contact.title}</h2>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">{t.contact.description}</p>
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
