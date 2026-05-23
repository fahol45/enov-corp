"use client";

import { useEffect, useRef, useState } from "react";

type Category = "hydro" | "web" | "training";
type PortfolioItem = { id: string; title: string; description: string; image_url: string; category: Category; tags: string; external_url: string; sort_order: number; active: boolean };

const BLANK: Omit<PortfolioItem, "id"> = { title: "", description: "", image_url: "", category: "web", tags: "", external_url: "", sort_order: 0, active: true };
const inputClass = "rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-fuchsia-500/60 w-full";
const CATEGORY_LABELS: Record<Category, string> = { hydro: "Hydroponie & IoT", web: "Web & Mobile", training: "Formation" };
const CATEGORY_COLOR: Record<Category, string> = { hydro: "text-emerald-300", web: "text-fuchsia-300", training: "text-sky-300" };

export function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<PortfolioItem, "id">>(BLANK);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
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
      setForm(BLANK); setEditing(null); setAdding(false);
      if (fileRef.current) fileRef.current.value = "";
      setSuccess("Enregistré !");
      setTimeout(() => setSuccess(""), 3000);
      load();
    } else setError(d.message ?? "Erreur.");
  };

  const startEdit = (item: PortfolioItem) => {
    setEditing(item.id);
    setAdding(false);
    setForm({ title: item.title, description: item.description, image_url: item.image_url, category: item.category, tags: item.tags, external_url: item.external_url, sort_order: item.sort_order, active: item.active });
    setError(""); setSuccess("");
  };

  const handleCancel = () => {
    setEditing(null); setAdding(false); setForm(BLANK); setError(""); setSuccess("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
    if (editing === id) handleCancel();
    load();
  };

  const field = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const showForm = editing !== null || adding;

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">

      {/* ── Left: item list ──────────────────────────────────────── */}
      <aside className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">
            Projets <span className="ml-1 text-slate-500">({items.length})</span>
          </h2>
          <button
            onClick={() => { setAdding(true); setEditing(null); setForm(BLANK); setError(""); setSuccess(""); }}
            className="rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 px-3 py-1.5 text-xs font-semibold text-fuchsia-300 transition hover:bg-fuchsia-500/25"
          >
            + Ajouter
          </button>
        </div>

        {loading && <p className="text-sm text-slate-500">Chargement…</p>}
        {!loading && items.length === 0 && (
          <p className="rounded-2xl border border-white/8 bg-slate-900/40 p-4 text-sm text-slate-500">
            Aucun projet. Cliquez sur &quot;+ Ajouter&quot; pour commencer.
          </p>
        )}

        {items.map((item) => {
          const isActive = editing === item.id;
          return (
            <button
              key={item.id}
              onClick={() => startEdit(item)}
              className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                isActive
                  ? "border-fuchsia-500/40 bg-fuchsia-500/10"
                  : "border-white/8 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/70"
              } ${!item.active ? "opacity-50" : ""}`}
            >
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image_url} alt={item.title} className="h-12 w-16 shrink-0 rounded-xl object-cover" />
              ) : (
                <div className="h-12 w-16 shrink-0 rounded-xl bg-slate-800" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{item.title || "Sans titre"}</p>
                <p className={`text-xs ${CATEGORY_COLOR[item.category]}`}>{CATEGORY_LABELS[item.category]}</p>
                {item.tags && <p className="truncate text-xs text-slate-500">{item.tags}</p>}
              </div>
            </button>
          );
        })}
      </aside>

      {/* ── Right: form ──────────────────────────────────────────── */}
      <section>
        {!showForm ? (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-white/8 bg-slate-900/30 text-sm text-slate-500">
            Sélectionnez un projet pour le modifier, ou cliquez sur &quot;+ Ajouter&quot;.
          </div>
        ) : (
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">
                {editing ? "Modifier le projet" : "Nouveau projet"}
              </h2>
              {editing && (
                <button onClick={() => remove(editing)} className="rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20">
                  Supprimer
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.title} onChange={(e) => field("title", e.target.value)} placeholder="Titre *" className={inputClass} />
              <select value={form.category} onChange={(e) => field("category", e.target.value as Category)} className={inputClass}>
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>

            <input value={form.tags} onChange={(e) => field("tags", e.target.value)} placeholder="Tags (ex: Next.js · React · Supabase)" className={inputClass} />
            <textarea value={form.description} onChange={(e) => field("description", e.target.value)} placeholder="Description courte" className={`${inputClass} min-h-20 resize-y`} />

            <div className="space-y-2">
              <input value={form.image_url} onChange={(e) => field("image_url", e.target.value)} placeholder="URL de l'image" className={inputClass} />
              {form.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image_url} alt="" className="h-32 w-full rounded-2xl object-cover" />
              )}
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml"
                className="text-sm text-slate-400 file:mr-3 file:rounded-full file:border-0 file:bg-fuchsia-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-fuchsia-300" />
            </div>

            <input value={form.external_url} onChange={(e) => field("external_url", e.target.value)} placeholder="Lien vers le projet (optionnel)" className={inputClass} />

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input type="checkbox" checked={form.active} onChange={(e) => field("active", e.target.checked)}
                  className="h-4 w-4 rounded border border-white/20 bg-slate-950 accent-fuchsia-500" />
                Visible sur le site
              </label>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {success && <p className="text-sm text-emerald-400">{success}</p>}

            <div className="flex gap-3">
              <button onClick={handleSave} disabled={uploading}
                className="rounded-full bg-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-fuchsia-400 disabled:opacity-50">
                {uploading ? "Upload…" : editing ? "Enregistrer" : "Ajouter"}
              </button>
              <button onClick={handleCancel}
                className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
