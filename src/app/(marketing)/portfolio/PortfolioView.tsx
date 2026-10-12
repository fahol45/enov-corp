"use client";

import Link from "next/link";
import { PageHero, PageCTA } from "@/components/SiteSections";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

function languageLabel(category: Category) { return category === "training" ? "Programme de formation" : "Exemple de solution"; }

function ProjectCard({ item, index }: { item: DbItem; index: number }) {
  const isReal = UUID_RE.test(item.id);
  const href = isReal ? `/portfolio/${item.id}` : null;

  const tags = item.tags ? item.tags.split("·").slice(0, 3).map((t) => t.trim()) : [];

  const inner = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`portfolio-project group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-slate-900/40 transition-all duration-300 ${href ? "hover:-translate-y-1 hover:border-white/20 hover:bg-slate-900/70 cursor-pointer" : ""}`}
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
              Voir les détails →
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

        <h3 className="text-xl font-bold text-white leading-snug">{item.title}</h3>
        {item.description && <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>}
        {!isReal && <p className="text-xs text-slate-500">{languageLabel(item.category)}</p>}

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
    <main className="portfolio-page">
      <PageHero eyebrow="PORTFOLIO / ENOV CORP" title={language === "fr" ? "Des solutions concrètes." : "Practical solutions."} highlight={language === "fr" ? "Des projets à explorer." : "Projects to explore."} description={language === "fr" ? "Découvrez les projets publiés par notre équipe et des exemples de solutions dans nos domaines d’intervention." : "Explore projects published by our team and examples of solutions across our areas of expertise."} />
      <div className="app-shell portfolio-content">
      <div className="portfolio-filters" role="group" aria-label={language === "fr" ? "Filtrer les projets" : "Filter projects"}>{filterTabs.map(tab => <button key={tab.value} type="button" aria-pressed={activeFilter === tab.value} onClick={() => setActiveFilter(tab.value)}>{tab.label}<span>{tab.value === "all" ? items.length : items.filter(i => i.category === tab.value).length}</span></button>)}</div>
      <section aria-label={language === "fr" ? "Projets et solutions" : "Projects and solutions"}><AnimatePresence mode="popLayout"><motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((item, index) => <ProjectCard key={item.id} item={item} index={index} />)}</motion.div></AnimatePresence>{!filtered.length && <p className="py-16 text-center text-slate-500">{language === "fr" ? "Aucun projet dans cette catégorie." : "No projects in this category."}</p>}</section>
      </div><PageCTA title={language === "fr" ? "Et si votre projet était le prochain ?" : "Could your project be next?"} label={cta.button} />
    </main>
  );
}
