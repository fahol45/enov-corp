"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type DbItem = { id: string; title: string; description: string; image_url: string; category: "hydro" | "web" | "training"; tags: string; external_url: string; sort_order: number; active: boolean };

type HeroCopy = { kicker: string; title: string; highlight: string; sub: string };
type CtaCopy = { title: string; button: string };

const heroCopy: Record<SupportedLanguage, HeroCopy> = {
  fr: { kicker: "Portfolio", title: "Projets livrés.", highlight: "Résultats mesurables.", sub: "Serres connectées, applications sur mesure, formations terrain. Voici ce qu'on a concrètement réalisé." },
  en: { kicker: "Portfolio", title: "Projects delivered.", highlight: "Measurable results.", sub: "Connected greenhouses, custom applications, hands-on training. Here's what we've actually built." },
};

const sectionTitles: Record<SupportedLanguage, { hydro: string; web: string; training: string }> = {
  fr: { hydro: "Hydroponie & IoT", web: "Applications & Sites web", training: "Formations Enov Academy" },
  en: { hydro: "Hydroponics & IoT", web: "Apps & Websites", training: "Enov Academy Training" },
};

const ctaCopy: Record<SupportedLanguage, CtaCopy> = {
  fr: { title: "Un projet similaire en tête. On vous répond en 24h.", button: "Nous contacter" },
  en: { title: "A similar project in mind. We reply within 24h.", button: "Contact us" },
};

const FALLBACK_ITEMS: DbItem[] = [
  { id: "f1", title: "Serre hydroponique intelligente", description: "", image_url: "/Academy_images/Hydroponie%20intelligente%20%26%20data.jpg", category: "hydro", tags: "Capteurs pH & EC · Arrosage automatique · Dashboard mobile", external_url: "", sort_order: 0, active: true },
  { id: "f2", title: "Digital Twin industriel", description: "", image_url: "/Academy_images/Digital%20Twin%20Industrie.webp", category: "hydro", tags: "Jumelage numérique · Monitoring temps réel · Alertes SMS", external_url: "", sort_order: 1, active: true },
  { id: "f3", title: "Lab IoT & Robotique", description: "", image_url: "/Academy_images/IoT%20%26%20Robotics%20Lab.webp", category: "hydro", tags: "Automatisation · Capteurs embarqués · Interface de contrôle", external_url: "", sort_order: 2, active: true },
  { id: "f4", title: "Interface de gestion web", description: "", image_url: "/pc-portable.png", category: "web", tags: "Next.js · Dashboard · Exports automatiques", external_url: "", sort_order: 3, active: true },
  { id: "f5", title: "Application mobile terrain", description: "", image_url: "/mobile.png", category: "web", tags: "React Native · Android & iOS · Mode hors ligne", external_url: "", sort_order: 4, active: true },
  { id: "f6", title: "Automatisation & Data", description: "", image_url: "/Academy_images/Data_Automation_Power.jpg", category: "web", tags: "Pipelines de données · Reporting · Intégration API", external_url: "", sort_order: 5, active: true },
  { id: "f7", title: "Web Fullstack", description: "", image_url: "/Academy_images/Web%20Fullstack.jpg", category: "training", tags: "React · Node.js · Déploiement · Projet à rendre", external_url: "", sort_order: 6, active: true },
  { id: "f8", title: "AI Product Roadmap", description: "", image_url: "/Academy_images/Webinaire%20AI%20Product%20Roadmap.webp", category: "training", tags: "LLM · Prompting · Intégration IA dans produit", external_url: "", sort_order: 7, active: true },
  { id: "f9", title: "UX/UI & Design Ops", description: "", image_url: "/Academy_images/UXUI%20Mapping%20%26%20Design%20Ops.webp", category: "training", tags: "Figma · Parcours utilisateur · Systèmes de design", external_url: "", sort_order: 8, active: true },
];

function ProjectCard({ item, index }: { item: DbItem; index: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-slate-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-slate-900/70"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image_url}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-base font-bold text-white">{item.title}</p>
        {item.description && <p className="mt-1 text-sm text-slate-400">{item.description}</p>}
        <p className="mt-1.5 text-xs tracking-wide text-slate-500">{item.tags}</p>
      </div>
    </motion.div>
  );

  if (item.external_url) {
    return (
      <Link href={item.external_url} target="_blank" rel="noopener noreferrer">
        {card}
      </Link>
    );
  }
  return card;
}

export default function PortfolioPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState<DbItem[]>(FALLBACK_ITEMS);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((d) => { if (d.ok && d.items.length > 0) setItems(d.items); })
      .catch(() => {});
  }, []);

  const hero = heroCopy[language];
  const titles = sectionTitles[language];
  const cta = ctaCopy[language];

  const hydroItems = items.filter((i) => i.category === "hydro");
  const webItems = items.filter((i) => i.category === "web");
  const trainingItems = items.filter((i) => i.category === "training");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-6 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-(--shell-padding) inset-y-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/8 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/8 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/25 bg-sky-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-sky-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
              {hero.kicker}
            </div>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {hero.title}
              <br />
              <span className="bg-linear-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
                {hero.highlight}
              </span>
            </h1>

            <p className="max-w-md text-lg text-slate-400">{hero.sub}</p>
          </motion.div>
        </section>

        {/* ── HYDROPONIE & IoT ─────────────────────────────────────────── */}
        {hydroItems.length > 0 && (
          <FadeUp>
            <section className="space-y-8">
              <h2 className="text-2xl font-black sm:text-3xl">{titles.hydro}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hydroItems.map((item, i) => <ProjectCard key={item.id} item={item} index={i} />)}
              </div>
            </section>
          </FadeUp>
        )}

        {/* ── WEB & MOBILE ─────────────────────────────────────────────── */}
        {webItems.length > 0 && (
          <FadeUp>
            <section className="space-y-8">
              <h2 className="text-2xl font-black sm:text-3xl">{titles.web}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {webItems.map((item, i) => <ProjectCard key={item.id} item={item} index={i} />)}
              </div>
            </section>
          </FadeUp>
        )}

        {/* ── FORMATIONS ───────────────────────────────────────────────── */}
        {trainingItems.length > 0 && (
          <FadeUp>
            <section className="space-y-8">
              <h2 className="text-2xl font-black sm:text-3xl">{titles.training}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trainingItems.map((item, i) => <ProjectCard key={item.id} item={item} index={i} />)}
              </div>
            </section>
          </FadeUp>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div className="absolute inset-0 bg-linear-to-br from-sky-500/12 via-fuchsia-500/8 to-emerald-500/12" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
            </div>
            <div className="relative space-y-6">
              <h2 className="text-3xl font-black text-balance sm:text-4xl">{cta.title}</h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-2xl transition hover:scale-105"
              >
                {cta.button}
              </Link>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
