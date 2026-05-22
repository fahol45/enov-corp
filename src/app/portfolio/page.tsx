"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type PortfolioCopy = {
  hero: { kicker: string; title: string; highlight: string; sub: string };
  hydroTitle: string;
  hydroProjects: Array<{ title: string; tags: string; img: string }>;
  webTitle: string;
  webProjects: Array<{ title: string; tags: string; img: string; href?: string }>;
  trainingTitle: string;
  trainingProjects: Array<{ title: string; tags: string; img: string }>;
  cta: { title: string; button: string };
};

const copy: Record<SupportedLanguage, PortfolioCopy> = {
  fr: {
    hero: {
      kicker: "Portfolio",
      title: "Projets livrés.",
      highlight: "Résultats mesurables.",
      sub: "Serres connectées, applications sur mesure, formations terrain. Voici ce qu'on a concrètement réalisé.",
    },
    hydroTitle: "Hydroponie & IoT",
    hydroProjects: [
      { title: "Serre hydroponique intelligente", tags: "Capteurs pH & EC · Arrosage automatique · Dashboard mobile", img: "/Academy_images/Hydroponie%20intelligente%20%26%20data.jpg" },
      { title: "Digital Twin industriel", tags: "Jumelage numérique · Monitoring temps réel · Alertes SMS", img: "/Academy_images/Digital%20Twin%20Industrie.webp" },
      { title: "Lab IoT & Robotique", tags: "Automatisation · Capteurs embarqués · Interface de contrôle", img: "/Academy_images/IoT%20%26%20Robotics%20Lab.webp" },
    ],
    webTitle: "Applications & Sites web",
    webProjects: [
      { title: "Interface de gestion web", tags: "Next.js · Dashboard · Exports automatiques", img: "/pc-portable.png" },
      { title: "Application mobile terrain", tags: "React Native · Android & iOS · Mode hors ligne", img: "/mobile.png" },
      { title: "Automatisation & Data", tags: "Pipelines de données · Reporting · Intégration API", img: "/Academy_images/Data_Automation_Power.jpg" },
    ],
    trainingTitle: "Formations Enov Academy",
    trainingProjects: [
      { title: "Web Fullstack", tags: "React · Node.js · Déploiement · Projet à rendre", img: "/Academy_images/Web%20Fullstack.jpg" },
      { title: "AI Product Roadmap", tags: "LLM · Prompting · Intégration IA dans produit", img: "/Academy_images/Webinaire%20AI%20Product%20Roadmap.webp" },
      { title: "UX/UI & Design Ops", tags: "Figma · Parcours utilisateur · Systèmes de design", img: "/Academy_images/UXUI%20Mapping%20%26%20Design%20Ops.webp" },
    ],
    cta: {
      title: "Un projet similaire en tête. On vous répond en 24h.",
      button: "Nous contacter",
    },
  },
  en: {
    hero: {
      kicker: "Portfolio",
      title: "Projects delivered.",
      highlight: "Measurable results.",
      sub: "Connected greenhouses, custom applications, hands-on training. Here's what we've actually built.",
    },
    hydroTitle: "Hydroponics & IoT",
    hydroProjects: [
      { title: "Smart hydroponic greenhouse", tags: "pH & EC sensors · Auto watering · Mobile dashboard", img: "/Academy_images/Hydroponie%20intelligente%20%26%20data.jpg" },
      { title: "Industrial digital twin", tags: "Digital twinning · Real-time monitoring · SMS alerts", img: "/Academy_images/Digital%20Twin%20Industrie.webp" },
      { title: "IoT & Robotics Lab", tags: "Automation · Embedded sensors · Control interface", img: "/Academy_images/IoT%20%26%20Robotics%20Lab.webp" },
    ],
    webTitle: "Apps & Websites",
    webProjects: [
      { title: "Web management interface", tags: "Next.js · Dashboard · Automatic exports", img: "/pc-portable.png" },
      { title: "Field mobile app", tags: "React Native · Android & iOS · Offline mode", img: "/mobile.png" },
      { title: "Automation & Data", tags: "Data pipelines · Reporting · API integration", img: "/Academy_images/Data_Automation_Power.jpg" },
    ],
    trainingTitle: "Enov Academy Training",
    trainingProjects: [
      { title: "Web Fullstack", tags: "React · Node.js · Deployment · Project to complete", img: "/Academy_images/Web%20Fullstack.jpg" },
      { title: "AI Product Roadmap", tags: "LLM · Prompting · AI integration in products", img: "/Academy_images/Webinaire%20AI%20Product%20Roadmap.webp" },
      { title: "UX/UI & Design Ops", tags: "Figma · User journeys · Design systems", img: "/Academy_images/UXUI%20Mapping%20%26%20Design%20Ops.webp" },
    ],
    cta: {
      title: "A similar project in mind. We reply within 24h.",
      button: "Contact us",
    },
  },
};

function ProjectCard({ title, tags, img, index }: { title: string; tags: string; img: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-slate-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-slate-900/70"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-base font-bold text-white">{title}</p>
        <p className="mt-1.5 text-xs tracking-wide text-slate-500">{tags}</p>
      </div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-6 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-(--shell-padding) inset-y-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-sky-500/8 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/8 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/25 bg-sky-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-sky-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
              {t.hero.kicker}
            </div>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {t.hero.title}
              <br />
              <span className="bg-linear-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
                {t.hero.highlight}
              </span>
            </h1>

            <p className="max-w-md text-lg text-slate-400">{t.hero.sub}</p>
          </motion.div>
        </section>

        {/* ── HYDROPONIE & IoT ─────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-2xl font-black sm:text-3xl">{t.hydroTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.hydroProjects.map((p, i) => (
                <ProjectCard key={p.title} {...p} index={i} />
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── WEB & MOBILE ─────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-2xl font-black sm:text-3xl">{t.webTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.webProjects.map((p, i) => (
                <ProjectCard key={p.title} {...p} index={i} />
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── FORMATIONS ───────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-8">
            <h2 className="text-2xl font-black sm:text-3xl">{t.trainingTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.trainingProjects.map((p, i) => (
                <ProjectCard key={p.title} {...p} index={i} />
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div className="absolute inset-0 bg-linear-to-br from-sky-500/12 via-fuchsia-500/8 to-emerald-500/12" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
            </div>
            <div className="relative space-y-6">
              <h2 className="text-3xl font-black text-balance sm:text-4xl">{t.cta.title}</h2>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-2xl transition hover:scale-105"
              >
                {t.cta.button}
              </Link>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
