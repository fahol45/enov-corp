"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Category = "hydro" | "web" | "training";
type DbItem = {
  id: string; title: string; description: string; image_url: string;
  category: Category; tags: string; external_url: string; sort_order: number; active: boolean;
  duration: string; year: string; client_name: string; results: string;
};

const heroCopy: Record<SupportedLanguage, { kicker: string; title: string; highlight: string; sub: string }> = {
  fr: { kicker: "Portfolio", title: "Projets livrés.", highlight: "Résultats mesurables.", sub: "Serres connectées, applications sur mesure, formations terrain. Voici ce qu'on a concrètement réalisé." },
  en: { kicker: "Portfolio", title: "Projects delivered.", highlight: "Measurable results.", sub: "Connected greenhouses, custom applications, hands-on training. Here's what we've actually built." },
};

const filterCopy: Record<SupportedLanguage, { all: string; hydro: string; web: string; training: string }> = {
  fr: { all: "Tous", hydro: "Hydroponie & IoT", web: "Web & Mobile", training: "Formations" },
  en: { all: "All", hydro: "Hydroponics & IoT", web: "Web & Mobile", training: "Training" },
};

const ctaCopy: Record<SupportedLanguage, { title: string; button: string }> = {
  fr: { title: "Un projet similaire en tête. On vous répond en 24h.", button: "Nous contacter" },
  en: { title: "A similar project in mind. We reply within 24h.", button: "Contact us" },
};

const EMPTY: Pick<DbItem, "duration" | "year" | "client_name" | "results"> = { duration: "", year: "", client_name: "", results: "" };

const FALLBACK_ITEMS: DbItem[] = [
  { id: "f1", title: "Serre hydroponique intelligente", description: "", image_url: "/Academy_images/Hydroponie%20intelligente%20%26%20data.jpg", category: "hydro", tags: "Capteurs pH & EC · Arrosage automatique · Dashboard mobile", external_url: "", sort_order: 0, active: true, ...EMPTY },
  { id: "f2", title: "Digital Twin industriel", description: "", image_url: "/Academy_images/Digital%20Twin%20Industrie.webp", category: "hydro", tags: "Jumelage numérique · Monitoring temps réel · Alertes SMS", external_url: "", sort_order: 1, active: true, ...EMPTY },
  { id: "f3", title: "Lab IoT & Robotique", description: "", image_url: "/Academy_images/IoT%20%26%20Robotics%20Lab.webp", category: "hydro", tags: "Automatisation · Capteurs embarqués · Interface de contrôle", external_url: "", sort_order: 2, active: true, ...EMPTY },
  { id: "f4", title: "Interface de gestion web", description: "", image_url: "/pc-portable.png", category: "web", tags: "Next.js · Dashboard · Exports automatiques", external_url: "", sort_order: 3, active: true, ...EMPTY },
  { id: "f5", title: "Application mobile terrain", description: "", image_url: "/mobile.png", category: "web", tags: "React Native · Android & iOS · Mode hors ligne", external_url: "", sort_order: 4, active: true, ...EMPTY },
  { id: "f6", title: "Automatisation & Data", description: "", image_url: "/Academy_images/Data_Automation_Power.jpg", category: "web", tags: "Pipelines de données · Reporting · Intégration API", external_url: "", sort_order: 5, active: true, ...EMPTY },
  { id: "f7", title: "Web Fullstack", description: "", image_url: "/Academy_images/Web%20Fullstack.jpg", category: "training", tags: "React · Node.js · Déploiement · Projet à rendre", external_url: "", sort_order: 6, active: true, ...EMPTY },
  { id: "f8", title: "AI Product Roadmap", description: "", image_url: "/Academy_images/Webinaire%20AI%20Product%20Roadmap.webp", category: "training", tags: "LLM · Prompting · Intégration IA dans produit", external_url: "", sort_order: 7, active: true, ...EMPTY },
  { id: "f9", title: "UX/UI & Design Ops", description: "", image_url: "/Academy_images/UXUI%20Mapping%20%26%20Design%20Ops.webp", category: "training", tags: "Figma · Parcours utilisateur · Systèmes de design", external_url: "", sort_order: 8, active: true, ...EMPTY },
];

const CATEGORY_COLOR: Record<Category, string> = {
  hydro: "text-emerald-400",
  web: "text-fuchsia-400",
  training: "text-sky-400",
};

const CATEGORY_LABEL: Record<Category, string> = {
  hydro: "Hydroponie & IoT",
  web: "Web & Mobile",
  training: "Formation",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function normalizeUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

function ProjectCard({ item, index }: { item: DbItem; index: number }) {
  const isReal = UUID_RE.test(item.id);
  const externalUrl = item.external_url ? normalizeUrl(item.external_url) : "";
  const href = externalUrl || (isReal ? `/portfolio/${item.id}` : null);
  const isExternal = !!externalUrl;

  const tags = item.tags ? item.tags.split("·").slice(0, 3).map((t) => t.trim()) : [];

  const inner = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-slate-900/40 transition-all duration-300 ${href ? "hover:-translate-y-1 hover:border-white/20 hover:bg-slate-900/70 cursor-pointer" : ""}`}
    >
      {/* Image */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-800">
        {item.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image_url} alt={item.title} loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-500 ${href ? "group-hover:scale-105" : ""}`}
          />
        ) : (
          <div className="h-full w-full bg-slate-800" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

        {/* Year badge */}
        {item.year && (
          <span className="absolute top-3 right-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[0.6rem] font-semibold text-slate-300 backdrop-blur-sm">
            {item.year}
          </span>
        )}

        {/* Hover overlay */}
        {href && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white px-5 py-2 text-xs font-bold text-slate-900 shadow-lg">
              {isExternal ? "Voir le projet ↗" : "Voir les détails →"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-[0.6rem] font-bold uppercase tracking-[0.35em] ${CATEGORY_COLOR[item.category]}`}>
            {CATEGORY_LABEL[item.category]}
          </p>
          {item.duration && (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6rem] text-slate-400">
              {item.duration}
            </span>
          )}
        </div>

        <p className="text-base font-bold text-white leading-snug">{item.title}</p>

        {item.client_name && (
          <p className="text-xs text-slate-500">Client : {item.client_name}</p>
        )}

        {item.results && (
          <p className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-3 py-2 text-xs font-medium text-emerald-300">
            {item.results}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1 pt-1">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/8 bg-white/4 px-2 py-0.5 text-[0.6rem] text-slate-500">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (!href) return inner;
  if (isExternal) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return <Link href={href}>{inner}</Link>;
}

type FilterValue = "all" | Category;

export function PortfolioView() {
  const { language } = useLanguage();
  const [items, setItems] = useState<DbItem[]>(FALLBACK_ITEMS);
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((d) => { if (d.ok && d.items.length > 0) setItems(d.items); })
      .catch(() => {});
  }, []);

  const hero = heroCopy[language];
  const filters = filterCopy[language];
  const cta = ctaCopy[language];

  const filtered = activeFilter === "all" ? items : items.filter((i) => i.category === activeFilter);

  const filterTabs: { value: FilterValue; label: string }[] = [
    { value: "all", label: filters.all },
    { value: "hydro", label: filters.hydro },
    { value: "web", label: filters.web },
    { value: "training", label: filters.training },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-6 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-(--shell-padding) inset-y-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/8 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/8 blur-[80px]" />
          </div>

          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex-1 space-y-6"
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

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="flex flex-row gap-4 lg:w-64 lg:shrink-0 lg:flex-col"
            >
              {[
                { value: `${items.filter(i => i.category === "hydro").length}`, label: language === "fr" ? "Projets Hydroponie & IoT" : "Hydroponics & IoT projects" },
                { value: `${items.filter(i => i.category === "web").length}`, label: language === "fr" ? "Apps & Sites web" : "Apps & Websites" },
                { value: `${items.filter(i => i.category === "training").length}`, label: language === "fr" ? "Formations réalisées" : "Training programmes" },
              ].map((s) => (
                <div key={s.label} className="flex-1 rounded-2xl border border-white/8 bg-slate-900/50 p-5 lg:flex-none">
                  <p className="text-2xl font-black lg:text-3xl" style={{ background: "linear-gradient(to right, #38bdf8, #a78bfa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FILTERS ──────────────────────────────────────────────────── */}
        <FadeUp>
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === tab.value
                    ? "border-fuchsia-500/50 bg-fuchsia-500/15 text-fuchsia-300"
                    : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {tab.label}
                <span className="ml-1.5 text-xs opacity-50">
                  {tab.value === "all" ? items.length : items.filter((i) => i.category === tab.value).length}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* ── GRID ─────────────────────────────────────────────────────── */}
        <section>
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <ProjectCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="py-16 text-center text-slate-500">Aucun projet dans cette catégorie.</p>
          )}
        </section>

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
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-2xl transition hover:scale-105">
                {cta.button}
              </Link>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
