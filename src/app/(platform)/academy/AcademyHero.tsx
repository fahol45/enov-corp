"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";

/* ── Terminal lines for the right-side session card ── */
const TERMINAL = [
  { type: "cmd",     text: "npm run dev" },
  { type: "ok",      text: "✓ Ready in 847ms" },
  { type: "info",    text: "○ Compiling /auth/login…" },
  { type: "ok",      text: "✓ Compiled in 234ms" },
  { type: "info",    text: "○ Building /api/sessions…" },
  { type: "ok",      text: "✓ 9 routes compiled" },
];

const STATS = [
  { value: "200+",  sub: "Apprenants" },
  { value: "★ 4.8", sub: "Note moy." },
  { value: "8 max", sub: "/ session" },
  { value: "100%",  sub: "Projets réels" },
];

const CATEGORIES = [
  { emoji: "🌐", label: "Web" },
  { emoji: "📊", label: "Data" },
  { emoji: "🤖", label: "IoT & Robotique" },
  { emoji: "🎨", label: "Design & UX" },
  { emoji: "🎙", label: "Webinaires" },
];

export function AcademyHero({ registrationUrl }: { registrationUrl: string | null }) {
  void registrationUrl;
  const router   = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value?.trim();
    if (q) router.push(`/academy?q=${encodeURIComponent(q)}`);
    else document.getElementById("formations")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      <div className="relative grid xl:grid-cols-[1fr_440px] gap-12 xl:gap-16 items-center">

        {/* ── LEFT ── */}
        <div className="space-y-7">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/[0.07] px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.36em] text-fuchsia-300">
              Enov Academy &nbsp;·&nbsp; Formations Premium
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="text-[clamp(2.4rem,6vw,4.25rem)] font-black leading-[1.03] tracking-[-0.03em] text-white text-balance"
          >
            Apprenez.{" "}
            <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Construisez.
            </span>
            <br className="hidden sm:block" />
            {" "}Livrez.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-[1.05rem] text-slate-400 max-w-lg leading-relaxed"
          >
            Des formations intensives sur les technologies qui façonnent demain —
            petit groupe, projets réels, expertise certifiée.
          </motion.p>

          {/* Search */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex items-center gap-2 max-w-md bg-white/[0.04] border border-white/[0.09] rounded-2xl p-1.5 pl-4 focus-within:border-fuchsia-500/50 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          >
            <svg className="text-slate-600 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Rechercher une compétence, une technologie…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none py-1 min-w-0"
            />
            <button type="submit"
              className="shrink-0 bg-[var(--accent)] hover:bg-fuchsia-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_32px_var(--accent-glow)]"
            >
              Chercher
            </button>
          </motion.form>

          {/* CTAs + social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#formations"
              className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.18] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all"
            >
              Explorer les formations ↓
            </a>
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {["E","F","A","K","M"].map((l, i) => (
                  <div key={l} className="w-7 h-7 rounded-full border-2 border-[#080810] flex items-center justify-center text-[0.52rem] font-black text-white"
                    style={{ background: `hsl(${258 + i * 22}, 68%, 42%)`, zIndex: 5 - i }}>
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-500">
                <span className="text-white font-semibold">200+</span> apprenants
              </span>
            </div>
          </motion.div>

          {/* Stat grid */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-4 gap-2 max-w-md"
          >
            {STATS.map((s) => (
              <div key={s.sub} className="text-center rounded-xl border border-white/[0.06] bg-white/[0.025] py-3 px-1">
                <p className="text-sm font-black text-white leading-none">{s.value}</p>
                <p className="text-[0.55rem] uppercase tracking-widest text-slate-600 mt-1">{s.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.48 }}
            className="flex flex-wrap gap-1.5"
          >
            {CATEGORIES.map((c) => (
              <a key={c.label}
                href={`/academy?cat=${encodeURIComponent(c.label)}`}
                className="inline-flex items-center gap-1.5 text-[0.64rem] text-slate-500 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.14] px-3 py-1.5 rounded-full transition-all duration-200"
              >
                <span>{c.emoji}</span>{c.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: live session card ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="hidden xl:block"
          style={{ animation: "hero-float 6s ease-in-out infinite" }}
        >
          <div className="relative rounded-2xl border border-white/[0.1] bg-[#0e0e1c] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7)] max-w-[400px] ml-auto"
               style={{ transform: "rotate(2.5deg)" }}>

            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-[#0c0c18]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[0.65rem] font-bold text-white/80">Web Fullstack Premium — Live</span>
              </div>
            </div>

            {/* Module header */}
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <p className="text-[0.6rem] text-slate-600 uppercase tracking-widest mb-0.5">Module 4</p>
              <p className="text-sm font-bold text-white">API REST & Authentification JWT</p>
              <p className="text-[0.68rem] text-slate-500 mt-0.5">47 min restantes · 7/8 participants</p>
            </div>

            {/* Terminal */}
            <div className="bg-[#09090f] m-3 rounded-xl p-4 font-mono text-[0.72rem] space-y-1.5 border border-white/[0.05]">
              {TERMINAL.map((line, i) => (
                <div
                  key={i}
                  style={{
                    animation: `terminal-line 0.3s ease forwards`,
                    animationDelay: `${0.6 + i * 0.4}s`,
                    opacity: 0,
                  }}
                  className={
                    line.type === "cmd"  ? "text-slate-300" :
                    line.type === "ok"   ? "text-emerald-400" :
                    "text-slate-600"
                  }
                >
                  {line.type === "cmd" && <span className="text-fuchsia-400 mr-2">$</span>}
                  {line.text}
                </div>
              ))}
              {/* Blinking cursor */}
              <div className="flex items-center gap-1 mt-1">
                <span className="text-fuchsia-400">$</span>
                <span className="w-2 h-[14px] bg-fuchsia-400/80 rounded-sm"
                  style={{ animation: "cursor-blink 1s step-end infinite", animationDelay: "3.5s", opacity: 0 }} />
              </div>
            </div>

            {/* Participants bar */}
            <div className="px-4 pb-3 space-y-2">
              <div className="flex items-center justify-between text-[0.62rem] text-slate-500">
                <span>Participants</span>
                <span className="text-slate-400 font-semibold">7 / 8</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-linear-to-r from-fuchsia-600 to-violet-500 transition-all"
                     style={{ width: "87.5%" }} />
              </div>
            </div>

            {/* CTA button inside card */}
            <div className="px-3 pb-4">
              <div className="flex items-center justify-center gap-2 bg-[var(--accent)] text-white text-xs font-bold py-2.5 rounded-xl shadow-[0_0_24px_var(--accent-glow)] cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                Rejoindre la session →
              </div>
            </div>

            {/* Reflection overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-white/[0.025] to-transparent pointer-events-none rounded-2xl" />
          </div>

          {/* Floating badge under card */}
          <div className="flex justify-center mt-4" style={{ transform: "rotate(2.5deg)" }}>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.62rem] font-semibold text-emerald-400">Session en cours · Rejoins maintenant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
