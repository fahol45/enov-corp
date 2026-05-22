"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Props = { registrationUrl: string | null };

const heroCopy = {
  fr: {
    kicker: "Enov Academy",
    title: "Un projet concret.",
    highlight: "Un certificat Enov.",
    sub: "Vous travaillez sur un cas réel pendant la formation. Pas de slides en boucle. Vous repartez avec des compétences testées et un certificat.",
    badges: ["Projet à rendre", "Certificat Enov", "Groupe réduit"],
    cta: "S'inscrire maintenant",
    ctaExternal: "Formulaire d'inscription",
  },
  en: {
    kicker: "Enov Academy",
    title: "A real project.",
    highlight: "An Enov certificate.",
    sub: "You work on a real case throughout the training. No looping slides. You leave with tested skills and a certificate.",
    badges: ["Project to complete", "Enov Certificate", "Small group"],
    cta: "Register now",
    ctaExternal: "Registration form",
  },
};

export function AcademyHero({ registrationUrl }: Props) {
  const { language } = useLanguage();
  const t = heroCopy[language];

  return (
    <section className="relative pt-4 pb-6 lg:pt-10">
      <div className="pointer-events-none absolute -inset-x-(--shell-padding) inset-y-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#ec008c]/8 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#00a3ff]/8 blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
        className="max-w-3xl space-y-8"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#ec008c]/25 bg-[#ec008c]/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-pink-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ec008c]" />
          {t.kicker}
        </div>

        <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          {t.title}
          <br />
          <span className="bg-linear-to-r from-[#ec008c] via-fuchsia-400 to-[#00a3ff] bg-clip-text text-transparent">
            {t.highlight}
          </span>
        </h1>

        <p className="max-w-md text-lg text-slate-400">{t.sub}</p>

        <div className="flex flex-wrap gap-2">
          {t.badges.map((badge) => (
            <span key={badge} className="rounded-full border border-[#ec008c]/25 bg-[#ec008c]/8 px-3 py-1 text-xs text-pink-300">
              {badge}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#inscription"
            className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-[#ec008c] to-[#00a3ff] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#ec008c]/20 transition hover:scale-105 sm:w-auto"
          >
            {t.cta}
          </a>
          {registrationUrl ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/4 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/8 sm:w-auto"
            >
              {t.ctaExternal}
            </a>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
