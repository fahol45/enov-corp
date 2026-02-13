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

type Audience = {
  title: string;
  description: string;
};

type Deliverable = {
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
  audiences: {
    title: string;
    items: Audience[];
  };
  deliverables: {
    title: string;
    items: Deliverable[];
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
      title: "La serre connect\u00e9e, simple et rentable",
      description:
        "Nous aidons les exploitations \u00e0 produire plus, avec moins d'eau et moins de risques gr\u00e2ce \u00e0 l'hydroponie connect\u00e9e.",
      secondary:
        "Tout se pilote depuis une seule application web & mobile.",
      bullets: [
        "Mesures automatiques et alertes en temps r\u00e9el.",
        "D\u00e9cisions locales, m\u00eame hors connexion.",
        "Tableaux de bord clairs pour tous.",
        "Accompagnement de bout en bout.",
      ],
      primaryCta: "Parler \u00e0 un architecte",
      secondaryCta: "Explorer la fusion",
      cardMetrics: [
        { label: "Climat", value: "22.4C" },
        { label: "Solution", value: "EC 2.0" },
        { label: "Edge", value: "12ms" },
        { label: "\u00c9nergie", value: "-18%" },
      ],
      cardCaption: "Tableau de bord simple pour suivre la production en temps r\u00e9el.",
    },
    fusion: {
      kicker: "Hydroponie x IoT & Edge",
      title: "Automatiser l'eau et la production",
      description:
        "Les capteurs pilotent l'arrosage et les nutriments en continu pour gagner en qualit\u00e9 et en efficacit\u00e9.",
      tracks: [
        {
          title: "Hydroponie intelligente",
          description:
            "Des serres optimis\u00e9es pour mieux nourrir les plantes et r\u00e9duire le gaspillage.",
          highlights: [
            "Dosage automatique des nutriments selon la culture.",
            "D\u00e9tection rapide des anomalies et fuites.",
            "Recyclage de l'eau pour r\u00e9duire les co\u00fbts.",
          ],
        },
        {
          title: "IoT & Edge computing",
          description:
            "Une couche digitale fiable pour suivre, alerter et d\u00e9cider vite.",
          highlights: [
            "Capteurs et actionneurs connect\u00e9s, simples \u00e0 exploiter.",
            "Traitement local pour r\u00e9agir sans attendre.",
            "Donn\u00e9es pr\u00eates pour le reporting et la d\u00e9cision.",
          ],
        },
      ],
    },
    audiences: {
      title: "Pour qui ?",
      items: [
        {
          title: "Exploitants",
          description:
            "Moins de pertes, plus de r\u00e9gularit\u00e9.",
        },
        {
          title: "Direction",
          description:
            "KPI simples pour d\u00e9cider vite.",
        },
        {
          title: "\u00c9quipes techniques",
          description:
            "Installation claire, maintenance facilit\u00e9e.",
        },
      ],
    },
    deliverables: {
      title: "Ce que vous obtenez, concr\u00e8tement",
      items: [
        {
          title: "Installation connect\u00e9e",
          description: "Serres, capteurs et automatisations.",
        },
        {
          title: "Suivi en temps r\u00e9el",
          description: "Donn\u00e9es claires et alertes utiles.",
        },
        {
          title: "D\u00e9cisions locales",
          description: "Fonctionne m\u00eame sans internet.",
        },
        {
          title: "App web & mobile",
          description: "Piloter, surveiller, comparer.",
        },
        {
          title: "Reporting simple",
          description: "Eau, rendement, co\u00fbts.",
        },
        {
          title: "Formation",
          description: "Vos \u00e9quipes deviennent autonomes.",
        },
      ],
    },
    capabilities: {
      title: "B\u00e9n\u00e9fices clairs",
      items: [
        {
          title: "Moins d'eau",
          description: "Irrigation pr\u00e9cise et automatis\u00e9e.",
        },
        {
          title: "Production stable",
          description: "Moins d'al\u00e9as, plus de r\u00e9gularit\u00e9.",
        },
        {
          title: "R\u00e9action rapide",
          description: "Alertes et actions imm\u00e9diates.",
        },
        {
          title: "\u00c9quipes autonomes",
          description: "Formation et support continu.",
        },
      ],
    },
    method: {
      kicker: "Parcours Hydroponie + IoT",
      title: "Un parcours simple, de A \u00e0 Z",
      description:
        "Nous vous accompagnons \u00e0 chaque \u00e9tape, sans complexit\u00e9 inutile.",
      steps: [
        {
          title: "\u00c9tude terrain",
          description: "Objectifs, contraintes, budget.",
        },
        {
          title: "Conception",
          description: "Architecture et dimensionnement.",
        },
        {
          title: "Maquettes 3D",
          description:
            "Visualiser le projet avant d'investir.",
        },
        {
          title: "Installation",
          description: "Mise en place et tests.",
        },
        {
          title: "Formation \u00e0 l'usage",
          description: "Prise en main rapide.",
        },
        {
          title: "Suivi continu",
          description: "KPI, optimisation, support.",
        },
      ],
    },
    closing: {
      kicker: "R\u00e9sultats concrets",
      title: "Mesurez l'impact de la fusion Hydroponie + IoT",
      description:
        "Nous suivons vos r\u00e9sultats pour prouver les gains d'eau, de rendement et de stabilit\u00e9.",
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
      title: "Connected hydroponics, simple and profitable",
      description:
        "We help farms produce more with less water and less risk through connected hydroponics.",
      secondary:
        "Everything is managed from one web & mobile app.",
      bullets: [
        "Automatic measurements and real-time alerts.",
        "Local decisions, even offline.",
        "Clear dashboards for everyone.",
        "End-to-end support.",
      ],
      primaryCta: "Talk to an architect",
      secondaryCta: "Explore the fusion",
      cardMetrics: [
        { label: "Climate", value: "22.4C" },
        { label: "Solution", value: "EC 2.0" },
        { label: "Edge", value: "12ms" },
        { label: "Energy", value: "-18%" },
      ],
      cardCaption: "Simple dashboard to track production in real time.",
    },
    fusion: {
      kicker: "Hydroponics x IoT & Edge",
      title: "Automate water and production",
      description:
        "Sensors adjust irrigation and nutrients continuously for better quality and efficiency.",
      tracks: [
        {
          title: "Intelligent hydroponics",
          description:
            "Optimized greenhouses that feed plants better and reduce waste.",
          highlights: [
            "Automatic nutrient dosing per crop.",
            "Fast detection of anomalies and leaks.",
            "Water recycling to cut costs.",
          ],
        },
        {
          title: "IoT & Edge computing",
          description:
            "A reliable digital layer to monitor, alert, and decide fast.",
          highlights: [
            "Connected sensors and actuators that are easy to use.",
            "Local processing to react instantly.",
            "Data ready for reporting and decisions.",
          ],
        },
      ],
    },
    audiences: {
      title: "Who is it for?",
      items: [
        {
          title: "Operators",
          description: "Less loss, more consistency.",
        },
        {
          title: "Leadership",
          description: "Simple KPIs for fast decisions.",
        },
        {
          title: "Technical teams",
          description: "Clear setup, easier maintenance.",
        },
      ],
    },
    deliverables: {
      title: "What you get, clearly",
      items: [
        {
          title: "Connected installation",
          description: "Greenhouse, sensors, and automations.",
        },
        {
          title: "Real-time monitoring",
          description: "Clear data and useful alerts.",
        },
        {
          title: "Local decisions",
          description: "Works even when offline.",
        },
        {
          title: "Web & mobile app",
          description: "Control, monitor, compare.",
        },
        {
          title: "Simple reporting",
          description: "Water, yield, costs.",
        },
        {
          title: "Training",
          description: "Teams become autonomous.",
        },
      ],
    },
    capabilities: {
      title: "Clear benefits",
      items: [
        {
          title: "Less water",
          description: "Precise, automated irrigation.",
        },
        {
          title: "Stable production",
          description: "Fewer disruptions, more consistency.",
        },
        {
          title: "Faster decisions",
          description: "Alerts and immediate actions.",
        },
        {
          title: "Autonomous teams",
          description: "Training and ongoing support.",
        },
      ],
    },
    method: {
      kicker: "Hydroponics + IoT journey",
      title: "A simple A-to-Z journey",
      description:
        "We guide you step by step, without unnecessary complexity.",
      steps: [
        {
          title: "Field study",
          description: "Goals, constraints, budget.",
        },
        {
          title: "Design",
          description: "Architecture and sizing.",
        },
        {
          title: "3D mockups",
          description: "Visualize the project before investing.",
        },
        {
          title: "Installation",
          description: "Setup and testing.",
        },
        {
          title: "Usage training",
          description: "Fast onboarding.",
        },
        {
          title: "Ongoing support",
          description: "KPIs, optimization, support.",
        },
      ],
    },
    closing: {
      kicker: "Concrete outcomes",
      title: "Measure the impact of Hydroponics + IoT",
      description:
        "We track results to prove gains in water, yield, and stability.",
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
        <section className="relative flex flex-col gap-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 pb-10 shadow-2xl shadow-black/40 sm:p-6 sm:pb-14 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:pb-16">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.hero.kicker}</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{t.hero.title}</h1>
            <p className="text-lg text-slate-300 text-pretty text-left sm:text-justify">{t.hero.description}</p>
            <p className="text-base text-slate-400 text-pretty text-left sm:text-justify">{t.hero.secondary}</p>
          </div>
          <ul className="space-y-3 text-sm text-slate-200">
            {t.hero.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-pretty text-left sm:text-justify">{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 px-8 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald-400/30 transition hover:scale-105 sm:w-auto"
            >
              {t.hero.primaryCta}
            </Link>
            <a
              href="#fusion"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white sm:w-auto"
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
        <section className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-white">{t.audiences.title}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {t.audiences.items.map((audience) => (
              <div
                key={audience.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">
                  {audience.title}
                </p>
                <p className="mt-2 text-sm text-slate-300">{audience.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="fusion" className="space-y-10 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.fusion.kicker}</p>
          <h2 className="text-3xl font-semibold">{t.fusion.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-400 text-pretty">{t.fusion.description}</p>
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
        <section className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-white">{t.deliverables.title}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.deliverables.items.map((deliverable) => (
              <div
                key={deliverable.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">
                  {deliverable.title}
                </p>
                <p className="mt-2 text-sm text-slate-300">{deliverable.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-10 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
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
        <section className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-white">{t.capabilities.title}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {t.capabilities.items.map((capability) => (
              <li
                key={capability.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">
                  {capability.title}
                </p>
                <p className="mt-2 text-sm text-slate-300">{capability.description}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 text-center shadow-2xl sm:p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-left md:text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-emerald-200">{t.closing.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.closing.title}</h2>
            <p className="text-slate-300">{t.closing.description}</p>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105 sm:w-auto"
            >
              {t.closing.cta}
            </Link>
          </div>
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-6">
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
