"use client";

import { useMemo, useState } from "react";
import type { Training, TrainingStatus } from "@/lib/trainings";
import { TrainingCard } from "./TrainingCard";

type Props = { trainings: Training[]; categories: string[] };

const STATUS_OPTS: { value: TrainingStatus | "all"; label: string }[] = [
  { value: "all",       label: "Tous" },
  { value: "available", label: "Disponible" },
  { value: "soon",      label: "Bientôt" },
  { value: "closed",    label: "Fermée" },
];

const STATUS_PRIORITY: Record<TrainingStatus, number> = { available: 0, soon: 1, closed: 2 };

export function TrainingFilters({ trainings, categories }: Props) {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("all");
  const [status,   setStatus]   = useState<TrainingStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trainings
      .filter((t) => {
        const matchQ  = q ? [t.title, t.summary, t.category].join(" ").toLowerCase().includes(q) : true;
        const matchC  = category === "all" || t.category === category;
        const matchS  = status === "all" || t.status === status;
        return matchQ && matchC && matchS;
      })
      .sort((a, b) => {
        const p = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
        return p !== 0 ? p : a.title.localeCompare(b.title, "fr");
      });
  }, [trainings, search, category, status]);

  const webinars   = filtered.filter((t) => t.category === "Webinaire");
  const formations = filtered.filter((t) => t.category !== "Webinaire");

  return (
    <div className="space-y-10">

      {/* ── Filter bar ── */}
      <div className="sticky top-14 z-30 -mx-4 px-4 py-3 bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="app-shell flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une formation…"
              className="w-full h-9 bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-fuchsia-500/50 transition"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {["all", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 text-[0.65rem] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                  category === cat
                    ? "bg-fuchsia-600 border-fuchsia-500 text-white"
                    : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat === "all" ? "Toutes" : cat}
              </button>
            ))}
          </div>

          {/* Status pills */}
          <div className="flex items-center gap-1.5 shrink-0">
            {STATUS_OPTS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`text-[0.65rem] font-semibold px-3 py-1.5 rounded-full border transition ${
                  status === opt.value
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white/[0.03] border-white/[0.08] text-slate-500 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>
          {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
          {formations.length > 0 && ` · ${formations.length} formation${formations.length !== 1 ? "s" : ""}`}
          {webinars.length > 0 && ` · ${webinars.length} webinaire${webinars.length !== 1 ? "s" : ""}`}
        </span>
        <span className="text-fuchsia-500/70 font-medium">Sélection Enov Academy</span>
      </div>

      {/* ── Empty ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-600">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <p className="text-slate-400 font-medium mb-1">Aucune formation trouvée</p>
          <p className="text-slate-600 text-sm">Essaie d'autres filtres ou recherche un autre terme.</p>
        </div>
      )}

      {/* ── Formations ── */}
      {formations.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Formations</h2>
              <p className="text-xs text-slate-600 mt-0.5">Parcours complets avec accompagnement et certification</p>
            </div>
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fuchsia-500/70 border border-fuchsia-500/20 px-2.5 py-1 rounded-full">
              Priorité
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {formations.map((t) => <TrainingCard key={t.slug} training={t} />)}
          </div>
        </section>
      )}

      {/* ── Webinaires ── */}
      {webinars.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Webinaires</h2>
              <p className="text-xs text-slate-600 mt-0.5">Sessions live courtes pour explorer un sujet précis</p>
            </div>
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-cyan-500/70 border border-cyan-500/20 px-2.5 py-1 rounded-full">
              Live
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {webinars.map((t) => <TrainingCard key={t.slug} training={t} />)}
          </div>
        </section>
      )}
    </div>
  );
}
