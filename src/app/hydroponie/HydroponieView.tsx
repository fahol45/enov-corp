"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
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
      title: "La serre connectée, simple et rentable",
      description:
        "Nous aidons les exploitations à produire plus, avec moins d'eau et moins de risques grâce à l'hydroponie connectée.",
      secondary:
        "Tout se pilote depuis une seule application web & mobile.",
      bullets: [
        "Mesures automatiques et alertes en temps réel.",
        "Décisions locales, même hors connexion.",
        "Tableaux de bord clairs pour tous.",
        "Accompagnement de bout en bout.",
      ],
      primaryCta: "Parler à un architecte",
      secondaryCta: "Explorer la fusion",
      cardMetrics: [
        { label: "Climat", value: "22.4°C" },
        { label: "Solution", value: "EC 2.0" },
        { label: "Edge", value: "12ms" },
        { label: "Énergie", value: "-18%" },
      ],
      cardCaption: "Tableau de bord simple pour suivre la production en temps réel.",
    },
    fusion: {
      kicker: "Hydroponie x IoT & Edge",
      title: "Automatiser l'eau et la production",
      description:
        "Les capteurs pilotent l'arrosage et les nutriments en continu pour gagner en qualité et en efficacité.",
      tracks: [
        {
          title: "Hydroponie intelligente",
          description:
            "Des serres optimisées pour mieux nourrir les plantes et réduire le gaspillage.",
          highlights: [
            "Dosage automatique des nutriments selon la culture.",
            "Détection rapide des anomalies et fuites.",
            "Recyclage de l'eau pour réduire les coûts.",
          ],
        },
        {
          title: "IoT & Edge computing",
          description:
            "Une couche digitale fiable pour suivre, alerter et décider vite.",
          highlights: [
            "Capteurs et actionneurs connectés, simples à exploiter.",
            "Traitement local pour réagir sans attendre.",
            "Données prêtes pour le reporting et la décision.",
          ],
        },
      ],
    },
    audiences: {
      title: "Pour qui ?",
      items: [
        {
          title: "Exploitants",
          description: "Moins de pertes, plus de régularité.",
        },
        {
          title: "Direction",
          description: "KPI simples pour décider vite.",
        },
        {
          title: "Équipes techniques",
          description: "Installation claire, maintenance facilitée.",
        },
      ],
    },
    deliverables: {
      title: "Ce que vous obtenez, concrètement",
      items: [
        {
          title: "Installation connectée",
          description: "Serres, capteurs et automatisations.",
        },
        {
          title: "Suivi en temps réel",
          description: "Données claires et alertes utiles.",
        },
        {
          title: "Décisions locales",
          description: "Fonctionne même sans internet.",
        },
        {
          title: "App web & mobile",
          description: "Piloter, surveiller, comparer.",
        },
        {
          title: "Reporting simple",
          description: "Eau, rendement, coûts.",
        },
        {
          title: "Formation",
          description: "Vos équipes deviennent autonomes.",
        },
      ],
    },
    capabilities: {
      title: "Bénéfices clairs",
      items: [
        {
          title: "Moins d'eau",
          description: "Irrigation précise et automatisée.",
        },
        {
          title: "Production stable",
          description: "Moins d'aléas, plus de régularité.",
        },
        {
          title: "Réaction rapide",
          description: "Alertes et actions immédiates.",
        },
        {
          title: "Équipes autonomes",
          description: "Formation et support continu.",
        },
      ],
    },
    method: {
      kicker: "Parcours Hydroponie + IoT",
      title: "Un parcours simple, de A à Z",
      description:
        "Nous vous accompagnons à chaque étape, sans complexité inutile.",
      steps: [
        {
          title: "Étude terrain",
          description: "Objectifs, contraintes, budget.",
        },
        {
          title: "Conception",
          description: "Architecture et dimensionnement.",
        },
        {
          title: "Maquettes 3D",
          description: "Visualiser le projet avant d'investir.",
        },
        {
          title: "Installation",
          description: "Mise en place et tests.",
        },
        {
          title: "Formation à l'usage",
          description: "Prise en main rapide.",
        },
        {
          title: "Suivi continu",
          description: "KPI, optimisation, support.",
        },
      ],
    },
    closing: {
      kicker: "Résultats concrets",
      title: "Mesurez l'impact de la fusion Hydroponie + IoT",
      description:
        "Nous suivons vos résultats pour prouver les gains d'eau, de rendement et de stabilité.",
      cta: "Planifier un diagnostic",
      stats: [
        { value: "90%", label: "Eau économisée vs référence plein champ" },
        { value: "+28%", label: "Gain moyen sur la biomasse vendable" },
        { value: "12ms", label: "Latence edge pour décision critique" },
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
        { label: "Climate", value: "22.4°C" },
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

const TRACK_BARS = [
  "from-emerald-400 to-cyan-400",
  "from-cyan-400 to-indigo-400",
];

export function HydroponieView() {
  const { language } = useLanguage();
  const t = hydroponieCopy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative flex flex-col gap-12 pt-4 pb-6 lg:flex-row lg:items-center lg:gap-16 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-[var(--shell-padding)] inset-y-0 -z-10 overflow-hidden">
            <div className="absolute -left-10 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/8 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {t.hero.kicker}
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4rem]">
              {t.hero.title}
            </h1>

            <p className="max-w-lg text-lg text-slate-300 text-pretty">
              {t.hero.description}
            </p>
            <p className="max-w-lg text-base text-slate-400">
              {t.hero.secondary}
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              {t.hero.bullets.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-emerald-400 via-cyan-400 to-indigo-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald-400/25 transition hover:scale-105 hover:shadow-emerald-400/40 sm:w-auto"
              >
                {t.hero.primaryCta}
              </Link>
              <a
                href="#fusion"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white/30 hover:bg-white/10 sm:w-auto"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-1 items-center justify-center"
          >
            <div className="relative w-full max-w-[480px]">
              <div className="absolute inset-0 animate-pulse rounded-[3.5rem] bg-linear-to-br from-emerald-500 via-cyan-500 to-indigo-500 blur-3xl opacity-50" />
              <div className="relative rounded-[3.5rem] border border-white/10 bg-linear-to-br from-slate-950/95 to-slate-900/80 p-3 shadow-[0_35px_80px_rgba(0,0,0,0.65)]">
                <div className="rounded-[2.75rem] border border-white/10 bg-slate-950/85 p-6">
                  <div className="mx-auto mb-6 flex items-center justify-center">
                    <div className="h-1.5 w-20 rounded-full bg-white/15" />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {t.hero.cardMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex flex-col rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-slate-200"
                      >
                        <p className="text-[0.6rem] uppercase tracking-[0.4em] text-emerald-300">
                          {metric.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center text-sm text-slate-400">
                    {t.hero.cardCaption}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── AUDIENCES ───────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.audiences.title}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.audiences.items.map((audience, i) => (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border border-white/8 bg-slate-900/40 p-6 transition hover:border-white/15"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
                    {audience.title}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">{audience.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── FUSION ──────────────────────────────────────────────── */}
        <FadeUp>
          <section id="fusion" className="space-y-10">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                {t.fusion.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                {t.fusion.title}
              </h2>
              <p className="mx-auto max-w-2xl text-slate-400 text-pretty">
                {t.fusion.description}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.fusion.tracks.map((track, i) => (
                <motion.div
                  key={track.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  className="relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/50 p-6"
                >
                  <div className={`absolute left-0 right-0 top-0 h-px bg-linear-to-r ${TRACK_BARS[i]} opacity-70`} />
                  <p className="text-xs uppercase tracking-[0.5em] text-emerald-300">
                    {track.title}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">{track.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-400">
                    {track.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── DELIVERABLES ────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.deliverables.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.deliverables.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="rounded-2xl border border-white/8 bg-slate-900/40 p-5 transition hover:border-white/15"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── METHOD ──────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-12">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                {t.method.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                {t.method.title}
              </h2>
              <p className="mx-auto max-w-2xl text-slate-400">{t.method.description}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.method.steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950">
                    <span className="bg-linear-to-br from-emerald-400 to-cyan-400 bg-clip-text text-xl font-black text-transparent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── BENEFITS ────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.capabilities.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.capabilities.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/40 p-6 transition hover:border-white/15"
                >
                  <span className="pointer-events-none absolute right-4 top-0 select-none text-[6rem] font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── CLOSING ─────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/15 via-cyan-500/8 to-indigo-500/15" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
            </div>
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.5em] text-emerald-300">
                  {t.closing.kicker}
                </p>
                <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                  {t.closing.title}
                </h2>
                <p className="text-slate-300">{t.closing.description}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
                >
                  {t.closing.cta}
                </Link>
              </div>
              <div className="grid gap-4">
                {t.closing.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-center"
                  >
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.4em] text-slate-400">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
