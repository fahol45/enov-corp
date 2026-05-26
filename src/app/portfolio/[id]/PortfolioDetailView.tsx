"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Category = "hydro" | "web" | "training";
type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: Category;
  tags: string;
  external_url: string;
  active: boolean;
  duration: string;
  year: string;
  client_name: string;
  results: string;
};

const CATEGORY_LABEL: Record<Category, string> = {
  hydro: "Hydroponie & IoT",
  web: "Web & Mobile",
  training: "Formation",
};

const CATEGORY_GRADIENT: Record<Category, string> = {
  hydro: "from-emerald-400 to-cyan-400",
  web: "from-fuchsia-400 to-purple-400",
  training: "from-sky-400 to-indigo-400",
};

const CATEGORY_GLOW: Record<Category, string> = {
  hydro: "bg-emerald-500/8",
  web: "bg-fuchsia-500/8",
  training: "bg-sky-500/8",
};

function Skeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell py-8 sm:py-12 space-y-8 animate-pulse">
        <div className="h-8 w-40 rounded-full bg-slate-800" />
        <div className="h-[40vh] w-full rounded-3xl bg-slate-800 sm:h-[52vh]" />
        <div className="h-6 w-32 rounded bg-slate-800" />
        <div className="h-12 w-3/4 rounded bg-slate-800" />
        <div className="h-24 w-full rounded bg-slate-800" />
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-6">
      <p className="text-6xl font-black text-slate-700">404</p>
      <p className="text-slate-400">Ce projet est introuvable ou n&apos;est plus disponible.</p>
      <Link
        href="/portfolio"
        className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        ← Retour au portfolio
      </Link>
    </div>
  );
}

export function PortfolioDetailView({ id }: { id: string }) {
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/portfolio/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        if (d.ok && d.item) setItem(d.item);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Skeleton />;
  if (notFound || !item) return <NotFoundState />;

  const tags = item.tags
    ? item.tags.split("·").map((t) => t.trim()).filter(Boolean)
    : [];

  const isValidExternal =
    item.external_url &&
    (item.external_url.startsWith("http://") || item.external_url.startsWith("https://"));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute left-0 top-0 h-[500px] w-[500px] rounded-full ${CATEGORY_GLOW[item.category]} blur-[120px]`} />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-slate-800/50 blur-[80px]" />
      </div>

      <div className="app-shell py-8 sm:py-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
        >
          ← Retour au portfolio
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Left ── */}
          <div className="space-y-8">

            {item.image_url && (
              <div className="relative overflow-hidden rounded-3xl border border-white/8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-[40vh] w-full object-cover sm:h-[52vh]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
            )}

            {/* Category + meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-[0.65rem] font-bold uppercase tracking-[0.5em] bg-linear-to-r ${CATEGORY_GRADIENT[item.category]} bg-clip-text text-transparent`}>
                {CATEGORY_LABEL[item.category]}
              </span>
              {item.year && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-slate-400">{item.year}</span>
              )}
              {item.duration && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-slate-400">{item.duration}</span>
              )}
              {item.client_name && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-slate-400">Client : {item.client_name}</span>
              )}
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>

            {/* Résultat clé */}
            {item.results && (
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/6 px-5 py-4">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                <p className="text-base font-semibold text-emerald-300">{item.results}</p>
              </div>
            )}

            {item.description && (
              <p className="text-lg leading-relaxed text-slate-300">
                {item.description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Technologies & méthodes</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: sidebar ── */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">

            {isValidExternal ? (
              <a
                href={item.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-slate-900 shadow-xl transition hover:scale-[1.02]"
              >
                Voir le projet live ↗
              </a>
            ) : (
              <div className="rounded-2xl border border-white/8 bg-white/3 px-6 py-4 text-center text-sm text-slate-500">
                Projet réalisé en interne — non diffusé publiquement
              </div>
            )}

            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
            >
              Projet similaire ? Contactez-nous →
            </Link>

            <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Catégorie</p>
              <p className={`font-semibold bg-linear-to-r ${CATEGORY_GRADIENT[item.category]} bg-clip-text text-transparent`}>
                {CATEGORY_LABEL[item.category]}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
