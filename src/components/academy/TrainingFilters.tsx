"use client";

import { useMemo, useState, useEffect } from "react";
import type { Training, TrainingStatus } from "@/lib/trainings";
import { TrainingCard } from "./TrainingCard";

type Props = { trainings: Training[]; categories: string[]; initialSearch?: string; initialCategory?: string };
const priority: Record<TrainingStatus, number> = { available: 0, soon: 1, closed: 2 };

export function TrainingFilters({ trainings, categories, initialSearch = "", initialCategory = "" }: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "all");
  const [status, setStatus] = useState<TrainingStatus | "all">("all");
  const [sort, setSort] = useState("availability");
  useEffect(() => { setSearch(initialSearch); setCategory(categories.includes(initialCategory) ? initialCategory : "all"); }, [initialSearch, initialCategory, categories]);
  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("fr");
    return trainings.filter(t => (!q || [t.title, t.summary, t.category].join(" ").toLocaleLowerCase("fr").includes(q)) && (category === "all" || t.category === category) && (status === "all" || t.status === status)).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title, "fr") : priority[a.status] - priority[b.status] || a.title.localeCompare(b.title, "fr"));
  }, [trainings, search, category, status, sort]);
  return (
    <div className="academy-catalogue">
      <div className="academy-catalogue-heading"><div><p className="brand-eyebrow">LE CATALOGUE</p><h2>Trouvez votre prochaine formation.</h2></div><p aria-live="polite">{filtered.length} programme{filtered.length !== 1 ? "s" : ""}</p></div>
      <div className="academy-filter-panel">
        <label>Rechercher<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Web, data, IoT…" /></label>
        <label>Domaine<select value={category} onChange={e => setCategory(e.target.value)}><option value="all">Tous les domaines</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></label>
        <label>Disponibilité<select value={status} onChange={e => setStatus(e.target.value as TrainingStatus | "all")}><option value="all">Toutes</option><option value="available">Disponible</option><option value="soon">Bientôt</option><option value="closed">Fermée</option></select></label>
        <label>Trier par<select value={sort} onChange={e => setSort(e.target.value)}><option value="availability">Disponibilité</option><option value="title">Nom : A–Z</option></select></label>
      </div>
      {filtered.length ? <div className="academy-course-grid">{filtered.map(t => <TrainingCard key={t.slug} training={t} />)}</div> : <div className="academy-empty"><h3>Aucun programme ne correspond à votre recherche.</h3><p>Essayez un autre mot-clé ou élargissez les filtres.</p><button type="button" className="brand-button" onClick={() => { setSearch(""); setCategory("all"); setStatus("all"); }}>Réinitialiser les filtres</button></div>}
    </div>
  );
}
