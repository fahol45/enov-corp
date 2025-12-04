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
      title: "Des apps web & mobile simples pour vos besoins quotidiens",
      description:
        "Nous orchestrons UX, design system et delivery pour livrer des produits desktop & mobile qui boostent vos op\u00e9rations, vos ventes et votre relation client.",
      tags: ["Finance", "Commerce", "Op\u00e9rations", "Sant\u00e9", "Relation client", "Etc."],
      primaryCta: "Discuter de mon app",
      secondaryCta: "Voir le catalogue",
      offer: {
        kicker: "Offre web & mobile",
        title: "ENOV con\u00e7oit, code et monitore vos produits",
        description:
          "Nous prenons en charge le design UX/UI, le d\u00e9veloppement front/back et l'op\u00e9ration continue de vos interfaces clients et terrain.",
        metrics: [],
      },
      highlights: [
        {
          title: "Design system responsive",
          description: "Un seul langage UI d\u00e9clinable sur desktop, tablette, mobiles rugged et kiosques.",
        },
        {
          title: "Offline first",
          description: "Synchronisation intelligente, cache local et reprises automatiques de session.",
        },
        {
          title: "S\u00e9curit\u00e9 zero trust",
          description: "SSO, MFA, gestion fine des droits et audits pour prot\u00e9ger vos flux sensibles.",
        },
      ],
      delivery: {
        title: "Parcours delivery",
        phases: [
          { title: "Cadrage express", detail: "3 ateliers UX, KPIs align\u00e9s et backlog valid\u00e9 avec vos m\u00e9tiers." },
          { title: "Design & build", detail: "UI kit multi devices, front/back simultan\u00e9 et QA automatis\u00e9e." },
          { title: "Run & expansion", detail: "Monitoring, SLA partag\u00e9s et coaching produit pour vos \u00e9quipes." },
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
      title: "Les apps que nous livrons le plus",
      description:
        "Finance, e-commerce, exploitation, exp\u00e9rience client : nous industrialisons vos produits mobiles.",
      apps: [
        {
          title: "Finance & paiement",
          items: [
            "Super-app finance pour op\u00e9rateurs",
            "Portefeuille digital et contr\u00f4le d\u00e9penses",
            "App de gestion d'investissements",
          ],
        },
        {
          title: "Commerce & marketplace",
          items: [
            "Marketplace B2B avec pricing dynamique",
            "App e-commerce click & collect",
            "Catalogue vendeur + outils merchandising",
          ],
        },
        {
          title: "Exploitation & maintenance",
          items: ["GMAO terrain offline", "Suivi des lots de production", "Checklist qualit\u00e9 et s\u00e9curit\u00e9"],
        },
        {
          title: "Exp\u00e9rience client",
          items: [
            "Portail client self-service",
            "Application visiteur pour showroom",
            "App fid\u00e9lit\u00e9 \u00e9lite avec gamification",
          ],
        },
      ],
    },
    webSites: {
      kicker: "Sites web & portails",
      title: "Des exp\u00e9riences web pour informer, convertir, servir",
      sites: [
        {
          title: "Sites corporate",
          description: "Positionnement marque, offres et preuves avec CMS headless pour vos \u00e9quipes marketing.",
        },
        {
          title: "Portails data & analytics",
          description:
            "Visualisation temps r\u00e9el, dashboards partag\u00e9s, exports et modules embarqu\u00e9s pour vos partenaires.",
        },
        {
          title: "Extranets clients",
          description: "Espace personnalis\u00e9 avec contrats, factures, support et workflows de validation.",
        },
        {
          title: "Landing produit / growth",
          description: "Pages campagne, formulaires, A/B testing et connecteurs CRM.",
        },
      ],
    },
    process: {
      kicker: "Notre m\u00e9thode",
      title: "Un cycle produit complet",
      steps: [
        {
          title: "Discovery",
          description: "Immersion utilisateurs, d\u00e9finition KPIs, priorisation des journeys mobiles et web.",
        },
        {
          title: "Product design",
          description: "UX flows, UI kit multi devices, prototypes cliquables et guidelines dev.",
        },
        {
          title: "Engineering",
          description: "Stack React Native, Next.js, Nest et CI/CD s\u00e9curis\u00e9e avec tests end-to-end.",
        },
        {
          title: "Run & optimisation",
          description: "Monitoring, feature flags, analytics produit et roadmap partag\u00e9e avec vos \u00e9quipes.",
        },
      ],
    },
    tech: {
      kicker: "Stack technique",
      title: "Technologies que nous ma\u00eetrisons",
      stack: [
        { label: "Mobile", details: "React Native, Expo, Capacitor, Kotlin, Swift" },
        { label: "Web", details: "Next.js, Remix, Astro, Tailwind, Storybook" },
        { label: "Backend", details: "NestJS, Supabase, Firebase, Hasura, FastAPI" },
        { label: "Qualit\u00e9", details: "Playwright, Detox, Cypress, Sentry" },
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
        "Finance, e-commerce, op\u00e9rations, relation client : dites-nous le probl\u00e8me, nous livrons l'app et le site.",
      cta: "R\u00e9server un atelier digital",
      deliverables: [
        "Product brief, roadmap, KPIs align\u00e9s",
        "Design system multi-plateformes",
        "Apps mobiles (store / private) et sites web",
        "Run, monitoring et support produit",
      ],
      deliverableLabel: "Livrables",
    },
  },
  en: {
    hero: {
      badge: "Web & mobile development",
      title: "Web & mobile experiences aligned with your field operations",
      description:
        "We orchestrate UX, design systems and delivery to ship desktop + mobile products that boost operations, sales and customer care.",
      tags: ["Finance", "Commerce", "Ops", "Health", "Customer service"],
      primaryCta: "Discuss my app",
      secondaryCta: "See the catalog",
      offer: {
        kicker: "Web & mobile offer",
        title: "ENOV designs, builds and monitors your products",
        description:
          "We handle UX/UI design, front/back development and the continuous run of your customer and field interfaces.",
        metrics: [],
      },
      highlights: [
        {
          title: "Responsive design system",
          description: "One UI language rolled out on desktop, tablet, rugged mobiles and kiosks.",
        },
        {
          title: "Offline first",
          description: "Smart sync, local cache and automatic session resume.",
        },
        {
          title: "Zero-trust security",
          description: "SSO, MFA, granular permissions and audits to protect sensitive flows.",
        },
      ],
      delivery: {
        title: "Delivery journey",
        phases: [
          { title: "Express discovery", detail: "3 UX workshops, aligned KPIs and backlog approved with your teams." },
          { title: "Design & build", detail: "Multi-device UI kit, parallel front/back and automated QA." },
          { title: "Run & expansion", detail: "Monitoring, shared SLAs and product coaching for your teams." },
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
      title: "Apps we ship the most",
      description:
        "Finance, commerce, operations, customer experience: we industrialize your mobile products.",
      apps: [
        {
          title: "Finance & payment",
          items: [
            "Finance super-app for operators",
            "Digital wallet and spend control",
            "Investment management app",
          ],
        },
        {
          title: "Commerce & marketplaces",
          items: [
            "B2B marketplace with dynamic pricing",
            "Click & collect e-commerce app",
            "Seller catalog + merchandising tools",
          ],
        },
        {
          title: "Operations & maintenance",
          items: ["Offline CMMS", "Production lot tracking", "Quality and safety checklist"],
        },
        {
          title: "Customer experience",
          items: [
            "Self-service customer portal",
            "Visitor app for showrooms",
            "Elite loyalty app with gamification",
          ],
        },
      ],
    },
    webSites: {
      kicker: "Websites & portals",
      title: "Web experiences to inform, convert and serve",
      sites: [
        {
          title: "Corporate sites",
          description: "Brand positioning, offers and proof with headless CMS for marketing teams.",
        },
        {
          title: "Data & analytics portals",
          description:
            "Real-time visualizations, shared dashboards, exports and embedded modules for partners.",
        },
        {
          title: "Customer extranets",
          description: "Personalized space with contracts, invoices, support and approval workflows.",
        },
        {
          title: "Product landing / growth",
          description: "Campaign pages, forms, AB testing and CRM connectors.",
        },
      ],
    },
    process: {
      kicker: "Our method",
      title: "A complete product cycle",
      steps: [
        {
          title: "Discovery",
          description: "User immersion, KPI definition, prioritization of mobile and web journeys.",
        },
        {
          title: "Product design",
          description: "UX flows, multi-device UI kit, clickable prototypes and dev guidelines.",
        },
        {
          title: "Engineering",
          description: "React Native, Next.js, Nest stack with secure CI/CD and end-to-end tests.",
        },
        {
          title: "Run & optimization",
          description: "Monitoring, feature flags, product analytics and shared roadmap.",
        },
      ],
    },
    tech: {
      kicker: "Tech stack",
      title: "Technologies we master",
      stack: [
        { label: "Mobile", details: "React Native, Expo, Capacitor, Kotlin, Swift" },
        { label: "Web", details: "Next.js, Remix, Astro, Tailwind, Storybook" },
        { label: "Backend", details: "NestJS, Supabase, Firebase, Hasura, FastAPI" },
        { label: "Quality", details: "Playwright, Detox, Cypress, Sentry" },
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
        "Finance, commerce, operations, customer care: state the challenge and we deliver the app plus the site.",
      cta: "Book a digital workshop",
      deliverables: [
        "Product brief, roadmap, aligned KPIs",
        "Multi-platform design system",
        "Mobile apps (store/private) and websites",
        "Run, monitoring and product support",
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
        <section className="relative flex flex-col gap-12 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 pb-12 shadow-2xl shadow-black/50 sm:p-8 sm:pb-16 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.6em] text-fuchsia-200">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-blue-500" />
              {t.hero.badge}
            </div>
            <h1 className="text-[2.5rem] font-semibold leading-tight text-white sm:text-[3.1rem]">
              {t.hero.title}
            </h1>
            <p className="text-lg text-slate-300">{t.hero.description}</p>
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
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white hover:bg-white/5"
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

        <section id="catalogue" className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 sm:p-8">
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
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 sm:p-8">
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
        <section className="grid gap-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/40 sm:p-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-lg">
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
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-lg">
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

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-center shadow-2xl sm:p-8 md:grid-cols-2">
          <div className="space-y-4 text-left md:text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-purple-200">{t.closing.kicker}</p>
            <h2 className="text-3xl font-semibold">{t.closing.title}</h2>
            <p className="text-slate-300">{t.closing.description}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
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

