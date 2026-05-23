"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type HydroponieCopy = {
  hero: { kicker: string; title: string; highlight: string; sub: string; cta1: string; cta2: string; metrics: { label: string; value: string }[] };
  stats: Array<{ value: string; label: string }>;
  fusionTitle: string;
  fusion: Array<{ num: string; title: string; tags: string }>;
  processTitle: string;
  process: Array<{ title: string }>;
  cta: { eyebrow: string; title: string; button: string };
};

const copy: Record<SupportedLanguage, HydroponieCopy> = {
  fr: {
    hero: {
      kicker: "Hydroponie & IoT",
      title: "90 % d'eau en moins.",
      highlight: "Deux fois plus de récolte.",
      sub: "On installe les capteurs pH, EC et température dans votre serre. L'arrosage se déclenche selon les mesures. Vous recevez une alerte dès qu'une valeur sort des seuils.",
      cta1: "Demander une visite",
      cta2: "Voir comment ça marche",
      metrics: [
        { label: "Température", value: "22.4°C" },
        { label: "EC solution", value: "2.0" },
        { label: "Réaction", value: "12ms" },
        { label: "Énergie", value: "-18%" },
      ],
    },
    stats: [
      { value: "90%", label: "Eau économisée vs culture sol" },
      { value: "+28%", label: "Rendement moyen constaté" },
      { value: "12ms", label: "Temps de réaction capteur" },
    ],
    fusionTitle: "Ce qu'on installe et pourquoi ça marche.",
    fusion: [
      { num: "01", title: "Culture hydroponique", tags: "Les plantes poussent dans une solution nutritive. Pas de terre. Moins de maladies. Rendement supérieur à la culture classique." },
      { num: "02", title: "Capteurs et automatisation", tags: "pH, EC, température, humidité. Mesure en continu. Arrosage automatique selon les valeurs. Alerte immédiate sur votre téléphone." },
    ],
    processTitle: "Ce qui se passe entre le premier appel et la serre opérationnelle.",
    process: [{ title: "Visite terrain" }, { title: "Plan technique" }, { title: "Vue 3D" }, { title: "Installation" }, { title: "Formation" }, { title: "Suivi continu" }],
    cta: {
      eyebrow: "Déplacement sur rendez-vous.",
      title: "Vous avez une serre ou un projet de serre. On vient voir.",
      button: "Demander une visite",
    },
  },
  en: {
    hero: {
      kicker: "Hydroponics & IoT",
      title: "90% less water.",
      highlight: "Twice the harvest.",
      sub: "We install pH, EC and temperature sensors in your greenhouse. Watering triggers automatically based on live readings. You get an alert the moment any value goes out of range.",
      cta1: "Book a site visit",
      cta2: "See how it works",
      metrics: [
        { label: "Temperature", value: "22.4°C" },
        { label: "EC solution", value: "2.0" },
        { label: "Response", value: "12ms" },
        { label: "Energy", value: "-18%" },
      ],
    },
    stats: [
      { value: "90%", label: "Water saved vs soil growing" },
      { value: "+28%", label: "Average yield increase" },
      { value: "12ms", label: "Sensor response time" },
    ],
    fusionTitle: "What we install and why it works.",
    fusion: [
      { num: "01", title: "Hydroponic growing", tags: "Plants grow in a nutrient solution. No soil. Fewer diseases. Higher yield than traditional growing." },
      { num: "02", title: "Sensors and automation", tags: "pH, EC, temperature, humidity. Continuous monitoring. Automatic watering based on readings. Instant phone alerts." },
    ],
    processTitle: "What happens between the first call and a running greenhouse.",
    process: [{ title: "Site visit" }, { title: "Technical plan" }, { title: "3D view" }, { title: "Installation" }, { title: "Training" }, { title: "Ongoing support" }],
    cta: {
      eyebrow: "On-site visits by appointment.",
      title: "You have a greenhouse or a greenhouse project. We come see it.",
      button: "Book a visit",
    },
  },
};

export function HydroponieView() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative grid gap-12 pt-4 pb-6 md:grid-cols-2 md:items-center md:gap-16 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-(--shell-padding) inset-y-0 -z-10 overflow-hidden">
            <div className="absolute -left-10 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/8 blur-[80px]" />
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }} className="space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {t.hero.kicker}
            </div>
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {t.hero.title}
              <br />
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">{t.hero.highlight}</span>
            </h1>
            <p className="max-w-md text-lg text-slate-400">{t.hero.sub}</p>
            <div className="flex flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-linear-to-r from-emerald-400 via-cyan-400 to-indigo-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald-400/20 transition hover:scale-105">
                {t.hero.cta1}
              </Link>
              <a href="#comment" className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/12 bg-white/4 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white/25 hover:bg-white/8">
                {t.hero.cta2}
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }} className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-emerald-500/15 blur-3xl" />
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <div className="grid grid-cols-2 gap-3">
                  {t.hero.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/8 bg-slate-950/60 p-4">
                      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-emerald-300">{m.label}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="grid grid-cols-3 divide-x divide-white/8 border-y border-white/8 py-10">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <span className="bg-linear-to-r from-emerald-300 via-cyan-300 to-indigo-300 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">{s.value}</span>
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-500">{s.label}</span>
              </div>
            ))}
          </section>
        </FadeUp>

        {/* ── FUSION ───────────────────────────────────────────────────── */}
        <FadeUp>
          <section id="comment" className="space-y-10">
            <h2 className="text-3xl font-black sm:text-4xl">{t.fusionTitle}</h2>
            <div className="flex flex-col gap-3">
              {t.fusion.map((item, i) => (
                <motion.div key={item.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.12 }} className="flex items-center gap-6 rounded-2xl border border-white/8 bg-slate-900/40 p-6 sm:gap-10 sm:p-8">
                  <span className="shrink-0 bg-linear-to-br from-emerald-300 to-cyan-300 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">{item.num}</span>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{item.title}</p>
                    <p className="mt-1 text-sm italic text-slate-400">{item.tags}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── PROCESS ──────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-14">
            <h2 className="text-center text-3xl font-black sm:text-4xl lg:text-5xl">{t.processTitle}</h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {t.process.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950">
                    <span className="bg-linear-to-br from-emerald-400 to-cyan-400 bg-clip-text text-lg font-black text-transparent">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/15 via-cyan-500/8 to-indigo-500/15" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
            </div>
            <div className="relative space-y-6">
              <p className="text-xs uppercase tracking-[0.5em] text-emerald-300">{t.cta.eyebrow}</p>
              <h2 className="text-4xl font-black text-balance sm:text-5xl">{t.cta.title}</h2>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-2xl transition hover:scale-105">
                {t.cta.button}
              </Link>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
