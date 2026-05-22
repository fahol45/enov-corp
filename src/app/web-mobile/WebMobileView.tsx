"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/FadeUp";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Highlight = { title: string; description: string };
type Catalog = { title: string; items: string[] };
type WebSite = { title: string; description: string };
type ProcessStep = { title: string; description: string };
type Tech = { label: string; details: string };
type HeroStat = { label: string; value: string };
type DeliveryPhase = { title: string; detail: string };

type WebMobileCopy = {
  hero: {
    badge: string;
    title: string;
    description: string;
    tags: string[];
    primaryCta: string;
    secondaryCta: string;
    offer: {
      kicker: string;
      title: string;
      description: string;
      metrics: string[];
    };
    highlights: Highlight[];
    delivery: {
      title: string;
      phases: DeliveryPhase[];
    };
    heroStats: HeroStat[];
    experience: {
      kicker: string;
      product: string;
      sliderLabel: string;
      kpiLabel: string;
      slaLabel: string;
      portalLabel: string;
      portalTitle: string;
      mobileLabel: string;
    };
  };
  catalog: {
    kicker: string;
    title: string;
    description: string;
    apps: Catalog[];
  };
  webSites: {
    kicker: string;
    title: string;
    sites: WebSite[];
  };
  process: {
    kicker: string;
    title: string;
    steps: ProcessStep[];
  };
  tech: {
    kicker: string;
    title: string;
    stack: Tech[];
  };
  closing: {
    kicker: string;
    title: string;
    description: string;
    cta: string;
    deliverables: string[];
    deliverableLabel: string;
  };
};

const webMobileCopy: Record<SupportedLanguage, WebMobileCopy> = {
  fr: {
    hero: {
      badge: "Développement web & mobile",
      title: "Des apps web & mobile claires, utiles et rentables",
      description:
        "Nous créons des apps et sites qui améliorent vos ventes, vos opérations et votre relation client.",
      tags: ["Finance", "Commerce", "Opérations", "Santé", "Relation client", "Etc."],
      primaryCta: "Discuter de mon app",
      secondaryCta: "Voir le catalogue",
      offer: {
        kicker: "Offre web & mobile",
        title: "ENOV conçoit et livre vos produits digitaux",
        description:
          "UX/UI, développement et suivi continu, avec un seul interlocuteur.",
        metrics: [],
      },
      highlights: [
        {
          title: "Design clair",
          description: "Une expérience cohérente sur tous les écrans.",
        },
        {
          title: "Offline first",
          description: "Vos équipes travaillent même hors connexion.",
        },
        {
          title: "Sécurité intégrée",
          description: "Accès maîtrisés et données protégées.",
        },
      ],
      delivery: {
        title: "Parcours simple",
        phases: [
          { title: "Cadrage express", detail: "Besoins clairs, KPIs définis et plan validé." },
          { title: "Design & build", detail: "Design validé, développement rapide, tests inclus." },
          { title: "Run & évolution", detail: "Suivi, support et améliorations continues." },
        ],
      },
      heroStats: [
        { label: "Apps en production", value: "45+" },
        { label: "Délai moyen", value: "3 mois" },
        { label: "Satisfaction clients", value: "4.9/5" },
      ],
      experience: {
        kicker: "Expérience web sur mesure",
        product: "ENOV Portal",
        sliderLabel: "Cockpit produit",
        kpiLabel: "",
        slaLabel: "Support en continu",
        portalLabel: "Offre web & mobile",
        portalTitle: "ENOV Portal",
        mobileLabel: "App mobile en production",
      },
    },
    catalog: {
      kicker: "Applications mobiles",
      title: "Les apps les plus demandées",
      description:
        "Des applications utiles pour chaque métier, prêtes à l'usage.",
      apps: [
        {
          title: "Finance & paiement",
          items: [
            "App finance pour opérateurs",
            "Portefeuille digital et dépenses",
            "Suivi d'investissements",
          ],
        },
        {
          title: "Commerce & marketplace",
          items: [
            "Marketplace B2B",
            "App e-commerce click & collect",
            "Catalogue vendeur",
          ],
        },
        {
          title: "Exploitation & maintenance",
          items: ["GMAO terrain offline", "Suivi de production", "Checklist qualité"],
        },
        {
          title: "Expérience client",
          items: [
            "Portail client",
            "App visiteur showroom",
            "App fidélité",
          ],
        },
      ],
    },
    webSites: {
      kicker: "Sites web & portails",
      title: "Des sites clairs pour informer, vendre, servir",
      sites: [
        {
          title: "Sites corporate",
          description: "Image de marque, offres, preuves et CMS simple.",
        },
        {
          title: "Portails data & analytics",
          description:
            "Dashboards temps réel, exports et partage des données.",
        },
        {
          title: "Extranets clients",
          description: "Espace client avec contrats, factures et support.",
        },
        {
          title: "Landing produit / growth",
          description: "Pages campagne et formulaires connectés.",
        },
      ],
    },
    process: {
      kicker: "Notre méthode",
      title: "Un parcours simple",
      steps: [
        {
          title: "Discovery",
          description: "Comprendre vos besoins et vos priorités.",
        },
        {
          title: "Product design",
          description: "Maquettes claires et design validé.",
        },
        {
          title: "Engineering",
          description: "Développement rapide et fiable.",
        },
        {
          title: "Run & optimisation",
          description: "Suivi, amélioration continue et support.",
        },
      ],
    },
    tech: {
      kicker: "Stack technique",
      title: "Technologies fiables",
      stack: [
        { label: "Mobile", details: "iOS, Android, React Native" },
        { label: "Web", details: "Next.js, React, interfaces rapides" },
        { label: "Backend", details: "APIs, bases de données, sécurité" },
        { label: "Qualité", details: "Tests, monitoring, fiabilité" },
      ],
    },
    closing: {
      kicker: "Prêt pour votre prochain produit",
      title: "Co-créons votre application ou site web",
      description:
        "Dites-nous votre besoin, nous livrons l'app et le site.",
      cta: "Réserver un atelier digital",
      deliverables: [
        "Brief clair et plan d'action",
        "Design validé multi-écrans",
        "App mobile et site web",
        "Support et évolution",
      ],
      deliverableLabel: "Livrables",
    },
  },
  en: {
    hero: {
      badge: "Web & mobile development",
      title: "Web & mobile apps that are clear and profitable",
      description:
        "We build apps and websites that improve sales, operations, and customer care.",
      tags: ["Finance", "Commerce", "Ops", "Health", "Customer service"],
      primaryCta: "Discuss my app",
      secondaryCta: "See the catalog",
      offer: {
        kicker: "Web & mobile offer",
        title: "ENOV designs and delivers your digital products",
        description:
          "UX/UI, development, and ongoing support with one team.",
        metrics: [],
      },
      highlights: [
        {
          title: "Clear design",
          description: "One consistent experience on every screen.",
        },
        {
          title: "Offline first",
          description: "Teams work even when offline.",
        },
        {
          title: "Built-in security",
          description: "Controlled access and protected data.",
        },
      ],
      delivery: {
        title: "Simple journey",
        phases: [
          { title: "Express discovery", detail: "Clear needs, defined KPIs, approved plan." },
          { title: "Design & build", detail: "Validated design, fast build, testing included." },
          { title: "Run & growth", detail: "Monitoring, support, continuous improvements." },
        ],
      },
      heroStats: [
        { label: "Apps in production", value: "45+" },
        { label: "Average timeline", value: "3 months" },
        { label: "Client rating", value: "4.9/5" },
      ],
      experience: {
        kicker: "Tailored web experience",
        product: "ENOV Portal",
        sliderLabel: "Product cockpit",
        kpiLabel: "Live monitoring",
        slaLabel: "Always-on support",
        portalLabel: "Custom web experience",
        portalTitle: "ENOV Portal",
        mobileLabel: "Mobile app in production",
      },
    },
    catalog: {
      kicker: "Mobile applications",
      title: "Most requested apps",
      description:
        "Useful apps for every team, ready for real use.",
      apps: [
        {
          title: "Finance & payment",
          items: [
            "Finance app for operators",
            "Digital wallet and spending",
            "Investment tracking",
          ],
        },
        {
          title: "Commerce & marketplaces",
          items: [
            "B2B marketplace",
            "Click & collect app",
            "Seller catalog",
          ],
        },
        {
          title: "Operations & maintenance",
          items: ["Offline CMMS", "Production tracking", "Quality checklist"],
        },
        {
          title: "Customer experience",
          items: [
            "Customer portal",
            "Showroom visitor app",
            "Loyalty app",
          ],
        },
      ],
    },
    webSites: {
      kicker: "Websites & portals",
      title: "Clear sites to inform, sell, and serve",
      sites: [
        {
          title: "Corporate sites",
          description: "Brand, offers, proof, and easy updates.",
        },
        {
          title: "Data & analytics portals",
          description:
            "Real-time dashboards, exports, and data sharing.",
        },
        {
          title: "Customer extranets",
          description: "Customer space with contracts, invoices, and support.",
        },
        {
          title: "Product landing / growth",
          description: "Campaign pages and connected forms.",
        },
      ],
    },
    process: {
      kicker: "Our method",
      title: "A simple journey",
      steps: [
        {
          title: "Discovery",
          description: "Understand your needs and priorities.",
        },
        {
          title: "Product design",
          description: "Clear mockups and validated design.",
        },
        {
          title: "Engineering",
          description: "Fast, reliable development.",
        },
        {
          title: "Run & optimization",
          description: "Monitoring, improvements, and support.",
        },
      ],
    },
    tech: {
      kicker: "Tech stack",
      title: "Reliable technologies",
      stack: [
        { label: "Mobile", details: "iOS, Android, React Native" },
        { label: "Web", details: "Next.js, React, fast interfaces" },
        { label: "Backend", details: "APIs, databases, security" },
        { label: "Quality", details: "Testing, monitoring, reliability" },
      ],
    },
    closing: {
      kicker: "Ready for your next product",
      title: "Co-create your app or website",
      description:
        "Tell us your need, we deliver the app and the website.",
      cta: "Book a digital workshop",
      deliverables: [
        "Clear brief and action plan",
        "Validated multi-screen design",
        "Mobile app and website",
        "Support and evolution",
      ],
      deliverableLabel: "Deliverables",
    },
  },
};

export function WebMobileView() {
  const { language } = useLanguage();
  const t = webMobileCopy[language];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="app-shell section-flow">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative pt-4 pb-6 lg:pt-10">
          <div className="pointer-events-none absolute -inset-x-[var(--shell-padding)] inset-y-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/8 blur-[80px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Top: badge + title + tags + CTAs */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/8 px-4 py-2 text-[0.65rem] uppercase tracking-[0.55em] text-fuchsia-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
                {t.hero.badge}
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4rem]">
                {t.hero.title}
              </h1>

              <p className="max-w-xl text-lg text-slate-300 text-pretty">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {t.hero.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.4em] text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-[#a855f7] via-[#d946ef] to-[#0ea5e9] px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-purple-600/25 transition hover:scale-[1.02] hover:shadow-purple-600/40 sm:w-auto"
                >
                  {t.hero.primaryCta}
                </Link>
                <a
                  href="#catalogue"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/30 hover:bg-white/10 sm:w-auto"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Hero dashboard card */}
            <div className="rounded-[2.5rem] border border-white/10 bg-linear-to-br from-[#070812]/90 via-[#0b0f1f]/80 to-[#05060c]/70 p-5 shadow-[0_25px_65px_rgba(3,4,15,0.75)] sm:p-8">
              <div className="space-y-6">
                {/* Offer block */}
                <div className="rounded-[2rem] border border-white/10 bg-linear-to-r from-[#a855f7]/20 to-[#0ea5e9]/20 p-5 text-white">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.5em] text-white/60">
                        {t.hero.offer.kicker}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold">{t.hero.offer.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{t.hero.offer.description}</p>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {t.hero.highlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4"
                    >
                      <p className="text-[0.65rem] uppercase tracking-[0.5em] text-fuchsia-300">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>

                {/* Delivery phases */}
                <div className="rounded-[2rem] border border-white/8 bg-white/5 p-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.5em] text-slate-400">
                    {t.hero.delivery.title}
                  </p>
                  <div className="mt-4 space-y-4">
                    {t.hero.delivery.phases.map((phase, index) => (
                      <div
                        key={phase.title}
                        className="flex flex-col gap-1 border-l-2 border-white/15 pl-4"
                      >
                        <span className="text-[0.65rem] uppercase tracking-[0.4em] text-slate-500">
                          {language === "fr" ? `Étape ${index + 1}` : `Step ${index + 1}`}
                        </span>
                        <p className="text-sm font-semibold text-white">{phase.title}</p>
                        <p className="text-sm text-slate-400">{phase.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid gap-3 sm:grid-cols-3">
                  {t.hero.heroStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.5 + i * 0.1 }}
                      className="rounded-[1.5rem] border border-white/8 bg-linear-to-br from-white/8 to-transparent p-4 text-center sm:text-left"
                    >
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-[0.65rem] uppercase tracking-[0.5em] text-slate-400">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Experience mockup */}
                <div className="relative mt-6">
                  <div className="absolute inset-0 h-full w-full animate-pulse rounded-[3rem] bg-linear-to-br from-purple-600/20 via-fuchsia-500/15 to-blue-500/20 blur-3xl" />
                  <div className="relative rounded-[3rem] border border-white/10 bg-linear-to-br from-[#1d0c36] via-[#080f2c] to-[#060910] p-8 shadow-[0_35px_90px_rgba(3,4,20,0.9)]">
                    <div className="pointer-events-none absolute inset-5 rounded-[2.5rem] border border-white/5" />
                    <div className="absolute right-8 top-8 hidden rounded-xl border border-white/10 bg-linear-to-r from-fuchsia-500/25 to-blue-500/25 px-4 py-2 text-[0.65rem] uppercase tracking-[0.4em] text-white/70 sm:flex">
                      {t.hero.experience.slaLabel}
                    </div>
                    <div className="relative flex flex-col items-center text-white">
                      <Image
                        src="/pc-portable.png"
                        alt={language === "fr" ? "Interface web ENOV" : "ENOV web interface"}
                        width={1536}
                        height={1024}
                        priority
                        className="w-full max-w-[560px] drop-shadow-[0_30px_70px_rgba(10,12,40,0.9)]"
                      />
                      <div className="mt-8 w-full max-w-xs space-y-3 text-center">
                        <p className="text-[0.7rem] uppercase tracking-[0.6em] text-slate-300">
                          {t.hero.experience.kicker}
                        </p>
                        <p className="text-xl font-semibold">{t.hero.experience.product}</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="h-1.5 w-20 rounded-full bg-white/15" />
                          <span className="h-1.5 w-8 rounded-full bg-white/10" />
                          <span className="h-1.5 w-4 rounded-full bg-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Mobile phone mockup */}
                  <div className="mt-8 flex justify-center sm:absolute sm:-right-8 sm:bottom-4 sm:mt-0">
                    <div className="relative w-28 rounded-[2.5rem] border border-white/10 bg-linear-to-br from-[#070b18] to-[#0b0f23] p-3 shadow-[0_18px_45px_rgba(4,5,18,0.8)] md:w-36">
                      <div className="pointer-events-none absolute inset-1 rounded-[2.2rem] border border-white/5" />
                      <Image
                        src="/mobile.png"
                        alt={language === "fr" ? "Application mobile ENOV" : "ENOV mobile application"}
                        width={1024}
                        height={1536}
                        className="relative w-full rounded-[2rem] drop-shadow-[0_20px_40px_rgba(6,6,30,0.8)]"
                      />
                      <p className="mt-3 text-center text-[0.55rem] uppercase tracking-[0.4em] text-slate-400">
                        {t.hero.experience.mobileLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── CATALOG ─────────────────────────────────────────────── */}
        <FadeUp>
          <section id="catalogue" className="space-y-10">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                {t.catalog.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                {t.catalog.title}
              </h2>
              <p className="text-slate-400">{t.catalog.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {t.catalog.apps.map((app, i) => (
                <motion.div
                  key={app.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/40 p-6 transition hover:border-white/15"
                >
                  <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-fuchsia-500/50 to-purple-500/50" />
                  <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-300">
                    {app.title}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {app.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── WEBSITES ────────────────────────────────────────────── */}
        <FadeUp>
          <section className="space-y-10">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                {t.webSites.kicker}
              </p>
              <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                {t.webSites.title}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {t.webSites.sites.map((site, i) => (
                <motion.div
                  key={site.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative overflow-hidden rounded-3xl border border-white/8 bg-slate-900/40 p-6 transition hover:border-white/15"
                >
                  <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-blue-500/50 to-sky-500/50" />
                  <p className="text-xs uppercase tracking-[0.4em] text-blue-300">{site.title}</p>
                  <p className="mt-3 text-sm text-slate-300">{site.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* ── PROCESS + TECH ──────────────────────────────────────── */}
        <FadeUp>
          <section className="grid gap-5 lg:grid-cols-2">
            {/* Process */}
            <div className="space-y-6 rounded-3xl border border-white/8 bg-slate-900/40 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                  {t.process.kicker}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{t.process.title}</h3>
              </div>
              <div className="space-y-5">
                {t.process.steps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-purple-500/30 to-blue-500/30 border border-white/10">
                      <span className="bg-linear-to-br from-fuchsia-300 to-blue-300 bg-clip-text text-sm font-black text-transparent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-0.5 text-sm text-slate-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech */}
            <div className="space-y-6 rounded-3xl border border-white/8 bg-slate-900/40 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-500">
                  {t.tech.kicker}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{t.tech.title}</h3>
              </div>
              <div className="space-y-3">
                {t.tech.stack.map((techItem) => (
                  <div
                    key={techItem.label}
                    className="rounded-2xl border border-white/8 bg-white/5 p-4 transition hover:border-white/15"
                  >
                    <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-300">
                      {techItem.label}
                    </p>
                    <p className="mt-1.5 text-sm text-slate-300">{techItem.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ── CLOSING ─────────────────────────────────────────────── */}
        <FadeUp>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/15 via-fuchsia-500/8 to-blue-500/15" />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
            </div>
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.5em] text-fuchsia-300">
                  {t.closing.kicker}
                </p>
                <h2 className="text-3xl font-bold text-balance sm:text-4xl">
                  {t.closing.title}
                </h2>
                <p className="text-slate-300">{t.closing.description}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
                >
                  {t.closing.cta}
                </Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  {t.closing.deliverableLabel}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {t.closing.deliverables.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.08 }}
                      className="flex items-start gap-2 text-slate-200"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </FadeUp>

      </div>
    </main>
  );
}
