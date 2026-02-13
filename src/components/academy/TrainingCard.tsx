"use client";

import { useState } from "react";
import Link from "next/link";
import { academyRegistrationUrl, type Training } from "@/lib/trainings";
import { TrainingStatusBadge } from "./TrainingStatusBadge";

type TrainingCardProps = {
  training: Training;
};

const resolveMedia = (value?: string) => (value ? value : undefined);

export function TrainingCard({ training }: TrainingCardProps) {
  const coverImage = resolveMedia(training.coverImage);
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(coverImage) && !imageError;
  const registrationUrl =
    training.registrationUrl || academyRegistrationUrl || "";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left backdrop-blur transition hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
      <div className="relative h-44 w-full overflow-hidden">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={training.title}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            <div className="h-16 w-16 rounded-full bg-[#00a3ff]/20 blur-2xl" />
            <div className="absolute right-6 top-6 h-10 w-10 rounded-full bg-[#ec008c]/25 blur-xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute left-4 top-4">
          <TrainingStatusBadge status={training.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {training.category}
          </p>
          <h3 className="text-xl font-semibold text-white">{training.title}</h3>
          <p className="text-sm text-slate-300">{training.summary}</p>
        </div>

        <div className="mt-auto grid gap-2 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span>Durée</span>
            <span className="text-slate-200">{training.details.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Format</span>
            <span className="text-slate-200">{training.details.format}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Prochaine session</span>
            <span className="text-slate-200">
              {training.details.nextSession}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
          <span className="inline-flex items-center gap-2 text-white transition">
            <span>Découvrir la formation</span>
            <span className="text-[#00a3ff] transition group-hover:translate-x-1">
              →
            </span>
          </span>
          {registrationUrl ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="relative z-20 inline-flex items-center gap-2 rounded-full border border-[#ec008c]/50 bg-[#ec008c]/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#ec008c]/70 hover:bg-[#ec008c]/25"
            >
              S'inscrire
              <span className="text-[#ec008c]">→</span>
            </a>
          ) : null}
        </div>
      </div>

      <Link
        href={`/academy/${training.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Voir la formation ${training.title}`}
      />
    </article>
  );
}
