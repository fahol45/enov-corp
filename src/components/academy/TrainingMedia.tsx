"use client";

import { useState } from "react";

type TrainingMediaProps = {
  title: string;
  coverImage?: string;
  youtubeEmbed?: string;
  pdfProgram?: string;
};

const resolveMedia = (value?: string) => {
  if (!value) return undefined;
  return value.startsWith("http") ? value : value;
};

export function TrainingMedia({
  title,
  coverImage,
  youtubeEmbed,
  pdfProgram,
}: TrainingMediaProps) {
  const resolvedCover = resolveMedia(coverImage);
  const resolvedPdf = resolveMedia(pdfProgram);
  const [imageError, setImageError] = useState(false);
  const showCover = Boolean(resolvedCover) && !imageError;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        {showCover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolvedCover}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-64 items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="text-sm text-slate-400">
              Média visuel bientôt disponible
            </div>
          </div>
        )}
      </div>

      {youtubeEmbed ? (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={youtubeEmbed}
              title={`${title} - vidéo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}

      {resolvedPdf ? (
        <a
          href={resolvedPdf}
          className="inline-flex items-center gap-3 rounded-full border border-[#00a3ff]/40 bg-[#00a3ff]/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00a3ff]/70 hover:bg-[#00a3ff]/20"
          target="_blank"
          rel="noreferrer"
        >
          Télécharger le programme PDF
          <span className="text-[#00a3ff]">↗</span>
        </a>
      ) : (
        <div className="text-sm text-slate-400">
          Programme PDF en cours de finalisation.
        </div>
      )}
    </div>
  );
}
