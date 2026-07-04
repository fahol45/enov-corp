"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "200+",  label: "Apprenants" },
  { value: "★ 4.8", label: "Note moyenne" },
  { value: "8 max", label: "Par session" },
  { value: "100%",  label: "Projets réels" },
];

const AVATARS = ["E", "F", "A", "K", "M"];

const CATEGORIES = [
  { label: "Développement web",    emoji: "🌐" },
  { label: "Data & automatisation",emoji: "📊" },
  { label: "IoT & robotique",      emoji: "🤖" },
  { label: "Design & UX",          emoji: "🎨" },
  { label: "Webinaire",            emoji: "🎙" },
];

export function AcademyHero({ registrationUrl }: { registrationUrl: string | null }) {
  void registrationUrl;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value?.trim();
    if (q) router.push(`/academy?q=${encodeURIComponent(q)}`);
    else document.getElementById("formations")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative pt-12 pb-16 overflow-hidden">

      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
        {/* Glow blobs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/3 w-[700px] h-[500px] bg-fuchsia-700/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-violet-700/8 blur-[90px] rounded-full" />
        <div className="absolute top-1/3 right-1/6 w-[260px] h-[260px] bg-cyan-700/7 blur-[80px] rounded-full" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-3xl mx-auto text-center px-4 space-y-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/[0.07] px-5 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.4em] text-fuchsia-300">
            Enov Academy &nbsp;·&nbsp; Formations Premium
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-[clamp(2.2rem,7vw,4rem)] font-black leading-[1.04] tracking-tight text-white"
        >
          Apprenez.{" "}
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Construisez.
            </span>
          </span>
          {" "}Livrez.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-[1rem] text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          Des formations intensives sur les technologies qui façonnent demain —
          petit groupe, projets réels, certificat à la clé.
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="flex items-center gap-2 max-w-lg mx-auto bg-white/[0.05] border border-white/[0.1] rounded-2xl p-1.5 pl-4 focus-within:border-fuchsia-500/50 transition shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
        >
          <svg className="text-slate-600 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher une formation, une compétence…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none py-1"
          />
          <button
            type="submit"
            className="shrink-0 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-[0_0_24px_rgba(192,38,211,0.4)]"
          >
            Rechercher
          </button>
        </motion.form>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="flex items-center justify-center gap-3"
        >
          {/* Stacked avatars */}
          <div className="flex -space-x-2">
            {AVATARS.map((letter, i) => (
              <div
                key={letter}
                className="w-7 h-7 rounded-full border-2 border-slate-950 flex items-center justify-center text-[0.55rem] font-black text-white"
                style={{ background: `hsl(${260 + i * 20}, 70%, 40%)`, zIndex: AVATARS.length - i }}
              >
                {letter}
              </div>
            ))}
          </div>
          <span className="text-xs text-slate-500">
            <span className="text-white font-semibold">200+</span> apprenants nous font confiance
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42 }}
          className="grid grid-cols-4 gap-1 max-w-lg mx-auto"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center rounded-xl border border-white/[0.05] bg-white/[0.02] py-3">
              <p className="text-sm sm:text-base font-black text-white">{s.value}</p>
              <p className="text-[0.58rem] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Category chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {CATEGORIES.map((c) => (
            <a
              key={c.label}
              href={`/academy?cat=${encodeURIComponent(c.label)}`}
              className="inline-flex items-center gap-1.5 text-[0.65rem] font-medium text-slate-500 hover:text-white bg-white/4 hover:bg-white/8 border border-white/[0.07] hover:border-white/15 px-3 py-1.5 rounded-full transition"
            >
              <span>{c.emoji}</span>
              {c.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
