"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type AboutCopy = {
  hero: { kicker: string; title: string; highlight: string; sub: string; cta: string };
  pillarsTitle: string;
  pillars: Array<{ num: string; title: string; tags: string; href: string }>;
  valuesTitle: string;
  values: Array<{ num: string; title: string }>;
  cta: { title: string; button: string };
};

const copy: Record<SupportedLanguage, AboutCopy> = {
  fr: {
    hero: {
      kicker: "À propos",
      title: "On ne fait pas tout.",
      highlight: "On fait bien.",
      sub: "Trois spécialités pointues. Une équipe soudée. Des projets livrés. Enov CORP, c'est votre partenaire technique à Rabat — sans les discours creux.",
      cta: "Parler à l'équipe",
    },
    pillarsTitle: "Nos trois métiers.",
    pillars: [
      { num: "01", title: "Serres connectées", tags: "Récoltez plus. Arrosez moins. Dormez mieux.", href: "/hydroponie" },
      { num: "02", title: "Apps & Sites web", tags: "Interface claire. Code solide. Livraison garantie.", href: "/web-mobile" },
      { num: "03", title: "Formation terrain", tags: "Apprenez en faisant. Repartez avec un certificat.", href: "/academy" },
    ],
    valuesTitle: "Notre engagement, en trois mots.",
    values: [
      { num: "01", title: "On livre" },
      { num: "02", title: "On explique" },
      { num: "03", title: "On reste" },
    ],
    cta: { title: "Une question ? Un projet ?", button: "Parlez à l'équipe" },
  },
  en: {
    hero: {
      kicker: "About",
      title: "We don't do everything.",
      highlight: "We do it well.",
      sub: "Three sharp specialities. One tight-knit team. Projects delivered. Enov CORP is your technical partner in Rabat — without the empty talk.",
      cta: "Talk to the team",
    },
    pillarsTitle: "Our three crafts.",
    pillars: [
      { num: "01", title: "Connected greenhouses", tags: "Harvest more. Water less. Sleep better.", href: "/hydroponie" },
      { num: "02", title: "Apps & Websites", tags: "Clean interface. Solid code. Guaranteed delivery.", href: "/web-mobile" },
      { num: "03", title: "Hands-on training", tags: "Learn by doing. Leave with a certificate.", href: "/academy" },
    ],
    valuesTitle: "Our commitment, in three words.",
    values: [
      { num: "01", title: "We deliver" },
      { num: "02", title: "We explain" },
      { num: "03", title: "We stay" },
    ],
    cta: { title: "A question? A project?", button: "Talk to the team" },
  },
};

const PILLAR_ACCENT = [
  { num: "from-emerald-300 to-cyan-300", border: "group-hover:border-emerald-500/30" },
  { num: "from-fuchsia-300 to-purple-300", border: "group-hover:border-fuchsia-500/30" },
  { num: "from-sky-300 to-indigo-300", border: "group-hover:border-sky-500/30" },
];

const VALUE_COLORS = ["from-amber-300 to-rose-300", "from-rose-300 to-fuchsia-300", "from-fuchsia-300 to-indigo-300"];

export default function AProposPage() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-6 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-(--shell-padding) inset-y-0 -z-10 overflow-hidden">
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

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              {t.hero.title}
              <br />
              <span className="bg-linear-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">
                {t.hero.highlight}
              </span>
            </h1>

            <p className="max-w-lg text-lg text-slate-400">{t.hero.sub}</p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-amber-400 via-rose-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-amber-500/20 transition hover:scale-105"
            >
              {t.hero.cta}
            </Link>
          </motion.div>
        </section>

        {/* ── PILLARS ──────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-10">
            <h2 className="text-3xl font-black sm:text-4xl">{t.pillarsTitle}</h2>
            <div className="flex flex-col gap-3">
              {t.pillars.map((pillar, i) => {
                const accent = PILLAR_ACCENT[i];
                return (
                  <motion.div key={pillar.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
                    <Link href={pillar.href} className={`group flex items-center gap-5 rounded-2xl border border-white/8 bg-slate-900/40 p-5 transition-all duration-300 hover:bg-slate-900/70 sm:gap-8 sm:p-7 ${accent.border}`}>
                      <span className={`shrink-0 bg-linear-to-br ${accent.num} bg-clip-text text-4xl font-black text-transparent sm:text-5xl`}>{pillar.num}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold text-white sm:text-xl">{pillar.title}</p>
                        <p className="mt-1 text-sm italic text-slate-400">{pillar.tags}</p>
                      </div>
                      <span className="shrink-0 text-xl text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">→</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </FadeUp>

        {/* ── VALUES ───────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-10">
            <h2 className="text-3xl font-black sm:text-4xl">{t.valuesTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {t.values.map((v, i) => (
                <motion.div
                  key={v.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/40 p-8 transition hover:border-white/15"
                >
                  <span className="pointer-events-none absolute right-4 top-0 select-none text-[7rem] font-black leading-none text-white/[0.025] transition-all duration-500 group-hover:text-white/[0.05]">
                    {v.num}
                  </span>
                  <p className={`bg-linear-to-r ${VALUE_COLORS[i]} bg-clip-text text-2xl font-black text-transparent`}>{v.title}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/12 via-rose-500/8 to-indigo-500/12" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl" />
            </div>
            <div className="relative space-y-6">
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
