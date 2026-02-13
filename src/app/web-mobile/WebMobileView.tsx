"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Highlight = { title: string; description: string };
type Catalog = { title: string; items: string[] };
type WebSite = { title: string; description: string };
type ProcessStep = { title: string; description: string };
type Tech = { label: string; details: string };
type CaseStudy = { name: string; product: string; impact: string; summary: string };
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
  cases: {
    kicker: string;
    title: string;
    items: CaseStudy[];
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
      badge: "D\u00e9veloppement web & mobile",
      title: "Des apps web & mobile claires, utiles et rentables",
      description:
        "Nous cr\u00e9ons des apps et sites qui am\u00e9liorent vos ventes, vos op\u00e9rations et votre relation client.",
      tags: ["Finance", "Commerce", "Op\u00e9rations", "Sant\u00e9", "Relation client", "Etc."],
      primaryCta: "Discuter de mon app",
      secondaryCta: "Voir le catalogue",
      offer: {
        kicker: "Offre web & mobile",
        title: "ENOV con\u00e7oit et livre vos produits digitaux",
        description:
          "UX/UI, d\u00e9veloppement et suivi continu, avec un seul interlocuteur.",
        metrics: [],
      },
      highlights: [
        {
          title: "Design clair",
          description: "Une exp\u00e9rience coh\u00e9rente sur tous les \u00e9crans.",
        },
        {
          title: "Offline first",
          description: "Vos \u00e9quipes travaillent m\u00eame hors connexion.",
        },
        {
          title: "S\u00e9curit\u00e9 int\u00e9gr\u00e9e",
          description: "Acc\u00e8s ma\u00eetris\u00e9s et donn\u00e9es prot\u00e9g\u00e9es.",
        },
      ],
      delivery: {
        title: "Parcours simple",
        phases: [
          { title: "Cadrage express", detail: "Besoins clairs, KPIs d\u00e9finis et plan valid\u00e9." },
          { title: "Design & build", detail: "Design valid\u00e9, d\u00e9veloppement rapide, tests inclus." },
          { title: "Run & \u00e9volution", detail: "Suivi, support et am\u00e9liorations continues." },
        ],
      },
      heroStats: [
        { label: "Apps en production", value: "45+" },
        { label: "D\u00e9lai moyen", value: "3 mois" },
        { label: "Satisfaction clients", value: "4.9/5" },
      ],
      experience: {
        kicker: "Exp\u00e9rience web sur mesure",
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
      title: "Les apps les plus demand\u00e9es",
      description:
        "Des applications utiles pour chaque m\u00e9tier, pr\u00eates \u00e0 l'usage.",
      apps: [
        {
          title: "Finance & paiement",
          items: [
            "App finance pour op\u00e9rateurs",
            "Portefeuille digital et d\u00e9penses",
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
          items: ["GMAO terrain offline", "Suivi de production", "Checklist qualit\u00e9"],
        },
        {
          title: "Exp\u00e9rience client",
          items: [
            "Portail client",
            "App visiteur showroom",
            "App fid\u00e9lit\u00e9",
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
            "Dashboards temps r\u00e9el, exports et partage des donn\u00e9es.",
        },
        {
          title: "Extranets clients",
          description: "Espace client avec contrats, factures et support.",
        },
        {
          title: "Landing produit / growth",
          description: "Pages campagne et formulaires connect\u00e9s.",
        },
      ],
    },
    process: {
      kicker: "Notre m\u00e9thode",
      title: "Un parcours simple",
      steps: [
        {
          title: "Discovery",
          description: "Comprendre vos besoins et vos priorit\u00e9s.",
        },
        {
          title: "Product design",
          description: "Maquettes claires et design valid\u00e9.",
        },
        {
          title: "Engineering",
          description: "D\u00e9veloppement rapide et fiable.",
        },
        {
          title: "Run & optimisation",
          description: "Suivi, am\u00e9lioration continue et support.",
        },
      ],
    },
    tech: {
      kicker: "Stack technique",
      title: "Technologies fiables",
      stack: [
        { label: "Mobile", details: "iOS, Android, React Native" },
        { label: "Web", details: "Next.js, React, interfaces rapides" },
        { label: "Backend", details: "APIs, bases de donn\u00e9es, s\u00e9curit\u00e9" },
        { label: "Qualit\u00e9", details: "Tests, monitoring, fiabilit\u00e9" },
      ],
    },
    cases: {
      kicker: "",
      title: "",
      items: [],
    },
    closing: {
      kicker: "Pr\u00eat pour votre prochain produit",
      title: "Co-cr\u00e9ons votre application ou site web",
      description:
        "Dites-nous votre besoin, nous livrons l'app et le site.",
      cta: "R\u00e9server un atelier digital",
      deliverables: [
        "Brief clair et plan d'action",
        "Design valid\u00e9 multi-\u00e9crans",
        "App mobile et site web",
        "Support et \u00e9volution",
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
    cases: {
      kicker: "",
      title: "",
      items: [],
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
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute top-0 left-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>
      <div className="app-shell section-flow">
        <section className="relative flex flex-col gap-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4 pb-10 shadow-2xl shadow-black/50 sm:p-6 sm:pb-14 lg:flex-row lg:items-center lg:p-10 lg:pb-16">
        <div className="flex-1 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.6em] text-fuchsia-200">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-blue-500" />
              {t.hero.badge}
            </div>
            <h1 className="text-[2.5rem] font-semibold leading-tight text-white sm:text-[3.1rem]">
              {t.hero.title}
            </h1>
            <p className="text-lg text-slate-300 text-pretty text-left sm:text-justify">{t.hero.description}</p>
            <div className="flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-[0.4em] text-slate-400">
              {t.hero.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-white/80">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#a855f7] via-[#d946ef] to-[#0ea5e9] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-purple-600/30 transition hover:scale-[1.02]"
              >
                {t.hero.primaryCta}
              </Link>
              <a
                href="#catalogue"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white hover:bg-white/5 sm:w-auto"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#070812]/90 via-[#0b0f1f]/80 to-[#05060c]/70 p-6 shadow-[0_25px_65px_rgba(3,4,15,0.75)] sm:p-10">
            <div className="space-y-7">
              <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-[#a855f7]/25 to-[#0ea5e9]/25 p-6 text-white">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.5em] text-white/70">{t.hero.offer.kicker}</p>
                    <h3 className="text-2xl font-semibold">{t.hero.offer.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{t.hero.offer.description}</p>
                  </div>
                  {t.hero.offer.metrics.length > 0 && (
                    <div className="text-right text-sm text-white/80">
                      {t.hero.offer.metrics.map((metric) => (
                        <p key={metric}>{metric}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {t.hero.highlights.map((item) => (
                  <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.5em] text-fuchsia-200">
                      {item.title.toUpperCase()}
                    </p>
                    <p className="mt-3 text-sm text-slate-200">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6">
                <p className="text-[0.65rem] uppercase tracking-[0.5em] text-slate-300">{t.hero.delivery.title}</p>
                <div className="mt-4 space-y-4">
                  {t.hero.delivery.phases.map((phase, index) => (
                    <div key={phase.title} className="flex flex-col gap-1 border-l-2 border-white/20 pl-4">
                      <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
                        {language === "fr"
                          ? `\u00c9tape ${index + 1}`
                          : `Step ${index + 1}`}
                      </span>
                      <p className="text-base font-semibold text-white">{phase.title}</p>
                      <p className="text-sm text-slate-300">{phase.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {t.hero.heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4 text-center sm:text-left"
                  >
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="text-[0.7rem] uppercase tracking-[0.5em] text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-10">
                <div className="absolute inset-0 h-full w-full animate-pulse rounded-[4rem] bg-gradient-to-br from-purple-600/25 via-fuchsia-500/20 to-blue-500/25 blur-3xl" />
                <div className="relative rounded-[4rem] border border-white/10 bg-gradient-to-br from-[#1d0c36] via-[#080f2c] to-[#060910] p-10 shadow-[0_35px_90px_rgba(3,4,20,0.9)]">
                  <div className="pointer-events-none absolute inset-6 rounded-[3.5rem] border border-white/5" />
                  {t.hero.experience.kpiLabel && (
                    <div className="absolute left-8 top-10 hidden flex-col gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.4em] text-slate-200 lg:flex z-10">
                      <span>{t.hero.experience.sliderLabel}</span>
                      <p className="text-2xl font-semibold tracking-normal text-white">
                        {t.hero.experience.kpiLabel}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {language === "fr" ? "Temps r\u00e9el" : "Realtime"}
                      </span>
                    </div>
                  )}
                  <div className="absolute right-10 top-12 hidden rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500/30 to-blue-500/30 px-4 py-3 text-xs uppercase tracking-[0.4em] text-white/80 sm:flex z-10">
                    {t.hero.experience.slaLabel}
                  </div>
                  <div className="relative flex flex-col items-center text-white">
                    <Image
                      src="/pc-portable.png"
                      alt={
                        language === "fr" ? "Interface web ENOV" : "ENOV web interface"
                      }
                      width={1536}
                      height={1024}
                      priority
                      className="w-full max-w-[620px] drop-shadow-[0_30px_70px_rgba(10,12,40,0.9)]"
                    />
                    <div className="mt-10 w-full max-w-sm space-y-4 text-center">
                      <p className="text-[0.75rem] uppercase tracking-[0.65em] text-slate-200">
                        {t.hero.experience.kicker}
                      </p>
                      <p className="text-2xl font-semibold">{t.hero.experience.product}</p>
                      <div className="flex items-center justify-center gap-3">
                        <span className="h-2 w-24 rounded-full bg-white/15" />
                        <span className="h-2 w-10 rounded-full bg-white/10" />
                        <span className="h-2 w-4 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-center sm:mt-0 sm:block sm:w-auto sm:absolute sm:-right-10 sm:bottom-6">
                  <div className="relative w-32 rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#070b18] to-[#0b0f23] p-4 text-white shadow-[0_18px_45px_rgba(4,5,18,0.8)] md:w-44">
                    <div className="pointer-events-none absolute inset-1 rounded-[2.6rem] border border-white/5" />
                    <Image
                      src="/mobile.png"
                      alt={
                        language === "fr" ? "Application mobile ENOV" : "ENOV mobile application"
                      }
                      width={1024}
                      height={1536}
                      className="relative w-full rounded-[2.3rem] drop-shadow-[0_20px_40px_rgba(6,6,30,0.8)]"
                    />
                    <p className="mt-4 text-center text-[10px] uppercase tracking-[0.4em] text-slate-300">
                      {t.hero.experience.mobileLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        <section id="catalogue" className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.catalog.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.catalog.title}</h2>
            <p className="text-base text-slate-300">{t.catalog.description}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {t.catalog.apps.map((app) => (
              <div
                key={app.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-slate-900/50 p-6"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-purple-200">{app.title}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {app.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.webSites.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.webSites.title}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {t.webSites.sites.map((site) => (
              <div key={site.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-blue-200">{site.title}</p>
                <p className="mt-3 text-sm text-slate-200">{site.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="grid gap-6 rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/40 sm:p-6 md:p-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-lg sm:p-6">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.process.kicker}</p>
            <h3 className="text-2xl font-semibold">{t.process.title}</h3>
            <div className="mt-6 space-y-5">
              {t.process.steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{step.title}</p>
                    <p className="text-sm text-slate-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-lg sm:p-6">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">{t.tech.kicker}</p>
            <h3 className="text-2xl font-semibold">{t.tech.title}</h3>
            <div className="mt-6 space-y-4">
              {t.tech.stack.map((techItem) => (
                <div key={techItem.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-fuchsia-200">{techItem.label}</p>
                  <p className="mt-2 text-sm text-slate-200">{techItem.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 text-center shadow-2xl sm:p-6 md:p-8 md:grid-cols-2">
          <div className="space-y-4 text-left md:text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-purple-200">{t.closing.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.closing.title}</h2>
            <p className="text-slate-300">{t.closing.description}</p>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105 sm:w-auto"
            >
              {t.closing.cta}
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{t.closing.deliverableLabel}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {t.closing.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
