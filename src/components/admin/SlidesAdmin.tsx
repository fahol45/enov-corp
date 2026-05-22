"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { id: string; image_url: string; title: string; sort_order: number; active: boolean };

const inputClass = "rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-sky-500/60 w-full";

export function SlidesAdmin() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/slides")
      .then((r) => r.json())
      .then((d) => setSlides(d.slides ?? []))
      .catch(() => setError("Impossible de charger les slides."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("slug", "slides");
    fd.append("kind", "image");
    const r = await fetch("/api/admin/academy/upload", { method: "POST", body: fd });
    const d = await r.json();
    return d.ok ? d.url : null;
  };

  const handleAdd = async () => {
    setError("");
    let imageUrl = newUrl.trim();

    if (!imageUrl && fileRef.current?.files?.[0]) {
      setUploading(true);
      const uploaded = await uploadFile(fileRef.current.files[0]);
      setUploading(false);
      if (!uploaded) { setError("Upload échoué."); return; }
      imageUrl = uploaded;
    }

    if (!imageUrl) { setError("Image requise (URL ou fichier)."); return; }

    const r = await fetch("/api/admin/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl, title: newTitle, sort_order: slides.length, active: true }),
    });
    const d = await r.json();
    if (d.ok) { setNewTitle(""); setNewUrl(""); if (fileRef.current) fileRef.current.value = ""; load(); }
    else setError(d.message ?? "Erreur.");
  };

  const toggle = async (slide: Slide) => {
    await fetch("/api/admin/slides", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: slide.id, active: !slide.active }),
    });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce slide ?")) return;
    await fetch(`/api/admin/slides?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-8">
      {/* SQL hint */}
      <details className="rounded-2xl border border-white/8 bg-slate-900/40 p-4">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-slate-400">Table Supabase requise (cliquer pour voir le SQL)</summary>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950/80 p-4 text-xs text-emerald-300">{`CREATE TABLE hero_slides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  title text DEFAULT '',
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);`}</pre>
      </details>

      {/* Add form */}
      <section className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/40 p-6">
        <h2 className="text-lg font-bold">Ajouter un slide</h2>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Titre (optionnel)" className={inputClass} />
        <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL de l'image (ou charger un fichier ci-dessous)" className={inputClass} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input ref={fileRef} type="file" accept="image/*" className="text-sm text-slate-400 file:mr-3 file:rounded-full file:border-0 file:bg-sky-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-sky-300" />
          <button
            onClick={handleAdd}
            disabled={uploading}
            className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50"
          >
            {uploading ? "Upload..." : "Ajouter"}
          </button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </section>

      {/* Slides list */}
      <section className="space-y-4">
        {loading && <p className="text-slate-400">Chargement...</p>}
        {!loading && slides.length === 0 && <p className="text-slate-400">Aucun slide. Ajoutez-en ci-dessus ou créez la table Supabase.</p>}
        {slides.map((slide) => (
          <div key={slide.id} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-slate-900/40 p-4">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
              <Image src={slide.image_url} alt={slide.title || "slide"} fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white">{slide.title || <span className="text-slate-500">Sans titre</span>}</p>
              <p className="truncate text-xs text-slate-500">{slide.image_url}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => toggle(slide)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${slide.active ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}
              >
                {slide.active ? "Actif" : "Inactif"}
              </button>
              <button onClick={() => remove(slide.id)} className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/25">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
