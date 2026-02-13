"use client";

import { useMemo, useState } from "react";
import type { Training, TrainingStatus } from "@/lib/trainings";
import { TrainingCard } from "./TrainingCard";

type TrainingFiltersProps = {
  trainings: Training[];
  categories: string[];
};

const statusOptions: { value: TrainingStatus | "all"; label: string }[] = [
  { value: "all", label: "Tous les statuts" },
  { value: "available", label: "Disponible" },
  { value: "soon", label: "Bientôt" },
  { value: "closed", label: "Fermée" },
];

const statusPriority: Record<TrainingStatus, number> = {
  available: 0,
  soon: 1,
  closed: 2,
};

export function TrainingFilters({ trainings, categories }: TrainingFiltersProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<TrainingStatus | "all">("all");

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return trainings
      .filter((training) => {
        const matchesSearch = normalized
          ? [training.title, training.summary, training.category]
              .join(" ")
              .toLowerCase()
              .includes(normalized)
          : true;
        const matchesCategory =
          category === "all" ? true : training.category === category;
        const matchesStatus =
          status === "all" ? true : training.status === status;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const priority =
          statusPriority[a.status] - statusPriority[b.status];
        if (priority !== 0) return priority;
        return a.title.localeCompare(b.title, "fr");
      });
  }, [trainings, search, category, status]);

  const webinars = filtered.filter(
    (training) => training.category === "Webinaire"
  );
  const formations = filtered.filter(
    (training) => training.category !== "Webinaire"
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] lg:grid-cols-[1.4fr_1fr_1fr]">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Recherche
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher une formation, un domaine..."
            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Catégorie
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Statut
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as TrainingStatus | "all")
            }
            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#ec008c]/60"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <span>
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""} ·{" "}
          {formations.length} formation{formations.length > 1 ? "s" : ""} ·{" "}
          {webinars.length} webinaire{webinars.length > 1 ? "s" : ""}
        </span>
        <span className="text-[#00a3ff]">Sélection premium Enov Academy</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
          Aucune formation ne correspond à votre recherche.
        </div>
      ) : null}

      {formations.length > 0 ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Formations
              </h2>
              <p className="text-sm text-slate-400">
                Parcours complets, accompagnement et montée en compétence.
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-400">
              Priorité
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {formations.map((training) => (
              <TrainingCard key={training.slug} training={training} />
            ))}
          </div>
        </section>
      ) : null}

      {webinars.length > 0 ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Webinaires</h2>
              <p className="text-sm text-slate-400">
                Sessions live courtes pour explorer un sujet précis.
              </p>
            </div>
            <span className="rounded-full border border-[#00a3ff]/30 bg-[#00a3ff]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#9ad9ff]">
              Live
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {webinars.map((training) => (
              <TrainingCard key={training.slug} training={training} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
