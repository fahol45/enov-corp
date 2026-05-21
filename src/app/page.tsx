"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DigitalTwinCard } from "@/components/DigitalTwinCard";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Pillar = {
  title: string;
  description: string;
  highlights: string[];
  cta: string;
  href: string;
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
  pillars: {
    kicker: string;
    title: string;
    description: string;
    items: Pillar[];
  };
  capabilities: {
    title: string;
    items: Reason[];
  };
  approach: {
    kicker: string;
    title: string;
    description: string;
    steps: Step[];
  };
  academy: {
    kicker: string;
    title: string;
    description: string;
    tracks: string[];
    primaryCta: string;
    secondaryCta: string;
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
      title: "Enov CORP, la technologie au service de vos projets.",
      description:
        "Nous combinons solutions connectées, développement digital et formation pour transformer vos idées en résultats concrets.",
      bullets: [
        "Systèmes intelligents pour piloter vos opérations.",
        "Applications web et mobiles simples à utiliser.",
        "Formations pratiques pour rendre vos équipes autonomes.",
        "Accompagnement complet, de l'étude au support.",
      ],
      primaryCta: "Découvrir nos pôles",
      secondaryCta: "Parler à un conseiller",
    },
    pillars: {
      kicker: "Nos 3 pôles",
      title: "Une offre claire, complète et orientée résultats",
      description:
        "Trois expertises qui se complètent pour accélérer vos projets et vos équipes.",
      items: [
        {
          title: "Hydroponie intelligente & IoT",
          description:
            "Automatisez, mesurez et pilotez vos systèmes avec des solutions connectées fiables.",
          highlights: [
            "Capteurs et automatisation des processus.",
            "Suivi en temps réel et alertes claires.",
            "Décision locale (edge) + synchronisation cloud.",
          ],
          cta: "Voir l'hydroponie",
          href: "/hydroponie",
        },
        {
          title: "Développement Web & Mobile",
          description:
            "Des outils digitaux modernes pour visualiser, décider et agir vite.",
          highlights: [
            "Dashboards simples et performants.",
            "Apps Android/iOS pour vos équipes terrain.",
            "Intégrations avec vos données et systèmes.",
          ],
          cta: "Voir le digital",
          href: "/web-mobile",
        },
        {
          title: "Enov Academy",
          description:
            "Formations techniques pour étudiants et professionnels, orientées projets réels.",
          highlights: [
            "Parcours courts et pratiques.",
            "Technologies clés du marché.",
            "Transfert de compétences concret.",
          ],
          cta: "Découvrir l'Academy",
          href: "/academy",
        },
      ],
    },
    capabilities: {
      title: "Ce que vous gagnez",
      items: [
        {
          title: "Clarté",
          description:
            "Une vision simple de votre projet et des décisions plus rapides.",
        },
        {
          title: "Performance",
          description:
            "Des systèmes fiables et des outils qui font gagner du temps.",
        },
        {
          title: "Autonomie",
          description:
            "Vos équipes montent en compétence et deviennent opérationnelles.",
        },
        {
          title: "Partenariat",
          description:
            "Un accompagnement durable avec support et optimisation continue.",
        },
      ],
    },
    approach: {
      kicker: "Accompagnement A à Z",
      title: "Un parcours simple, maîtrisé, efficace",
      description:
        "Nous vous guidons à chaque étape pour un projet livré et utilisable.",
      steps: [
        {
          title: "Étude & cadrage",
          description: "Comprendre vos objectifs et définir le bon plan d'action.",
        },
        {
          title: "Conception & prototypage",
          description:
            "Architecture technique, maquette 3D et validation rapide.",
        },
        {
          title: "Déploiement",
          description:
            "Installation, intégration et mise en service des solutions.",
        },
        {
          title: "Formation & support",
          description:
            "Montée en compétence, suivi et amélioration continue.",
        },
      ],
    },
    academy: {
      kicker: "Enov Academy",
      title: "Former pour aller plus vite",
      description:
        "Nos formations transforment les compétences en résultats concrets, pour les équipes et les étudiants.",
      tracks: [
        "Hydroponie intelligente",
        "IoT & edge computing",
        "Développement web",
        "Développement mobile",
        "Robotique & embarqué",
        "Infographie & design",
        "Design 3D",
      ],
      primaryCta: "Voir les formations",
      secondaryCta: "Planifier une session",
    },
    contact: {
      kicker: "Prêt à avancer ?",
      title: "Parlons de votre projet",
      description:
        "Expliquez-nous votre besoin et nous construirons une solution claire, réaliste et efficace.",
      cta: "Contacter Enov CORP",
    },
  },
  en: {
    hero: {
      title: "Enov CORP, technology built for real results.",
      description:
        "We combine connected solutions, digital products, and training to turn ideas into measurable outcomes.",
      bullets: [
        "Smart systems to run your operations with confidence.",
        "Web and mobile apps that are simple to use.",
        "Practical training to make teams autonomous.",
        "End-to-end support from study to ongoing help.",
      ],
      primaryCta: "Explore our pillars",
      secondaryCta: "Talk to an advisor",
    },
    pillars: {
      kicker: "Our 3 pillars",
      title: "A clear, complete offer focused on impact",
      description:
        "Three complementary areas that accelerate your projects and your teams.",
      items: [
        {
          title: "Smart Hydroponics & IoT",
          description:
            "Automate, measure and control your systems with reliable connectivity.",
          highlights: [
            "Sensors and process automation.",
            "Real-time monitoring and clear alerts.",
            "Local edge decisions + cloud sync.",
          ],
          cta: "Explore hydroponics",
          href: "/hydroponie",
        },
        {
          title: "Web & Mobile Development",
          description:
            "Modern digital tools to visualize, decide and act fast.",
          highlights: [
            "Simple, high-performance dashboards.",
            "Android/iOS apps for field teams.",
            "Integration with your data and systems.",
          ],
          cta: "See digital products",
          href: "/web-mobile",
        },
        {
          title: "Enov Academy",
          description:
            "Hands-on training for students and professionals, built around real projects.",
          highlights: [
            "Short, practical learning paths.",
            "Key market technologies.",
            "Concrete skills transfer.",
          ],
          cta: "Discover the Academy",
          href: "/academy",
        },
      ],
    },
    capabilities: {
      title: "What you gain",
      items: [
        {
          title: "Clarity",
          description:
            "A simple view of your project and faster decision-making.",
        },
        {
          title: "Performance",
          description: "Reliable systems and tools that save time.",
        },
        {
          title: "Autonomy",
          description: "Teams that grow skills and operate independently.",
        },
        {
          title: "Partnership",
          description: "Long-term support and continuous optimization.",
        },
      ],
    },
    approach: {
      kicker: "A to Z delivery",
      title: "A simple, controlled, effective journey",
      description:
        "We guide you at every step to deliver a usable, reliable solution.",
      steps: [
        {
          title: "Study & alignment",
          description: "Understand goals and define the right roadmap.",
        },
        {
          title: "Design & prototyping",
          description: "Architecture, 3D mockups and fast validation.",
        },
        {
          title: "Deployment",
          description: "Installation, integration and go-live.",
        },
        {
          title: "Training & support",
          description: "Upskilling, follow-up and continuous improvement.",
        },
      ],
    },
    academy: {
      kicker: "Enov Academy",
      title: "Training that moves projects forward",
      description:
        "Our programs turn skills into tangible results for teams and students.",
      tracks: [
        "Smart hydroponics",
        "IoT & edge computing",
        "Web development",
        "Mobile development",
        "Robotics & embedded systems",
        "Infographics & design",
        "3D design",
      ],
      primaryCta: "Explore programs",
      secondaryCta: "Plan a session",
    },
    contact: {
      kicker: "Ready to move forward?",
      title: "Let's talk about your project",
      description:
        "Share your needs and we will build a clear, realistic and efficient solution.",
      cta: "Contact Enov CORP",
    },
  },
};

const PILLAR_COLORS = [
  { bar: "from-emerald-400 to-cyan-400", dot: "bg-emerald-400" },
  { bar: "from-fuchsia-400 to-purple-500", dot: "bg-fuchsia-400" },
  { bar: "from-sky-400 to-indigo-500", dot: "bg-sky-400" },
];

export default function Home() {
  const { language } = useLanguage();
  const t = landingCopy[language];

  const heroRest = t.hero.title.replace("Enov CORP, ", "");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className="relative grid gap-12 pt-4 pb-6 md:grid-cols-2 md:items-center md:gap-16 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-[var(--shell-padding)] inset-y-0 -z-10 overflow-hidden">
            <div className="absolute -left-10 top-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sky-500/8 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Enov CORP
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              <span className="bg-linear-to-r from-pink-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
                Enov CORP,
              </span>
              <br />
              {heroRest}
            </h1>

            <p className="max-w-lg text-lg text-slate-300 text-pretty">
              {t.hero.description}
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
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-400" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#poles"
                className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-pink-500/25 transition hover:scale-105 hover:shadow-pink-500/40 sm:w-auto"
              >
                {t.hero.primaryCta}
              </a>
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white/30 hover:bg-white/10 sm:w-auto"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex justify-center pb-4 md:pb-0"
          >
            <DigitalTwinCard />
          </motion.div>
        </section>

        {/* ── PILLARS ─────────────────────────────────────────────── */}
        <FadeUp>
          <section id="poles" className="space-y-10">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                {t.pillars.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                {t.pillars.title}
              </h2>
              <p className="mx-auto max-w-2xl text-slate-400">
                {t.pillars.description}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {t.pillars.items.map((pillar, index) => {
                const colors = PILLAR_COLORS[index];
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-slate-900/50 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl"
                  >
                    <div
                      className={`absolute left-0 right-0 top-0 h-px bg-linear-to-r ${colors.bar} opacity-70`}
                    />
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-slate-400">{pillar.description}</p>
                    </div>
                    <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-400">
                      {pillar.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.dot}`}
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={pillar.href}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/8"
                    >
                      {pillar.cta}
                      <span className="text-slate-400 transition group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </FadeUp>

        {/* ── CAPABILITIES ────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">
              {t.capabilities.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.capabilities.items.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/40 p-6 transition hover:border-white/15"
                >
                  <span className="pointer-events-none absolute right-4 top-0 select-none text-[6rem] font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.06]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-semibold text-white">{reason.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── APPROACH ────────────────────────────────────────────── */}
        <FadeUp>
          <section id="approach" className="space-y-12">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                {t.approach.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                {t.approach.title}
              </h2>
              <p className="mx-auto max-w-2xl text-slate-400">
                {t.approach.description}
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-linear-to-r from-transparent via-white/15 to-transparent lg:block" />
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {t.approach.steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center lg:items-start lg:text-left"
                  >
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-950">
                      <span className="bg-linear-to-br from-pink-400 to-sky-400 bg-clip-text text-2xl font-black text-transparent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ── ACADEMY ─────────────────────────────────────────────── */}
        <FadeUp>
          <section className="grid gap-8 rounded-3xl border border-white/8 bg-linear-to-br from-slate-900/60 to-slate-950/60 p-6 sm:p-8 md:grid-cols-[1.3fr_0.7fr] md:items-start">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.5em] text-sky-400">
                {t.academy.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                {t.academy.title}
              </h2>
              <p className="text-slate-300">{t.academy.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/academy"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
                >
                  {t.academy.primaryCta}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  {t.academy.secondaryCta}
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.academy.tracks.map((track) => (
                <span
                  key={track}
                  className="rounded-full border border-sky-500/25 bg-sky-500/8 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-sky-300"
                >
                  {track}
                </span>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── CONTACT CTA ─────────────────────────────────────────── */}
        <FadeUp>
          <section
            id="contact"
            className="relative overflow-hidden rounded-3xl p-8 text-center sm:p-12 md:p-16"
          >
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/15 via-purple-500/10 to-sky-500/15" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
            </div>
            <div className="relative space-y-6">
              <p className="text-xs uppercase tracking-[0.5em] text-pink-300">
                {t.contact.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-5xl">
                {t.contact.title}
              </h2>
              <p className="mx-auto max-w-xl text-slate-300">{t.contact.description}</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-2xl shadow-white/15 transition hover:scale-105"
              >
                {t.contact.cta}
              </Link>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
