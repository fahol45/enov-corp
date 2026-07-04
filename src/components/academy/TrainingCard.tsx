"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Training } from "@/lib/trainings";

/* ── Deterministic social proof ── */
function slugStats(slug: string) {
  const n = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    students: 24 + (n % 76),
    rating:   `${4}.${3 + (n % 7)}`,
    reviews:  6  + (n % 22),
  };
}

const STATUS_META = {
  available: { label: "Disponible",  dot: "bg-emerald-400 animate-pulse", text: "text-emerald-400",  bg: "bg-emerald-500/10 border-emerald-500/25" },
  soon:      { label: "Bientôt",     dot: "bg-amber-400",                 text: "text-amber-400",    bg: "bg-amber-500/10 border-amber-500/25"    },
  closed:    { label: "Fermée",      dot: "bg-slate-600",                 text: "text-slate-500",    bg: "bg-slate-700/30 border-slate-600/30"    },
};

const LEVEL_COLOR: Record<string, string> = {
  "Débutant":                "text-emerald-400",
  "Intermédiaire":           "text-amber-400",
  "Avancé":                  "text-rose-400",
  "Tous niveaux":            "text-sky-400",
  "Débutant à intermédiaire":"text-lime-400",
};

const CATEGORY_PLACEHOLDER: Record<string, string> = {
  "Développement web":      "from-blue-900/60 via-slate-900 to-violet-900/60",
  "Data & automatisation":  "from-cyan-900/60 via-slate-900 to-teal-900/60",
  "IoT & robotique":        "from-emerald-900/60 via-slate-900 to-cyan-900/60",
  "Design & UX":            "from-pink-900/60 via-slate-900 to-fuchsia-900/60",
  "Développement mobile":   "from-violet-900/60 via-slate-900 to-blue-900/60",
  "Industrie 4.0":          "from-orange-900/60 via-slate-900 to-red-900/60",
  "Hydroponie intelligente":"from-green-900/60 via-slate-900 to-lime-900/60",
  "Webinaire":              "from-purple-900/60 via-slate-900 to-indigo-900/60",
};

export function TrainingCard({ training }: { training: Training }) {
  const [imgError, setImgError]   = useState(false);
  const [tilt,     setTilt]       = useState({ x: 0, y: 0 });
  const [shine,    setShine]      = useState({ x: 50, y: 50, visible: false });
  const cardRef = useRef<HTMLElement>(null);

  const st    = STATUS_META[training.status];
  const stats = slugStats(training.slug);
  const lvlColor   = LEVEL_COLOR[training.details.level] ?? "text-slate-400";
  const placeholder = CATEGORY_PLACEHOLDER[training.category] ?? "from-fuchsia-950/60 via-slate-900 to-violet-950/60";

  /* ── 3D tilt + shine ── */
  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width  - 0.5;
    const relY = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: relY * -9, y: relX * 9 });
    setShine({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
      visible: true,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setShine(prev => ({ ...prev, visible: false }));
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-[#0d0d1a] overflow-hidden"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${shine.visible ? 4 : 0}px)`,
        transition: "transform 0.12s ease, box-shadow 0.3s ease",
        boxShadow: shine.visible ? "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)" : "0 4px 24px rgba(0,0,0,0.3)",
        willChange: "transform",
      }}
    >
      {/* Shine overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.06) 0%, transparent 55%)`,
          opacity: shine.visible ? 1 : 0,
        }}
      />

      {/* ── Cover ── */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {training.coverImage && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={training.coverImage}
            alt={training.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          />
        ) : (
          <div className={`h-full w-full bg-linear-to-br ${placeholder} flex items-center justify-center`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="opacity-[0.08]">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        {/* Gradient from bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0d0d1a] via-[#0d0d1a]/15 to-transparent" />

        {/* Duration */}
        {training.details.duration && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-semibold text-white/70 bg-black/60 border border-white/[0.08] px-2 py-0.5 rounded-full backdrop-blur-sm">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {training.details.duration}
            </span>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`inline-flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border backdrop-blur-sm ${st.bg} ${st.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            {st.label}
          </span>
        </div>

        {/* Bestseller ribbon */}
        {training.status === "available" && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[0.53rem] font-black uppercase tracking-[0.12em] bg-amber-400 text-black px-2 py-0.5 rounded-sm">
              Bestseller
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col p-5 gap-3">

        {/* Category · Level */}
        <div className="flex items-center gap-2 text-[0.6rem] font-semibold">
          <span className="text-slate-500 uppercase tracking-[0.12em]">{training.category}</span>
          <span className="text-slate-800">·</span>
          <span className={lvlColor}>{training.details.level}</span>
        </div>

        {/* Title */}
        <h3 className="text-[0.9rem] font-bold text-white leading-snug line-clamp-2 tracking-tight">
          {training.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold" style={{ color: "var(--rating)" }}>{stats.rating}</span>
          <Stars rating={stats.rating} />
          <span className="text-[0.62rem] text-slate-700">({stats.reviews})</span>
          <span className="ml-auto text-[0.62rem] text-slate-600">{stats.students} apprenants</span>
        </div>

        {/* Outcomes */}
        {training.outcomes.slice(0, 2).map((o) => (
          <div key={o} className="flex items-start gap-2 text-[0.7rem] text-slate-600 leading-snug">
            <span className="mt-0.5 w-3.5 h-3.5 rounded-sm bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
              <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span className="line-clamp-1">{o}</span>
          </div>
        ))}

        <div className="h-px bg-white/[0.04] mt-auto" />

        {/* Instructor + price */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-linear-to-br from-fuchsia-700/70 to-violet-700/70 flex items-center justify-center text-[0.52rem] font-black text-white shrink-0">E</div>
          <span className="text-[0.68rem] text-slate-600 flex-1 truncate">Équipe Enov</span>
          <span className="text-sm font-black text-white whitespace-nowrap">{training.details.price || "À confirmer"}</span>
        </div>

        {/* CTA */}
        <Link
          href={`/academy/${training.slug}`}
          className="group/cta flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-[var(--accent)] hover:border-transparent text-white text-xs font-bold py-3 transition-all duration-200"
        >
          Voir la formation
          <span className="transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

/* ── Stars ── */
function Stars({ rating }: { rating: string }) {
  const val = parseFloat(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} width="9" height="9" viewBox="0 0 24 24"
          fill={i <= Math.floor(val) ? "var(--rating)" : "none"}
          stroke="var(--rating)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}
