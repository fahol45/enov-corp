"use client";

import { useState } from "react";
import Link from "next/link";
import type { Training } from "@/lib/trainings";

const STATUS = {
  available: { label: "Disponible", dot: "bg-emerald-400 animate-pulse", text: "text-emerald-400" },
  soon:      { label: "Bientôt",    dot: "bg-amber-400",                  text: "text-amber-400"  },
  closed:    { label: "Fermée",     dot: "bg-slate-600",                  text: "text-slate-500"  },
};

const LEVEL = {
  "Débutant":     "text-emerald-400",
  "Intermédiaire":"text-amber-400",
  "Avancé":       "text-red-400",
  "Tous niveaux": "text-sky-400",
};

export function TrainingCard({ training }: { training: Training }) {
  const [imgError, setImgError] = useState(false);
  const st = STATUS[training.status];

  return (
    <article className="group relative flex flex-col rounded-[20px] border border-white/[0.06] bg-[#0c1018] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-fuchsia-500/30 hover:shadow-[0_32px_80px_rgba(168,85,247,0.14)]">

      {/* Cover */}
      <div className="relative h-52 overflow-hidden shrink-0">
        {training.coverImage && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={training.coverImage}
            alt={training.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-fuchsia-950/60 via-slate-900 to-violet-950/60 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="opacity-15">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0c1018] via-[#0c1018]/30 to-transparent" />

        {/* Category pill */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center text-[0.6rem] font-bold uppercase tracking-[0.15em] text-fuchsia-300 bg-fuchsia-500/15 border border-fuchsia-500/25 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {training.category}
          </span>
        </div>

        {/* Price */}
        <div className="absolute right-4 top-4">
          <span className="text-[0.7rem] font-bold text-white bg-black/60 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {training.details.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 gap-3.5">

        {/* Status + level */}
        <div className="flex items-center gap-2.5">
          <span className={`flex items-center gap-1.5 text-[0.65rem] font-semibold ${st.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            {st.label}
          </span>
          <span className="text-slate-700 text-xs">·</span>
          <span className={`text-[0.65rem] font-semibold ${LEVEL[training.details.level as keyof typeof LEVEL] ?? "text-slate-400"}`}>
            {training.details.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[0.95rem] font-bold text-white leading-snug line-clamp-2 tracking-tight">
          {training.title}
        </h3>

        {/* Summary */}
        <p className="text-[0.75rem] text-slate-500 line-clamp-2 leading-relaxed">
          {training.summary}
        </p>

        {/* Separator */}
        <div className="h-px bg-white/[0.05]" />

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[0.55rem] uppercase tracking-[0.15em] text-slate-600 mb-0.5">Durée</p>
            <p className="text-xs font-semibold text-slate-300">{training.details.duration}</p>
          </div>
          <div>
            <p className="text-[0.55rem] uppercase tracking-[0.15em] text-slate-600 mb-0.5">Prochaine session</p>
            <p className="text-xs font-semibold text-slate-300">{training.details.nextSession}</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/academy/${training.slug}`}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-fuchsia-600 hover:border-fuchsia-500/0 text-white text-xs font-semibold py-3 transition-all duration-200 group/cta"
        >
          Voir la formation
          <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}
