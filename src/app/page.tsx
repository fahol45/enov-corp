"use client";

import Link from "next/link";
import { DigitalTwinCard } from "@/components/DigitalTwinCard";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";

type Pillar = {
  title: string;
  description: string;
  highlights: string[];
  cta: string;
  href: string;
};

type Reason = {
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
};

type LandingCopy = {
  hero: {
    title: string;
    description: string;
    bullets: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  pillars: {
    kicker: string;
    title: string;
    description: string;
    items: Pillar[];
  };
  capabilities: {
    title: string;
    items: Reason[];
  };
  approach: {
    kicker: string;
    title: string;
    description: string;
    steps: Step[];
  };
  academy: {
    kicker: string;
    title: string;
    description: string;
    tracks: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  contact: {
    kicker: string;
    title: string;
    description: string;
    cta: string;
  };
};

const landingCopy: Record<SupportedLanguage, LandingCopy> = {
  fr: {
    hero: {
      title: "Enov CORP, la technologie au service de vos projets.",
      description:
        "Nous combinons solutions connectées, développement digital et formation pour transformer vos idées en résultats concrets.",
      bullets: [
        "Systèmes intelligents pour piloter vos opérations.",
        "Applications web et mobiles simples à utiliser.",
        "Formations pratiques pour rendre vos équipes autonomes.",
        "Accompagnement complet, de l'étude au support.",
      ],
      primaryCta: "Découvrir nos pôles",
      secondaryCta: "Parler à un conseiller",
    },
    pillars: {
      kicker: "Nos 3 pôles",
      title: "Une offre claire, complète et orientée résultats",
      description:
        "Trois expertises qui se complètent pour accélérer vos projets et vos équipes.",
      items: [
        {
          title: "Hydroponie intelligente & IoT",
          description:
            "Automatisez, mesurez et pilotez vos systèmes avec des solutions connectées fiables.",
          highlights: [
            "Capteurs et automatisation des processus.",
            "Suivi en temps réel et alertes claires.",
            "Décision locale (edge) + synchronisation cloud.",
          ],
          cta: "Voir l'hydroponie",
          href: "/hydroponie",
        },
        {
          title: "Développement Web & Mobile",
          description:
            "Des outils digitaux modernes pour visualiser, décider et agir vite.",
          highlights: [
            "Dashboards simples et performants.",
            "Apps Android/iOS pour vos équipes terrain.",
            "Intégrations avec vos données et systèmes.",
          ],
          cta: "Voir le digital",
          href: "/web-mobile",
        },
        {
          title: "Enov Academy",
          description:
            "Formations techniques pour étudiants et professionnels, orientées projets réels.",
          highlights: [
            "Parcours courts et pratiques.",
            "Technologies clés du marché.",
            "Transfert de compétences concret.",
          ],
          cta: "Découvrir l'Academy",
          href: "/academy",
        },
      ],
    },
    capabilities: {
      title: "Ce que vous gagnez",
      items: [
        {
          title: "Clarté",
          description:
            "Une vision simple de votre projet et des décisions plus rapides.",
        },
        {
          title: "Performance",
          description:
            "Des systèmes fiables et des outils qui font gagner du temps.",
        },
        {
          title: "Autonomie",
          description:
            "Vos équipes montent en compétence et deviennent opérationnelles.",
        },
        {
          title: "Partenariat",
          description:
            "Un accompagnement durable avec support et optimisation continue.",
        },
      ],
    },
    approach: {
      kicker: "Accompagnement A à Z",
      title: "Un parcours simple, maîtrisé, efficace",
      description:
        "Nous vous guidons à chaque étape pour un projet livré et utilisable.",
      steps: [
        {
          title: "Étude & cadrage",
          description: "Comprendre vos objectifs et définir le bon plan d'action.",
        },
        {
          title: "Conception & prototypage",
          description:
            "Architecture technique, maquette 3D et validation rapide.",
        },
        {
          title: "Déploiement",
          description:
            "Installation, intégration et mise en service des solutions.",
        },
        {
          title: "Formation & support",
          description:
            "Montée en compétence, suivi et amélioration continue.",
        },
      ],
    },
    academy: {
      kicker: "Enov Academy",
      title: "Former pour aller plus vite",
      description:
        "Nos formations transforment les compétences en résultats concrets, pour les équipes et les étudiants.",
      tracks: [
        "Hydroponie intelligente",
        "IoT & edge computing",
        "Développement web",
        "Développement mobile",
        "Robotique & embarqué",
        "Infographie & design",
        "Design 3D",
      ],
      primaryCta: "Voir les formations",
      secondaryCta: "Planifier une session",
    },
    contact: {
      kicker: "Prêt à avancer ?",
      title: "Parlons de votre projet",
      description:
        "Expliquez-nous votre besoin et nous construirons une solution claire, réaliste et efficace.",
      cta: "Contacter Enov CORP",
    },
  },
  en: {
    hero: {
      title: "Enov CORP, technology built for real results.",
      description:
        "We combine connected solutions, digital products, and training to turn ideas into measurable outcomes.",
      bullets: [
        "Smart systems to run your operations with confidence.",
        "Web and mobile apps that are simple to use.",
        "Practical training to make teams autonomous.",
        "End-to-end support from study to ongoing help.",
      ],
      primaryCta: "Explore our pillars",
      secondaryCta: "Talk to an advisor",
    },
    pillars: {
      kicker: "Our 3 pillars",
      title: "A clear, complete offer focused on impact",
      description:
        "Three complementary areas that accelerate your projects and your teams.",
      items: [
        {
          title: "Smart Hydroponics & IoT",
          description:
            "Automate, measure and control your systems with reliable connectivity.",
          highlights: [
            "Sensors and process automation.",
            "Real-time monitoring and clear alerts.",
            "Local edge decisions + cloud sync.",
          ],
          cta: "Explore hydroponics",
          href: "/hydroponie",
        },
        {
          title: "Web & Mobile Development",
          description:
            "Modern digital tools to visualize, decide and act fast.",
          highlights: [
            "Simple, high-performance dashboards.",
            "Android/iOS apps for field teams.",
            "Integration with your data and systems.",
          ],
          cta: "See digital products",
          href: "/web-mobile",
        },
        {
          title: "Enov Academy",
          description:
            "Hands-on training for students and professionals, built around real projects.",
          highlights: [
            "Short, practical learning paths.",
            "Key market technologies.",
            "Concrete skills transfer.",
          ],
          cta: "Discover the Academy",
          href: "/academy",
        },
      ],
    },
    capabilities: {
      title: "What you gain",
      items: [
        {
          title: "Clarity",
          description:
            "A simple view of your project and faster decision-making.",
        },
        {
          title: "Performance",
          description: "Reliable systems and tools that save time.",
        },
        {
          title: "Autonomy",
          description: "Teams that grow skills and operate independently.",
        },
        {
          title: "Partnership",
          description: "Long-term support and continuous optimization.",
        },
      ],
    },
    approach: {
      kicker: "A to Z delivery",
      title: "A simple, controlled, effective journey",
      description:
        "We guide you at every step to deliver a usable, reliable solution.",
      steps: [
        {
          title: "Study & alignment",
          description: "Understand goals and define the right roadmap.",
        },
        {
          title: "Design & prototyping",
          description: "Architecture, 3D mockups and fast validation.",
        },
        {
          title: "Deployment",
          description: "Installation, integration and go-live.",
        },
        {
          title: "Training & support",
          description: "Upskilling, follow-up and continuous improvement.",
        },
      ],
    },
    academy: {
      kicker: "Enov Academy",
      title: "Training that moves projects forward",
      description:
        "Our programs turn skills into tangible results for teams and students.",
      tracks: [
        "Smart hydroponics",
        "IoT & edge computing",
        "Web development",
        "Mobile development",
        "Robotics & embedded systems",
        "Infographics & design",
        "3D design",
      ],
      primaryCta: "Explore programs",
      secondaryCta: "Plan a session",
    },
    contact: {
      kicker: "Ready to move forward?",
      title: "Let\'s talk about your project",
      description:
        "Share your needs and we will build a clear, realistic and efficient solution.",
      cta: "Contact Enov CORP",
    },
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = landingCopy[language];

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="app-shell section-flow relative">
        <section className="grid gap-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-4 pb-8 shadow-2xl shadow-black/40 backdrop-blur sm:gap-10 sm:p-6 sm:pb-12 md:grid-cols-2 md:gap-12 md:rounded-3xl md:p-10 lg:p-12">
          <div className="space-y-6">
            <h1 className="text-[2rem] font-bold leading-tight text-white text-balance sm:text-4xl md:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-base text-slate-300 text-pretty text-left sm:text-lg md:text-justify">
              {t.hero.description}
            </p>
            <ul className="space-y-3 text-sm text-slate-200 sm:text-base">
              {t.hero.bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-pink-500" />
                  <span className="text-pretty text-left md:text-justify">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#poles"
                className="inline-flex w-full min-w-[180px] items-center justify-center rounded-full bg-linear-to-r from-pink-500 via-purple-500 to-sky-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-pink-500/40 transition hover:scale-105 sm:w-auto"
              >
                {t.hero.primaryCta}
              </a>
              <a
                href="#contact"
                className="inline-flex w-full min-w-[180px] items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center pb-6 sm:pb-10 md:pb-0">
            <DigitalTwinCard />
          </div>
        </section>

        <section id="poles" className="space-y-10">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              {t.pillars.kicker}
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t.pillars.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-slate-400">
              {t.pillars.description}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {t.pillars.items.map((pillar) => (
              <div
                key={pillar.title}
                className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/30"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {pillar.description}
                  </p>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {pillar.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-pink-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={pillar.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/60 hover:bg-white/10"
                >
                  {pillar.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-inner shadow-black/50 sm:rounded-3xl sm:p-6 md:p-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            {t.capabilities.title}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.capabilities.items.map((reason) => (
              <li
                key={reason.title}
                className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <span className="text-base font-semibold text-white">
                  {reason.title}
                </span>
                <span className="text-sm text-slate-300">
                  {reason.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="approach" className="space-y-8">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
              {t.approach.kicker}
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t.approach.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
              {t.approach.description}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.approach.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-center shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-pink-500 to-sky-500 text-lg font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/40 sm:rounded-3xl sm:p-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-pink-300">
              {t.academy.kicker}
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {t.academy.title}
            </h2>
            <p className="text-base text-slate-300 sm:text-lg">
              {t.academy.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/academy"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
              >
                {t.academy.primaryCta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10"
              >
                {t.academy.secondaryCta}
              </Link>
            </div>
          </div>
          <ul className="grid gap-3 text-sm text-slate-300">
            {t.academy.tracks.map((track) => (
              <li key={track} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                <span>{track}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="contact"
          className="rounded-2xl border border-white/10 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-4 text-center shadow-2xl sm:rounded-3xl sm:p-6 md:p-8"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-pink-300">
            {t.contact.kicker}
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            {t.contact.description}
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-slate-900 shadow-lg transition hover:scale-105"
          >
            {t.contact.cta}
          </Link>
        </section>
      </div>
    </main>
  );
}