"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DigitalTwinCard } from "@/components/DigitalTwinCard";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type LandingCopy = {
  hero: { title: string; highlight: string; sub: string; cta1: string; cta2: string };
  stats: Array<{ value: string; label: string }>;
  pillarsTitle: string;
  pillars: Array<{ num: string; title: string; tags: string; href: string }>;
  processTitle: string;
  process: Array<{ title: string }>;
  cta: { eyebrow: string; title: string; button: string };
};

const copy: Record<SupportedLanguage, LandingCopy> = {
  fr: {
    hero: {
      title: "Serres connectées,",
      highlight: "apps et formations.",
      sub: "Vous avez besoin d'une serre automatisée, d'une app ou d'une équipe à former. Enov CORP fait les trois.",
      cta1: "Voir ce qu'on fait",
      cta2: "Nous écrire",
    },
    stats: [
      { value: "90%", label: "D'eau économisée en hydroponie" },
      { value: "< 3 mois", label: "De l'idée à l'app en production" },
      { value: "8 max", label: "Participants par formation" },
    ],
    pillarsTitle: "Trois choses qu'on sait faire.",
    pillars: [
      { num: "01", title: "Serres connectées", tags: "Capteurs installés. Arrosage automatisé. Alertes immédiates.", href: "/hydroponie" },
      { num: "02", title: "Apps & Sites web", tags: "Android, iOS, web. Un interlocuteur. Livraison en 3 mois.", href: "/web-mobile" },
      { num: "03", title: "Formation", tags: "8 participants max. Projets réels. Certificat Enov à la clé.", href: "/academy" },
    ],
    processTitle: "Ce qui se passe quand vous nous contactez.",
    process: [{ title: "On écoute" }, { title: "On conçoit" }, { title: "On livre" }, { title: "On reste" }],
    cta: {
      eyebrow: "Sans engagement. Réponse en 24h.",
      title: "Décrivez votre besoin. On vous répond en 24h.",
      button: "Nous contacter",
    },
  },
  en: {
    hero: {
      title: "Connected greenhouses,",
      highlight: "apps and training.",
      sub: "You need an automated greenhouse, an app, or a team to train. Enov CORP does all three.",
      cta1: "See what we do",
      cta2: "Write to us",
    },
    stats: [
      { value: "90%", label: "Water saved in hydroponics" },
      { value: "< 3 mo.", label: "From idea to live app" },
      { value: "8 max", label: "Participants per training" },
    ],
    pillarsTitle: "Three things we know how to do.",
    pillars: [
      { num: "01", title: "Connected greenhouses", tags: "Sensors installed. Watering automated. Instant alerts.", href: "/hydroponie" },
      { num: "02", title: "Apps & Websites", tags: "Android, iOS, web. One contact. Delivered in 3 months.", href: "/web-mobile" },
      { num: "03", title: "Training", tags: "Max 8 participants. Real projects. Enov Certificate included.", href: "/academy" },
    ],
    processTitle: "What happens when you contact us.",
    process: [{ title: "We listen" }, { title: "We design" }, { title: "We deliver" }, { title: "We stay" }],
    cta: {
      eyebrow: "No commitment. Reply within 24h.",
      title: "Describe your need. We reply within 24h.",
      button: "Contact us",
    },
  },
};

const PILLAR_ACCENT = [
  { num: "from-emerald-300 to-cyan-300", border: "group-hover:border-emerald-500/30" },
  { num: "from-fuchsia-300 to-purple-300", border: "group-hover:border-fuchsia-500/30" },
  { num: "from-sky-300 to-indigo-300", border: "group-hover:border-sky-500/30" },
];

export default function Home() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center pt-10 pb-16 text-center">
          <div className="pointer-events-none absolute -inset-x-[var(--shell-padding)] inset-y-0 -z-10 overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[120px]"
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/4 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[80px]"
              animate={{ x: [-24, 24, -24], y: [0, -20, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[80px]"
              animate={{ x: [24, -24, 24], y: [0, 20, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex max-w-4xl flex-col items-center gap-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Enov CORP
            </div>

            <h1 className="text-[2.4rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]">
              {t.hero.title}
              <br />
              <span className="bg-linear-to-r from-pink-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
                {t.hero.highlight}
              </span>
            </h1>

            <p className="max-w-lg text-base text-slate-400 sm:text-lg">{t.hero.sub}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#poles"
                className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-pink-500/20 transition hover:scale-105"
              >
                {t.hero.cta1}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white/25 hover:bg-white/8"
              >
                {t.hero.cta2}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative mt-20 w-full max-w-sm"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-emerald-500/12 blur-3xl" />
            <DigitalTwinCard />
          </motion.div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="grid grid-cols-3 divide-x divide-white/8 border-y border-white/8 py-10">
            {t.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <span className="bg-linear-to-r from-pink-400 via-fuchsia-400 to-sky-400 bg-clip-text text-3xl font-black text-transparent sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-slate-500">{stat.label}</span>
              </div>
            ))}
          </section>
        </FadeUp>

        {/* ── PILLARS ──────────────────────────────────────────────────── */}
        <FadeUp>
          <section id="poles" className="space-y-10">
            <h2 className="text-3xl font-black sm:text-4xl">{t.pillarsTitle}</h2>
            <div className="flex flex-col gap-3">
              {t.pillars.map((pillar, i) => {
                const accent = PILLAR_ACCENT[i];
                return (
                  <motion.div
                    key={pillar.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                  >
                    <Link
                      href={pillar.href}
                      className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/8 bg-slate-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-900/70 sm:gap-8 sm:p-7 ${accent.border}`}
                    >
                      <span className={`shrink-0 bg-linear-to-br ${accent.num} bg-clip-text text-4xl font-black leading-none text-transparent sm:text-5xl`}>
                        {pillar.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-white sm:text-xl">{pillar.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{pillar.tags}</p>
                      </div>
                      <span className="shrink-0 text-xl text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">→</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </FadeUp>

        {/* ── PROCESS ──────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-14">
            <h2 className="text-center text-3xl font-black sm:text-4xl lg:text-5xl">{t.processTitle}</h2>
            <div className="relative">
              <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-linear-to-r from-transparent via-white/10 to-transparent lg:block" />
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {t.process.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left"
                  >
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-slate-950">
                      <span className="bg-linear-to-br from-pink-400 to-sky-400 bg-clip-text text-xl font-black text-transparent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-base font-semibold text-white">{step.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16 md:p-20">
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/15 via-purple-500/10 to-sky-500/15" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
            </div>
            <div className="relative space-y-6">
              <p className="text-xs uppercase tracking-[0.5em] text-pink-300">{t.cta.eyebrow}</p>
              <h2 className="text-4xl font-black text-balance sm:text-5xl lg:text-6xl">{t.cta.title}</h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-2xl shadow-white/15 transition hover:scale-105"
              >
                {t.cta.button}
              </Link>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
