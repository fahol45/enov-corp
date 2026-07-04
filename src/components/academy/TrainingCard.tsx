"use client";

import { useState } from "react";
import Link from "next/link";
import type { Training } from "@/lib/trainings";

/* ── deterministic social proof from slug (no DB needed) ── */
function slugStats(slug: string) {
  const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    students: 24 + (n % 76),
    rating:   `${4}.${3 + (n % 7)}`,
    reviews:  6 + (n % 22),
  };
}

const STATUS_META = {
  available: { label: "Disponible",  pill: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",  dot: "bg-emerald-400 animate-pulse" },
  soon:      { label: "Bientôt",     pill: "bg-amber-500/15 border-amber-500/30 text-amber-300",        dot: "bg-amber-400" },
  closed:    { label: "Fermée",      pill: "bg-slate-700/50 border-slate-600/50 text-slate-500",        dot: "bg-slate-600" },
};

const LEVEL_COLOR: Record<string, string> = {
  "Débutant":     "text-emerald-400",
  "Intermédiaire":"text-amber-400",
  "Avancé":       "text-rose-400",
  "Tous niveaux": "text-sky-400",
};

function Stars({ rating }: { rating: string }) {
  const val = parseFloat(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= Math.floor(val) ? "#f59e0b" : i === Math.ceil(val) ? "url(#half)" : "none"} stroke="#f59e0b" strokeWidth="2">
          <defs>
            <linearGradient id="half"><stop offset="50%" stopColor="#f59e0b"/><stop offset="50%" stopColor="transparent"/></linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

export function TrainingCard({ training }: { training: Training }) {
  const [imgError, setImgError] = useState(false);
  const st    = STATUS_META[training.status];
  const stats = slugStats(training.slug);
  const lvlColor = LEVEL_COLOR[training.details.level] ?? "text-slate-400";

  return (
    <article className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-[#080d14] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-500/25 hover:shadow-[0_24px_80px_rgba(168,85,247,0.18)]">

      {/* ── Cover image ── */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {training.coverImage && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={training.coverImage}
            alt={training.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-fuchsia-950/70 via-slate-900 to-violet-950/70 flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="opacity-10">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-[#080d14] via-[#080d14]/20 to-transparent" />

        {/* Duration chip */}
        {training.details.duration && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold text-white/80 bg-black/70 border border-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
              <ClockIcon size={9} />
              {training.details.duration}
            </span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border backdrop-blur-sm ${st.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            {st.label}
          </span>
        </div>

        {/* Bestseller ribbon */}
        {training.status === "available" && (
          <div className="absolute top-3 left-3">
            <span className="text-[0.55rem] font-black uppercase tracking-[0.15em] bg-amber-400 text-black px-2 py-0.5 rounded">
              Bestseller
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-5 gap-3">

        {/* Category + level row */}
        <div className="flex items-center gap-2">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-fuchsia-400/80">
            {training.category}
          </span>
          <span className="text-slate-800">·</span>
          <span className={`text-[0.6rem] font-bold ${lvlColor}`}>{training.details.level}</span>
        </div>

        {/* Title */}
        <h3 className="text-[0.9rem] font-bold text-white leading-snug line-clamp-2 tracking-tight group-hover:text-fuchsia-100 transition-colors">
          {training.title}
        </h3>

        {/* Rating row */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-amber-400">{stats.rating}</span>
          <Stars rating={stats.rating} />
          <span className="text-[0.65rem] text-slate-600">({stats.reviews})</span>
          <span className="ml-auto text-[0.65rem] text-slate-600">{stats.students} apprenants</span>
        </div>

        {/* Outcomes (top 2) */}
        {training.outcomes.slice(0, 2).map((o) => (
          <div key={o} className="flex items-start gap-2 text-[0.72rem] text-slate-500 leading-snug">
            <span className="mt-0.5 w-3.5 h-3.5 rounded-sm bg-fuchsia-500/10 flex items-center justify-center shrink-0">
              <CheckIcon />
            </span>
            <span className="line-clamp-1">{o}</span>
          </div>
        ))}

        <div className="h-px bg-white/[0.04] mt-auto" />

        {/* Instructor row + price */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-linear-to-br from-fuchsia-700 to-violet-700 flex items-center justify-center text-[0.55rem] font-black text-white shrink-0">
            E
          </div>
          <span className="text-[0.7rem] text-slate-500 flex-1 truncate">Équipe Enov</span>
          <span className="text-sm font-black text-white whitespace-nowrap">
            {training.details.price || "À confirmer"}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/academy/${training.slug}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-fuchsia-600 hover:border-fuchsia-500/0 text-white text-xs font-bold py-3 transition-all duration-200 group/cta"
        >
          Voir la formation
          <span className="transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

function ClockIcon({ size = 11 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function CheckIcon() {
  return <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
}
