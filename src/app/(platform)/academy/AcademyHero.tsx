"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "8 max",    label: "par session" },
  { value: "100%",     label: "projets réels" },
  { value: "Certifié", label: "à la clé" },
];

export function AcademyHero({ registrationUrl }: { registrationUrl: string | null }) {
  void registrationUrl;
  return (
    <section className="relative pt-8 pb-12 text-center overflow-hidden">

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-fuchsia-600/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-64 h-64 bg-violet-600/8 blur-[80px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-600/8 blur-[80px] rounded-full" />

      <div className="relative space-y-8 max-w-3xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/8 px-4 py-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.4em] text-fuchsia-300">
            Enov Academy · Formation Premium
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white">
            Maîtrisez les technologies
            <br />
            <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              qui façonnent demain.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          Des formations intensives, en petit groupe, sur des projets réels.
          Tu repars avec des compétences testées et un certificat Enov.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#formations"
            className="inline-flex items-center gap-2 rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.45)] transition-all duration-300"
          >
            Explorer les formations
            <span>↓</span>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300"
          >
            Parler à un conseiller
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-8 sm:gap-16 pt-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
