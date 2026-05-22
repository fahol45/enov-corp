"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type WebMobileCopy = {
  hero: {
    kicker: string;
    title: string;
    highlight: string;
    sub: string;
    cta1: string;
    cta2: string;
  };
  stats: Array<{ value: string; label: string }>;
  catalogTitle: string;
  catalog: Array<{ num: string; title: string; tags: string }>;
  processTitle: string;
  process: Array<{ title: string }>;
  cta: { eyebrow: string; title: string; button: string };
};

const copy: Record<SupportedLanguage, WebMobileCopy> = {
  fr: {
    hero: {
      kicker: "Développement web & mobile",
      title: "Des apps claires,",
      highlight: "utiles et rentables.",
      sub: "Web, mobile, dashboards et portails — UX soignée, livraison rapide, un seul partenaire.",
      cta1: "Discuter de mon projet",
      cta2: "Voir le catalogue",
    },
    stats: [
      { value: "45+", label: "Apps en production" },
      { value: "3 mois", label: "Délai moyen" },
      { value: "4.9/5", label: "Satisfaction clients" },
    ],
    catalogTitle: "Ce qu'on conçoit.",
    catalog: [
      { num: "01", title: "Finance & paiement", tags: "Wallet · Investissements · Suivi" },
      { num: "02", title: "Commerce & marketplace", tags: "B2B · E-commerce · Catalogue" },
      { num: "03", title: "Opérations & maintenance", tags: "GMAO · Production · Qualité" },
      { num: "04", title: "Expérience client", tags: "Portail · Fidélité · Showroom" },
      { num: "05", title: "Sites corporate & portails", tags: "Vitrine · Data · Extranet" },
    ],
    processTitle: "De l'idée au produit.",
    process: [{ title: "Discovery" }, { title: "Design" }, { title: "Build" }, { title: "Run" }],
    cta: { eyebrow: "Prêt pour votre prochain produit ?", title: "Co-créons votre app", button: "Réserver un atelier digital" },
  },
  en: {
    hero: {
      kicker: "Web & mobile development",
      title: "Apps that are clear,",
      highlight: "useful and profitable.",
      sub: "Web, mobile, dashboards and portals — polished UX, fast delivery, one partner.",
      cta1: "Discuss my project",
      cta2: "See the catalog",
    },
    stats: [
      { value: "45+", label: "Apps in production" },
      { value: "3 months", label: "Average delivery" },
      { value: "4.9/5", label: "Client rating" },
    ],
    catalogTitle: "What we build.",
    catalog: [
      { num: "01", title: "Finance & payment", tags: "Wallet · Investments · Tracking" },
      { num: "02", title: "Commerce & marketplace", tags: "B2B · E-commerce · Catalog" },
      { num: "03", title: "Operations & maintenance", tags: "CMMS · Production · Quality" },
      { num: "04", title: "Customer experience", tags: "Portal · Loyalty · Showroom" },
      { num: "05", title: "Corporate sites & portals", tags: "Brand · Data · Extranet" },
    ],
    processTitle: "From idea to product.",
    process: [{ title: "Discovery" }, { title: "Design" }, { title: "Build" }, { title: "Run" }],
    cta: { eyebrow: "Ready for your next product?", title: "Let's build your app", button: "Book a digital workshop" },
  },
};

const CATALOG_ACCENT = [
  "from-fuchsia-300 to-purple-300",
  "from-purple-300 to-blue-300",
  "from-blue-300 to-sky-300",
  "from-sky-300 to-cyan-300",
  "from-cyan-300 to-indigo-300",
];

export function WebMobileView() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-0 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-[var(--shell-padding)] inset-y-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/8 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-fuchsia-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
              {t.hero.kicker}
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              {t.hero.title}
              <br />
              <span className="bg-linear-to-r from-fuchsia-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
                {t.hero.highlight}
              </span>
            </h1>

            <p className="max-w-md text-lg text-slate-400">{t.hero.sub}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-sky-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-purple-500/20 transition hover:scale-105 sm:w-auto"
              >
                {t.hero.cta1}
              </Link>
              <a
                href="#catalogue"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/4 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white/25 hover:bg-white/8 sm:w-auto"
              >
                {t.hero.cta2}
              </a>
            </div>
          </motion.div>

          {/* Visual — laptop + phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative mt-14 flex justify-center"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-purple-500/10 blur-3xl" />
            <div className="relative w-full max-w-2xl rounded-[2.5rem] border border-white/10 bg-linear-to-br from-slate-900/90 to-slate-950/80 p-6 shadow-[0_25px_65px_rgba(3,4,15,0.75)] sm:p-8">
              <Image
                src="/pc-portable.png"
                alt={language === "fr" ? "Interface web ENOV" : "ENOV web interface"}
                width={1536}
                height={1024}
                priority
                className="w-full drop-shadow-[0_20px_50px_rgba(10,12,40,0.8)]"
              />
              {/* Phone badge */}
              <div className="absolute -bottom-4 -right-2 w-20 rounded-[1.5rem] border border-white/10 bg-slate-900 p-2 shadow-xl sm:-right-6 sm:w-28">
                <Image
                  src="/mobile.png"
                  alt={language === "fr" ? "App mobile ENOV" : "ENOV mobile app"}
                  width={1024}
                  height={1536}
                  className="w-full rounded-[1rem]"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="grid grid-cols-3 divide-x divide-white/8 border-y border-white/8 py-10">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <span className="bg-linear-to-r from-fuchsia-300 via-purple-300 to-sky-300 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">
                  {s.value}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-500">{s.label}</span>
              </div>
            ))}
          </section>
        </FadeUp>

        {/* ── CATALOG ──────────────────────────────────────────────────── */}
        <FadeUp>
          <section id="catalogue" className="space-y-10">
            <h2 className="text-3xl font-black sm:text-4xl">{t.catalogTitle}</h2>
            <div className="flex flex-col gap-3">
              {t.catalog.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex items-center gap-5 rounded-2xl border border-white/8 bg-slate-900/40 p-5 transition hover:border-white/20 hover:bg-slate-900/70 sm:gap-8 sm:p-7"
                >
                  <span className={`shrink-0 bg-linear-to-br ${CATALOG_ACCENT[i]} bg-clip-text text-4xl font-black text-transparent sm:text-5xl`}>
                    {item.num}
                  </span>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{item.title}</p>
                    <p className="mt-0.5 text-xs tracking-wide text-slate-500">{item.tags}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── PROCESS ──────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-14">
            <h2 className="text-center text-3xl font-black sm:text-4xl lg:text-5xl">
              {t.processTitle}
            </h2>
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
                      <span className="bg-linear-to-br from-fuchsia-400 to-sky-400 bg-clip-text text-xl font-black text-transparent">
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
          <section className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/15 via-fuchsia-500/8 to-blue-500/15" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
            </div>
            <div className="relative space-y-6">
              <p className="text-xs uppercase tracking-[0.5em] text-fuchsia-300">{t.cta.eyebrow}</p>
              <h2 className="text-4xl font-black text-balance sm:text-5xl">{t.cta.title}</h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-2xl transition hover:scale-105"
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
