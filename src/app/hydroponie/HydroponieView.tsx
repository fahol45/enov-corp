"use client";

import Link from "next/link";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Track = {
  title: string;
  description: string;
  highlights: string[];
};

type Capability = {
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
};

type Stat = {
  value: string;
  label: string;
};

type HydroponieCopy = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    secondary: string;
    bullets: string[];
    primaryCta: string;
    secondaryCta: string;
    cardMetrics: { label: string; value: string }[];
    cardCaption: string;
  };
  fusion: {
    kicker: string;
    title: string;
    description: string;
    tracks: Track[];
  };
  capabilities: {
    title: string;
    items: Capability[];
  };
  method: {
    kicker: string;
    title: string;
    description: string;
    steps: Step[];
  };
  closing: {
    kicker: string;
    title: string;
    description: string;
    cta: string;
    stats: Stat[];
  };
};

const hydroponieCopy: Record<SupportedLanguage, HydroponieCopy> = {
  fr: {
    hero: {
      kicker: "Hydroponie x IoT & Edge",
      title: "Hydroponie et IoT r\u00e9unies pour piloter vos serres",
      description:
        "Nous combinons nos solutions hydroponiques et notre technologie IoT/Edge pour surveiller l'eau, les nutriments et l'\u00e9nergie en continu et prendre chaque d\u00e9cision critique au bon moment.",
      secondary:
        "Toutes les donn\u00e9es s'affichent dans une application web et mobile unique afin que vos \u00e9quipes puissent contr\u00f4ler chaque site en temps r\u00e9el.",
      bullets: [
        "Capteurs IoT mesurent d\u00e9bit, EC, pH, lumi\u00e8re et stress hydrique plante par plante.",
        "Algorithmes edge modulent irrigation et nutriments pour supprimer le gaspillage d'eau.",
        "Alertes pr\u00e9dictives sur les fuites, colmatages et d\u00e9rives de production.",
        "Tableaux de bord partag\u00e9s entre agronomes, op\u00e9rations et direction pour agir vite.",
      ],
      primaryCta: "Parler \u00e0 un architecte",
      secondaryCta: "Explorer la fusion",
      cardMetrics: [
        { label: "Climat", value: "22.4C" },
        { label: "Solution", value: "EC 2.0" },
        { label: "Edge", value: "12ms" },
        { label: "\u00c9nergie", value: "-18%" },
      ],
      cardCaption: "Tableau de bord IoT + hydroponie pour visualiser climat, solution et edge en temps r\u00e9el.",
    },
    fusion: {
      kicker: "Hydroponie x IoT & Edge",
      title: "Piloter production et eau dans une boucle ferm\u00e9e",
      description:
        "Les capteurs remontent leurs mesures vers l'edge qui ajuste imm\u00e9diatement l'arrosage, les nutriments et la ventilation. R\u00e9sultat : jusqu'\u00e0 90 % d'eau \u00e9conomis\u00e9e vs pleine terre.",
      tracks: [
        {
          title: "Hydroponie intelligente",
          description:
            "Solutions hydroponiques \u00e9quip\u00e9es de capteurs IoT natifs pour ajuster eau, nutriments et lumi\u00e8re selon la culture.",
          highlights: [
            "Boucles nutritives pilot\u00e9es par IA pour maximiser la biomasse et \u00e9viter le sur-arrosage.",
            "Ultrasons, d\u00e9bitm\u00e8tres et sondes EC d\u00e9tectent la moindre fuite en temps r\u00e9el.",
            "Recirculation automatis\u00e9e qui recycle jusqu'\u00e0 90 % de l'eau et garde vos bassins propres.",
          ],
        },
        {
          title: "IoT & Edge computing",
          description:
            "Infrastructure IoT s\u00e9curis\u00e9e qui collecte les signaux terrain, traite en edge et active les r\u00e9actions agronomiques critiques.",
          highlights: [
            "Capteurs multi-param\u00e8tres, cam\u00e9ras et actionneurs plug-and-play sur bus priv\u00e9.",
            "Noyau edge qui nettoie les donn\u00e9es, applique les mod\u00e8les agronomiques et ordonne les actionneurs.",
            "Data fabric temps r\u00e9el pour alimenter jumeau num\u00e9rique, rapports ESG et API partenaires.",
          ],
        },
      ],
    },
    capabilities: {
      title: "Pourquoi choisir ENOV CORP ?",
      items: [
        {
          title: "Vision syst\u00e8me",
          description:
            "Hydroponie, IoT, edge et apps con\u00e7us comme un seul produit data-driven pour \u00e9viter les pertes d'eau et homog\u00e9n\u00e9iser la production.",
        },
        {
          title: "Automatisation op\u00e9rationnelle",
          description:
            "Mod\u00e8les IA, r\u00e8gles agronomiques et workflows low-code pour ajuster d\u00e9bit eau/nutriments et industrialiser les routines.",
        },
        {
          title: "Confiance & s\u00e9curit\u00e9",
          description:
            "Monitoring temps r\u00e9el, mises \u00e0 jour OTA supervis\u00e9es et contr\u00f4les d'acc\u00e8s stricts pour prot\u00e9ger vos serres critiques.",
        },
        {
          title: "Accompagnement continu",
          description:
            "Co-design, transfert de comp\u00e9tences, support 24/7 et documentation vivante pour vos agronomes et \u00e9quipes data.",
        },
      ],
    },
    method: {
      kicker: "Parcours Hydroponie + IoT",
      title: "Notre m\u00e9thode d'int\u00e9gration",
      description:
        "Un chemin ma\u00eetris\u00e9 depuis l'audit des flux d'eau jusqu'\u00e0 l'industrialisation des automatisations IoT/Edge.",
      steps: [
        {
          title: "Diagnostic conjoint",
          description:
            "Cartographie de vos serres, mesures des flux d'eau/nutriments et identification des quick wins IoT.",
        },
        {
          title: "Int\u00e9gration unifi\u00e9e",
          description:
            "Installation synchronis\u00e9e des circuits hydroponiques, du maillage IoT, des passerelles edge et de la couche logicielle.",
        },
        {
          title: "Pilotage et scalabilit\u00e9",
          description:
            "Optimisation continue, cr\u00e9ation de nouveaux sc\u00e9narios edge et pilotage des KPI rendement + \u00e9conomie d'eau.",
        },
      ],
    },
    closing: {
      kicker: "R\u00e9sultats concrets",
      title: "Mesurez l'impact de la fusion Hydroponie + IoT",
      description:
        "Nous monitorons vos indicateurs op\u00e9rationnels, ESG et business pour prouver la valeur de chaque it\u00e9ration et objectiver les gains d'eau.",
      cta: "Planifier un diagnostic",
      stats: [
        { value: "90%", label: "Eau \u00e9conomis\u00e9e vs r\u00e9f\u00e9rence plein champ" },
        { value: "+28%", label: "Gain moyen sur la biomasse vendable" },
        { value: "12ms", label: "Latence edge pour d\u00e9cision critique" },
      ],
    },
  },
  en: {
    hero: {
      kicker: "Hydroponics x IoT & Edge",
      title: "Hydroponics and IoT united to steer your greenhouses",
      description:
        "We combine our hydroponic solutions with IoT/Edge technology to monitor water, nutrients and energy continuously and take every critical action on time.",
      secondary:
        "All data lives inside one web and mobile app so your teams can supervise every site in real time.",
      bullets: [
        "IoT sensors track flow, EC, pH, light and plant stress, plant by plant.",
        "Edge algorithms modulate irrigation and nutrients to remove water waste.",
        "Predictive alerts on leaks, clogging and production drifts.",
        "Shared dashboards for agronomists, operations and leadership to react faster.",
      ],
      primaryCta: "Talk to an architect",
      secondaryCta: "Explore the fusion",
      cardMetrics: [
        { label: "Climate", value: "22.4C" },
        { label: "Solution", value: "EC 2.0" },
        { label: "Edge", value: "12ms" },
        { label: "Energy", value: "-18%" },
      ],
      cardCaption: "Hydroponics + IoT stack for smooth real-time decisions.",
    },
    fusion: {
      kicker: "Hydroponics x IoT & Edge",
      title: "Close the loop between production and water",
      description:
        "Sensors feed the edge layer that instantly adjusts watering, nutrients and ventilation. Result: up to 90% water savings compared with open-field crops.",
      tracks: [
        {
          title: "Intelligent hydroponics",
          description:
            "Hydroponic solutions with native IoT sensors to adjust water, nutrients and light for each crop.",
          highlights: [
            "AI-driven nutrient loops that maximize biomass and prevent overwatering.",
            "Ultrasound, flowmeters and EC probes detect any leak in real time.",
            "Automated recirculation recycling up to 90% of the water and keeping tanks clean.",
          ],
        },
        {
          title: "IoT & Edge computing",
          description:
            "Secure IoT infrastructure collecting field signals, processing them on the edge and triggering agronomic reactions.",
          highlights: [
            "Multi-parameter sensors, cameras and plug-and-play actuators on a private bus.",
            "Edge core cleans data, applies agronomic models and instructs actuators.",
            "Real-time data fabric feeding the digital twin, ESG reports and partner APIs.",
          ],
        },
      ],
    },
    capabilities: {
      title: "Why choose ENOV CORP?",
      items: [
        {
          title: "System mindset",
          description:
            "Hydroponics, IoT, edge and apps designed as one data-driven product to avoid water losses and align production.",
        },
        {
          title: "Operational automation",
          description:
            "AI models, agronomic rules and low-code workflows to tune water/nutrient flow and industrialize routines.",
        },
        {
          title: "Trust & security",
          description:
            "Real-time monitoring, supervised OTA updates and strict access controls to protect critical greenhouses.",
        },
        {
          title: "Continuous support",
          description:
            "Co-design, knowledge transfer, 24/7 support and living documentation for agronomists and data teams.",
        },
      ],
    },
    method: {
      kicker: "Hydroponics + IoT journey",
      title: "Our integration method",
      description:
        "A controlled path from water-flow audit to the industrialization of IoT/Edge automation.",
      steps: [
        {
          title: "Joint diagnostic",
          description:
            "Mapping your greenhouses, measuring water/nutrient flows and spotting IoT quick wins.",
        },
        {
          title: "Unified integration",
          description:
            "Synchronized installation of hydroponic circuits, IoT mesh, edge gateways and the software layer.",
        },
        {
          title: "Steering & scale",
          description:
            "Continuous optimization, new edge scenarios and KPI governance for yield plus water savings.",
        },
      ],
    },
    closing: {
      kicker: "Concrete outcomes",
      title: "Measure the impact of Hydroponics + IoT",
      description:
        "We monitor your operational, ESG and business indicators to prove the value of every iteration and objectify water savings.",
      cta: "Schedule a diagnostic",
      stats: [
        { value: "90%", label: "Water saved vs open-field reference" },
        { value: "+28%", label: "Average gain on sellable biomass" },
        { value: "12ms", label: "Edge latency for critical decisions" },
      ],
    },
  },
};

export function HydroponieView() {
  const { language } = useLanguage();
  const t = hydroponieCopy[language];

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-20 left-4 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="app-shell section-flow">
        <section className="relative flex flex-col gap-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 pb-12 shadow-2xl shadow-black/40 sm:px-8 sm:pb-16 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.hero.kicker}</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{t.hero.title}</h1>
            <p className="text-lg text-slate-300">{t.hero.description}</p>
            <p className="text-base text-slate-400">{t.hero.secondary}</p>
          </div>
          <ul className="space-y-3 text-sm text-slate-200">
            {t.hero.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald-400/30 transition hover:scale-105"
            >
              {t.hero.primaryCta}
            </Link>
            <a
              href="#fusion"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-[520px] px-2 sm:px-0">
            <div className="absolute inset-0 animate-pulse rounded-[3.75rem] bg-gradient-to-br from-emerald-500 via-cyan-500 to-indigo-500 blur-3xl" />
            <div className="relative rounded-[3.75rem] border border-white/10 bg-gradient-to-br from-slate-950/95 to-slate-900/80 p-3 shadow-[0_35px_80px_rgba(0,0,0,0.65)]">
              <div className="rounded-[3rem] border border-white/10 bg-slate-950/85 p-6 min-h-[420px]">
                <div className="mx-auto mb-6 flex items-center justify-center">
                  <div className="h-1.5 w-24 rounded-full bg-white/15" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {t.hero.cardMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex flex-col rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-4 text-slate-200 shadow-inner shadow-black/30"
                    >
                      <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-2xl font-bold">{metric.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-center text-sm text-slate-300">
                  {t.hero.cardCaption}
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
        <section id="fusion" className="space-y-10 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 sm:p-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.fusion.kicker}</p>
          <h2 className="text-3xl font-semibold">{t.fusion.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-400">{t.fusion.description}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {t.fusion.tracks.map((track) => (
            <div
              key={track.title}
              className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/30"
            >
              <p className="text-xs uppercase tracking-[0.5em] text-emerald-200">{track.title}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{track.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{track.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {track.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </section>
        <section className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 sm:p-8">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/50 sm:p-8">
          <h2 className="text-3xl font-semibold text-white">{t.capabilities.title}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {t.capabilities.items.map((capability) => (
              <li
                key={capability.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">{capability.title}</p>
                <p className="mt-2 text-sm text-slate-300">{capability.description}</p>
              </li>
            ))}
          </ul>
        </div>
        </section>
        <section className="space-y-10 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 sm:p-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.method.kicker}</p>
          <h2 className="text-3xl font-semibold">{t.method.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">{t.method.description}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.method.steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-center shadow-lg"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-lg font-bold">
                {index + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
        </section>
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-center shadow-2xl sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-left md:text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-emerald-200">{t.closing.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.closing.title}</h2>
            <p className="text-slate-300">{t.closing.description}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
            >
              {t.closing.cta}
            </Link>
          </div>
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6">
            {t.closing.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-center"
              >
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.4em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          </div>
        </section>
      </div>
    </main>
  );
}
