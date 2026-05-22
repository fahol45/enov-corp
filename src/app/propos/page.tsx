"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
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

const PILLAR_BARS = [
  "from-emerald-400 to-cyan-400",
  "from-fuchsia-400 to-purple-500",
  "from-sky-400 to-indigo-500",
];

export default function AProposPage() {
  const { language } = useLanguage();
  const t = aboutCopy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-6 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-[var(--shell-padding)] inset-y-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-500/8 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-rose-500/8 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/25 bg-amber-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-amber-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              {t.hero.kicker}
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4rem]">
              {t.hero.title}
            </h1>

            <p className="text-lg text-slate-300 text-pretty">
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
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-amber-400 via-rose-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-amber-500/20 transition hover:scale-105 sm:w-auto"
            >
              {t.hero.cta}
            </Link>
          </motion.div>
        </section>

        {/* ── PILLARS ─────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold sm:text-4xl">{t.pillars.title}</h2>
              <p className="text-slate-400">{t.pillars.description}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {t.pillars.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/50 p-6 transition hover:border-white/15"
                >
                  <div className={`absolute left-0 right-0 top-0 h-px bg-linear-to-r ${PILLAR_BARS[i]} opacity-70`} />
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── VALUES ──────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">{t.values.title}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.values.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/40 p-6 transition hover:border-white/15"
                >
                  <span className="pointer-events-none absolute right-4 top-0 select-none text-[5rem] font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-white/[0.06]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── CONTACT CTA ─────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/12 via-rose-500/8 to-indigo-500/12" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl" />
            </div>
            <div className="relative space-y-5">
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
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
