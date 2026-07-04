"use client";

import { useRef, useEffect, useState } from "react";

const PILLARS = [
  {
    key:   "8",
    unit:  "max",
    title: "Petit groupe garanti",
    desc:  "Jamais plus de 8 apprenants par session. Tu ne seras jamais noyé dans une classe. Le formateur te connaît par ton prénom.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: "from-fuchsia-600/20 to-violet-600/10",
    border: "border-fuchsia-500/15 hover:border-fuchsia-500/35",
    accent: "text-fuchsia-400",
    glow: "rgba(192,38,211,0.12)",
  },
  {
    key:   "100%",
    unit:  "réel",
    title: "Projets du terrain",
    desc:  "Chaque exercice est tiré d'un projet réel. Tu construis des choses qui fonctionnent — pas des tutoriels déconnectés du marché.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: "from-cyan-600/20 to-sky-600/10",
    border: "border-cyan-500/15 hover:border-cyan-500/35",
    accent: "text-cyan-400",
    glow: "rgba(34,211,238,0.10)",
  },
  {
    key:   "Expert",
    unit:  "terrain",
    title: "Formateurs actifs",
    desc:  "Nos formateurs travaillent en production. Ils t'enseignent ce qu'ils font aujourd'hui — pas ce qu'ils ont fait il y a dix ans.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <path d="m14.5 14.5 2 2 4-4"/>
      </svg>
    ),
    color: "from-violet-600/20 to-purple-600/10",
    border: "border-violet-500/15 hover:border-violet-500/35",
    accent: "text-violet-400",
    glow: "rgba(139,92,246,0.10)",
  },
  {
    key:   "Certifié",
    unit:  "Enov",
    title: "Certificat à la clé",
    desc:  "Tu repars avec un certificat Enov Academy qui atteste tes compétences. Une preuve concrète pour ton portfolio et tes recruteurs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    color: "from-amber-600/20 to-orange-600/10",
    border: "border-amber-500/15 hover:border-amber-500/35",
    accent: "text-amber-400",
    glow: "rgba(245,158,11,0.10)",
  },
];

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export function WhyEnov() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as React.RefObject<Element>);

  return (
    <section ref={sectionRef} className="py-14 border-y border-white/[0.04]">
      {/* Section header */}
      <div
        className="text-center mb-10 transition-all duration-700"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)" }}
      >
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-slate-600 mb-3">Notre différence</p>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-balance">
          Pourquoi les apprenants choisissent Enov
        </h2>
      </div>

      {/* Pillars grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {PILLARS.map((p, i) => (
          <div
            key={p.key}
            className={`group relative rounded-2xl border bg-linear-to-b ${p.color} ${p.border} p-6 flex flex-col gap-4 transition-all duration-500 cursor-default`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(24px)",
              transitionDelay: `${i * 0.08}s`,
              boxShadow: `0 0 0 rgba(0,0,0,0)`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${p.glow}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
            }}
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center ${p.accent} transition-colors duration-300`}>
              {p.icon}
            </div>

            {/* Number/word */}
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-4xl font-black tracking-tight ${p.accent}`}>{p.key}</span>
                <span className="text-sm font-semibold text-slate-500">{p.unit}</span>
              </div>
              <p className="text-sm font-bold text-white mt-1">{p.title}</p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed flex-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
