"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Training, TrainingStatus } from "@/lib/trainings";
import { TrainingCard } from "./TrainingCard";

type Props = {
  trainings: Training[];
  categories: string[];
  initialSearch?: string;
  initialCategory?: string;
};

type SortKey = "default" | "rating" | "duration";

const STATUS_OPTS: { value: TrainingStatus | "all"; label: string }[] = [
  { value: "all",       label: "Tous"       },
  { value: "available", label: "Disponible" },
  { value: "soon",      label: "Bientôt"    },
  { value: "closed",    label: "Fermée"     },
];

const STATUS_PRIORITY: Record<TrainingStatus, number> = {
  available: 0, soon: 1, closed: 2,
};

function slugStudents(slug: string) {
  const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return 24 + (n % 76);
}

export function TrainingFilters({ trainings, categories, initialSearch = "", initialCategory = "" }: Props) {
  const [search,   setSearch]   = useState(initialSearch);
  const [category, setCategory] = useState(
    initialCategory && categories.includes(initialCategory) ? initialCategory : "all"
  );
  const [status,   setStatus]   = useState<TrainingStatus | "all">("all");
  const [sort,     setSort]     = useState<SortKey>("default");
  const [view,     setView]     = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = trainings.filter((t) => {
      const matchQ = q ? [t.title, t.summary, t.category].join(" ").toLowerCase().includes(q) : true;
      const matchC = category === "all" || t.category === category;
      const matchS = status   === "all" || t.status   === status;
      return matchQ && matchC && matchS;
    });

    if (sort === "rating") {
      list = [...list].sort((a, b) => {
        const ra = 43 + (a.slug.split("").reduce((x, c) => x + c.charCodeAt(0), 0) % 7);
        const rb = 43 + (b.slug.split("").reduce((x, c) => x + c.charCodeAt(0), 0) % 7);
        return rb - ra;
      });
    } else if (sort === "duration") {
      list = [...list].sort((a, b) => slugStudents(b.slug) - slugStudents(a.slug));
    } else {
      list = [...list].sort((a, b) => {
        const p = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
        return p !== 0 ? p : a.title.localeCompare(b.title, "fr");
      });
    }
    return list;
  }, [trainings, search, category, status, sort]);

  const webinars   = filtered.filter((t) => t.category === "Webinaire");
  const formations = filtered.filter((t) => t.category !== "Webinaire");

  return (
    <div className="space-y-8">

      {/* ── Filter bar ── */}
      <div className="sticky top-14 z-30 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 bg-slate-950/90 backdrop-blur-2xl border-b border-white/5">
        <div className="space-y-3">

          {/* Row 1: search + sort + view toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher…"
                className="w-full h-9 bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-fuchsia-500/50 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition text-xs"
                >✕</button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 bg-white/4 border border-white/8 text-slate-400 text-xs rounded-xl px-3 outline-none hover:border-white/20 transition cursor-pointer"
            >
              <option value="default">Trier : Défaut</option>
              <option value="rating">Trier : Note</option>
              <option value="duration">Trier : Popularité</option>
            </select>

            {/* View toggle */}
            <div className="flex items-center gap-1 border border-white/8 rounded-xl p-1">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${view === v ? "bg-white/10 text-white" : "text-slate-600 hover:text-slate-400"}`}
                >
                  {v === "grid"
                    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                    : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: category pills + status pills */}
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 shrink-0">
              {["all", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 text-[0.62rem] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                    category === cat
                      ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-[0_0_16px_rgba(192,38,211,0.3)]"
                      : "bg-white/3 border-white/8 text-slate-500 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat === "all" ? "Toutes" : cat}
                </button>
              ))}
            </div>

            <div className="w-px h-4 bg-white/10 shrink-0" />

            <div className="flex items-center gap-1.5 shrink-0">
              {STATUS_OPTS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`text-[0.62rem] font-semibold px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                    status === opt.value
                      ? "bg-slate-700 border-slate-500 text-white"
                      : "bg-white/3 border-white/8 text-slate-600 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Result header ── */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-xs text-slate-600 -mb-2">
          <span>
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
            {formations.length > 0 && ` · ${formations.length} formation${formations.length !== 1 ? "s" : ""}`}
            {webinars.length   > 0 && ` · ${webinars.length} webinaire${webinars.length !== 1 ? "s" : ""}`}
          </span>
          <span className="text-fuchsia-500/60 font-medium tracking-wide text-[0.6rem] uppercase">Sélection Enov</span>
        </div>
      )}

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/1.5 py-20 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/6 flex items-center justify-center mb-5 text-slate-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <p className="text-slate-300 font-semibold mb-2">Aucune formation trouvée</p>
          <p className="text-slate-600 text-sm mb-6 max-w-xs">Essaie d&apos;autres mots-clés ou réinitialise les filtres.</p>
          <button
            onClick={() => { setSearch(""); setCategory("all"); setStatus("all"); }}
            className="text-xs text-fuchsia-400 hover:text-fuchsia-300 border border-fuchsia-500/30 hover:border-fuchsia-500/60 px-4 py-2 rounded-full transition"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* ── Formations ── */}
      {formations.length > 0 && (
        <section className="space-y-5">
          <SectionHeader title="Formations" desc="Parcours complets avec accompagnement et certification" badge="Priorité" badgeColor="fuchsia" />
          <TrainingGrid trainings={formations} view={view} />
        </section>
      )}

      {/* ── Webinaires ── */}
      {webinars.length > 0 && (
        <section className="space-y-5">
          <SectionHeader title="Webinaires" desc="Sessions live courtes pour explorer un sujet en profondeur" badge="Live" badgeColor="cyan" />
          <TrainingGrid trainings={webinars} view={view} />
        </section>
      )}
    </div>
  );
}

/* ─── Section header ───────────────────────────────────────────────────────── */

function SectionHeader({ title, desc, badge, badgeColor }: { title: string; desc: string; badge: string; badgeColor: "fuchsia" | "cyan" }) {
  const colors = badgeColor === "fuchsia"
    ? "text-fuchsia-400/70 border-fuchsia-500/20"
    : "text-cyan-400/70 border-cyan-500/20";
  return (
    <div className="flex items-center gap-4">
      <div className="min-w-0">
        <h2 className="text-base font-bold text-white tracking-tight">{title}</h2>
        <p className="text-xs text-slate-600 mt-0.5 truncate">{desc}</p>
      </div>
      <div className="flex-1 h-px bg-white/4" />
      <span className={`shrink-0 text-[0.58rem] font-bold uppercase tracking-[0.2em] border px-2.5 py-1 rounded-full ${colors}`}>
        {badge}
      </span>
    </div>
  );
}

/* ─── Grid / List ──────────────────────────────────────────────────────────── */

function TrainingGrid({ trainings, view }: { trainings: Training[]; view: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div className="space-y-3">
        {trainings.map((t) => <TrainingListRow key={t.slug} training={t} />)}
      </div>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {trainings.map((t) => <TrainingCard key={t.slug} training={t} />)}
    </div>
  );
}

/* ─── List row view ────────────────────────────────────────────────────────── */

function TrainingListRow({ training }: { training: Training }) {
  const n = training.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rating   = `${4}.${3 + (n % 7)}`;
  const students = 24 + (n % 76);

  return (
    <Link
      href={`/academy/${training.slug}`}
      className="flex items-center gap-4 rounded-xl border border-white/6 bg-[#080d14] hover:border-fuchsia-500/25 hover:bg-fuchsia-950/10 p-4 transition group"
    >
      {/* Thumb */}
      <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900">
        {training.coverImage
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={training.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          : <div className="w-full h-full bg-linear-to-br from-fuchsia-950/60 to-violet-950/60" />
        }
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[0.6rem] text-fuchsia-400/70 font-semibold uppercase tracking-widest mb-0.5">{training.category}</p>
        <p className="text-sm font-bold text-white line-clamp-1 group-hover:text-fuchsia-100 transition">{training.title}</p>
        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{training.summary}</p>
      </div>
      {/* Meta */}
      <div className="shrink-0 text-right space-y-1">
        <p className="text-sm font-black text-white">{training.details.price || "—"}</p>
        <p className="text-[0.62rem] text-amber-400">★ {rating} <span className="text-slate-700">({students})</span></p>
        <p className="text-[0.6rem] text-slate-600">{training.details.duration}</p>
      </div>
    </Link>
  );
}
