"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Category = "hydro" | "web" | "training";
type PortfolioItem = { id: string; title: string; description: string; image_url: string; category: Category; tags: string; external_url: string; sort_order: number; active: boolean };

const BLANK: Omit<PortfolioItem, "id"> = { title: "", description: "", image_url: "", category: "web", tags: "", external_url: "", sort_order: 0, active: true };
const inputClass = "rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-fuchsia-500/60 w-full";
const CATEGORY_LABELS: Record<Category, string> = { hydro: "Hydroponie & IoT", web: "Web & Mobile", training: "Formation" };

export function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<PortfolioItem, "id">>(BLANK);
  const [editing, setEditing] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/portfolio")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setError("Impossible de charger les projets."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("slug", "portfolio");
    fd.append("kind", "image");
    const r = await fetch("/api/admin/academy/upload", { method: "POST", body: fd });
    const d = await r.json();
    return d.ok ? d.url : null;
  };

  const handleSave = async () => {
    setError(""); setSuccess("");
    let imageUrl = form.image_url.trim();

    if (!imageUrl && fileRef.current?.files?.[0]) {
      setUploading(true);
      const uploaded = await uploadFile(fileRef.current.files[0]);
      setUploading(false);
      if (!uploaded) { setError("Upload échoué."); return; }
      imageUrl = uploaded;
    }

    if (!form.title.trim()) { setError("Le titre est requis."); return; }

    const payload = { ...form, image_url: imageUrl };

    const r = await fetch("/api/admin/portfolio", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...payload, id: editing } : payload),
    });
    const d = await r.json();
    if (d.ok) {
      setForm(BLANK); setEditing(null);
      if (fileRef.current) fileRef.current.value = "";
      setSuccess("Enregistré !");
      setTimeout(() => setSuccess(""), 3000);
      load();
    } else setError(d.message ?? "Erreur.");
  };

  const startEdit = (item: PortfolioItem) => {
    setEditing(item.id);
    setForm({ title: item.title, description: item.description, image_url: item.image_url, category: item.category, tags: item.tags, external_url: item.external_url, sort_order: item.sort_order, active: item.active });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
    load();
  };

  const field = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-10">
      {/* SQL hint */}
      <details className="rounded-2xl border border-white/8 bg-slate-900/40 p-4">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-slate-400">Table Supabase requise (cliquer pour voir le SQL)</summary>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950/80 p-4 text-xs text-fuchsia-300">{`CREATE TABLE portfolio_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  image_url text DEFAULT '',
  category text DEFAULT 'web' CHECK (category IN ('hydro','web','training')),
  tags text DEFAULT '',
  external_url text DEFAULT '',
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);`}</pre>
      </details>

      {/* Form */}
      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="text-lg font-bold">{editing ? "Modifier le projet" : "Ajouter un projet"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input value={form.title} onChange={(e) => field("title", e.target.value)} placeholder="Titre *" className={inputClass} />
          <select value={form.category} onChange={(e) => field("category", e.target.value as Category)} className={inputClass}>
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>
        </div>
        <input value={form.tags} onChange={(e) => field("tags", e.target.value)} placeholder="Tags (ex: Next.js · React · Supabase)" className={inputClass} />
        <textarea value={form.description} onChange={(e) => field("description", e.target.value)} placeholder="Description courte" className={`${inputClass} min-h-20 resize-y`} />
        <input value={form.image_url} onChange={(e) => field("image_url", e.target.value)} placeholder="URL de l'image (ou charger un fichier)" className={inputClass} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input ref={fileRef} type="file" accept="image/*" className="text-sm text-slate-400 file:mr-3 file:rounded-full file:border-0 file:bg-fuchsia-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-fuchsia-300" />
        </div>
        <input value={form.external_url} onChange={(e) => field("external_url", e.target.value)} placeholder="Lien vers le projet (optionnel)" className={inputClass} />
        <div className="flex gap-3">
          <button onClick={handleSave} disabled={uploading} className="rounded-full bg-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-fuchsia-400 disabled:opacity-50">
            {uploading ? "Upload..." : editing ? "Mettre à jour" : "Ajouter"}
          </button>
          {editing && <button onClick={() => { setEditing(null); setForm(BLANK); }} className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-slate-300 transition hover:bg-white/5">Annuler</button>}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-emerald-400">{success}</p>}
      </section>

      {/* Items list */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold">Projets ({items.length})</h2>
        {loading && <p className="text-slate-400">Chargement...</p>}
        {!loading && items.length === 0 && <p className="text-slate-400">Aucun projet. Ajoutez-en ci-dessus ou créez la table Supabase.</p>}
        {items.map((item) => (
          <div key={item.id} className={`flex items-center gap-4 rounded-2xl border bg-slate-900/40 p-4 transition ${item.active ? "border-white/8" : "border-white/4 opacity-60"}`}>
            {item.image_url && (
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={item.image_url} alt={item.title} fill className="object-cover" sizes="80px" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-white">{item.title}</p>
              <p className="text-xs text-fuchsia-300">{CATEGORY_LABELS[item.category]}</p>
              {item.tags && <p className="truncate text-xs text-slate-500">{item.tags}</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => startEdit(item)} className="rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/15">Modifier</button>
              <button onClick={() => remove(item.id)} className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/25">Supprimer</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
