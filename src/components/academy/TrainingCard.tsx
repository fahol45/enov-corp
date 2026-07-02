"use client";

import { useState } from "react";
import Link from "next/link";
import type { Training } from "@/lib/trainings";
import { TrainingStatusBadge } from "./TrainingStatusBadge";

export function TrainingCard({ training }: { training: Training }) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(training.coverImage) && !imageError;

  const levelColor: Record<string, string> = {
    Débutant: "text-emerald-400",
    Intermédiaire: "text-amber-400",
    Avancé: "text-red-400",
    "Tous niveaux": "text-sky-400",
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:border-fuchsia-500/40 hover:shadow-[0_20px_60px_rgba(168,85,247,0.15)] hover:-translate-y-1">

      {/* Cover */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-800 shrink-0">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={training.coverImage}
            alt={training.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            <span className="text-4xl opacity-30">📚</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
        <div className="absolute left-3 top-3">
          <TrainingStatusBadge status={training.status} />
        </div>
        <div className="absolute right-3 top-3">
          <span className="text-xs font-bold text-white bg-black/50 backdrop-blur px-2 py-1 rounded-lg">
            {training.details.price}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        {/* Category */}
        <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-fuchsia-400">
          {training.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
          {training.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {training.summary}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-auto pt-3 border-t border-white/5">
          <span className="flex items-center gap-1">
            <span>⏱</span>
            <span>{training.details.duration}</span>
          </span>
          <span className="flex items-center gap-1">
            <span>🎯</span>
            <span className={levelColor[training.details.level] ?? "text-slate-400"}>
              {training.details.level}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span>📅</span>
            <span className="text-slate-300">{training.details.nextSession}</span>
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/academy/${training.slug}`}
          className="mt-1 block w-full text-center bg-white/5 hover:bg-fuchsia-600 border border-white/10 hover:border-fuchsia-500 text-white text-xs font-semibold rounded-xl py-2.5 transition"
        >
          Voir la formation →
        </Link>
      </div>
    </article>
  );
}
