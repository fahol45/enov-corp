export type TrainingStatus = "available" | "soon" | "closed";

export type Training = {
  slug: string;
  title: string;
  category: string;
  status: TrainingStatus;
  summary: string;
  description: string;
  outcomes: string[];
  prerequisites: string[];
  details: {
    duration: string;
    level: string;
    format: string;
    nextSession: string;
    price: string;
    location: string;
  };
  coverImage?: string;
  youtubeEmbed?: string;
  pdfProgram?: string;
  registrationUrl?: string;
};

export const trainings: Training[] = [
  {
    slug: "web-fullstack-premium",
    title: "Web Fullstack Premium",
    category: "Développement web",
    status: "closed",
    summary:
      "Maîtrisez Next.js, APIs et déploiements cloud avec un accompagnement orienté production.",
    description:
      "Un parcours intensif pour créer des plateformes web robustes, sécurisées et performantes, avec un focus sur l'architecture et l'expérience utilisateur.",
    outcomes: [
      "Concevoir une application Next.js prête pour la production",
      "Déployer sur une stack cloud moderne",
      "Optimiser performances et SEO",
    ],
    prerequisites: ["HTML/CSS solide", "Bases de JavaScript"],
    details: {
      duration: "8 semaines",
      level: "Intermédiaire",
      format: "Hybride (présentiel + distanciel)",
      nextSession: "Non disponible",
      price: "480 000 FCFA",
      location: "Abidjan + en ligne",
    },
    coverImage:
      "/Academy_images/Web Fullstack.jpg",
    youtubeEmbed: "https://www.youtube.com/embed/2WTs8h3fQBs",
    pdfProgram:
      "https://your-project.supabase.co/storage/v1/object/public/academy-media/web-fullstack-program.pdf",
  },
  {
    slug: "mobile-product-studio",
    title: "Mobile Product Studio",
    category: "Développement mobile",
    status: "closed",
    summary:
      "Créer des applications mobiles élégantes avec un pipeline design-to-code.",
    description:
      "Un programme axé sur la création de produits mobiles complets, du prototypage au lancement, avec des ateliers UX/UI.",
    outcomes: [
      "Créer une application mobile moderne",
      "Mettre en place un design system mobile",
      "Publier sur les stores",
    ],
    prerequisites: ["Bases de programmation", "Appétence design"],
    details: {
      duration: "6 semaines",
      level: "Intermédiaire",
      format: "Présentiel",
      nextSession: "Non disponible",
      price: "420 000 FCFA",
      location: "Abidjan",
    },
    coverImage: "/Academy_images/Mobile Product Studio.webp",
    youtubeEmbed: "https://www.youtube.com/embed/Q2T0i1c8ZL0",
    pdfProgram: "/academy/mobile-product-studio.pdf",
  },
  {
    slug: "iot-robotics-lab",
    title: "IoT & Robotics Lab",
    category: "IoT & robotique",
    status: "closed",
    summary:
      "Construire des prototypes connectés et piloter des systèmes embarqués.",
    description:
      "Un laboratoire appliqué pour créer des solutions IoT, intégrer capteurs, cloud et automatisation.",
    outcomes: [
      "Prototyper un système IoT complet",
      "Automatiser des scénarios réels",
      "Réaliser un démonstrateur connecté",
    ],
    prerequisites: ["Bases en électronique", "Notions de code"],
    details: {
      duration: "5 semaines",
      level: "Débutant à intermédiaire",
      format: "Présentiel",
      nextSession: "Non disponible",
      price: "350 000 FCFA",
      location: "Abidjan",
    },
    coverImage: "/Academy_images/IoT & Robotics Lab.webp",
  },
  {
    slug: "hydroponie-intelligente",
    title: "Hydroponie intelligente & data",
    category: "Hydroponie intelligente",
    status: "closed",
    summary:
      "Optimiser la production agricole par les capteurs, l'analyse et l'automatisation.",
    description:
      "Un programme en préparation pour développer des solutions de culture connectée, du pilotage à l'analyse des performances.",
    outcomes: [
      "Analyser un cycle de production",
      "Connecter capteurs et tableaux de bord",
      "Définir un plan d'optimisation",
    ],
    prerequisites: ["Intérêt pour l'agritech"],
    details: {
      duration: "7 semaines",
      level: "Intermédiaire",
      format: "Hybride",
      nextSession: "Non disponible",
      price: "À confirmer",
      location: "Abidjan + en ligne",
    },
    coverImage: "/Academy_images/Hydroponie intelligente & data.jpg",
  },
  {
    slug: "ux-ui-mapping",
    title: "UX/UI Mapping & Design Ops",
    category: "Design & UX",
    status: "closed",
    summary:
      "Structurer l'expérience utilisateur avec une méthode orientée produit.",
    description:
      "Un parcours pour bâtir des interfaces cohérentes, prioriser les besoins et piloter l'UX en équipe.",
    outcomes: [
      "Créer un parcours utilisateur structuré",
      "Concevoir des prototypes avancés",
      "Mettre en place une routine Design Ops",
    ],
    prerequisites: ["Bases en design"],
    details: {
      duration: "4 semaines",
      level: "Intermédiaire",
      format: "Distanciel",
      nextSession: "Non disponible",
      price: "À confirmer",
      location: "En ligne",
    },
    coverImage: "/Academy_images/UXUI Mapping & Design Ops.webp",
  },
  {
    slug: "data-automation-power",
    title: "Data Automation Power",
    category: "Data & automatisation",
    status: "available",
    summary:
      "Construire des pipelines d'automatisation avec dashboards premium.",
    description:
      "Un programme pour automatiser la collecte, la transformation et le reporting des données opérationnelles.",
    outcomes: [
      "Concevoir un pipeline de données fiable",
      "Automatiser des rapports stratégiques",
      "Mettre en place des alertes intelligentes",
    ],
    prerequisites: ["Bases de tableur", "Curiosité data"],
    details: {
      duration: "5 semaines",
      level: "Débutant",
      format: "Hybride",
      nextSession: "Non disponible",
      price: "À confirmer",
      location: "Abidjan + en ligne",
    },
    coverImage: "/Academy_images/Data_Automation_Power.jpg",
  },
  {
    slug: "webinaire-ai-product",
    title: "Webinaire | AI Product Roadmap",
    category: "Webinaire",
    status: "soon",
    summary:
      "Session interactive pour cadrer une roadmap IA produit et éviter les pièges courants.",
    description:
      "Un webinaire stratégique pour identifier les bons cas d'usage IA, structurer une feuille de route et aligner les équipes produit & tech.",
    outcomes: [
      "Définir un cadrage IA réaliste",
      "Évaluer l'impact produit",
      "Prioriser les initiatives IA",
    ],
    prerequisites: ["Curiosité produit", "Notions de base en data"],
    details: {
      duration: "2 heures",
      level: "Tous niveaux",
      format: "En ligne (live)",
      nextSession: "Non disponible",
      price: "Gratuit sur inscription",
      location: "En ligne",
    },
    coverImage:
      "/Academy_images/Webinaire AI Product Roadmap.webp",
  },
  {
    slug: "webinaire-cyber-hygiene",
    title: "Webinaire | Cyber Hygiene Essentials",
    category: "Webinaire",
    status: "soon",
    summary:
      "Les bonnes pratiques de cybersécurité opérationnelle pour les équipes tech et business.",
    description:
      "Un webinaire pratique pour sécuriser les accès, limiter les risques et mettre en place des routines simples.",
    outcomes: [
      "Mettre en place des règles d'accès robustes",
      "Identifier les risques courants",
      "Déployer des habitudes de sécurité",
    ],
    prerequisites: ["Aucun prérequis"],
    details: {
      duration: "1h30",
      level: "Tous niveaux",
      format: "En ligne (live)",
      nextSession: "Non disponible",
      price: "Gratuit sur inscription",
      location: "En ligne",
    },
    coverImage:
      "/Academy_images/Webinaire Cyber Hygiene Essentials.jpg",
  },
  {
    slug: "digital-twin-industrie",
    title: "Digital Twin Industrie",
    category: "Industrie 4.0",
    status: "closed",
    summary:
      "Programme avancé autour des jumeaux numériques pour sites industriels.",
    description:
      "Formation fermée temporairement, avec repositionnement en cours pour 2026.",
    outcomes: [
      "Modéliser un système industriel complexe",
      "Connecter données terrain et simulations",
      "Présenter un cas d'usage opérationnel",
    ],
    prerequisites: ["Base en ingénierie", "Expérience projet"],
    details: {
      duration: "10 semaines",
      level: "Avancé",
      format: "Présentiel",
      nextSession: "Non disponible",
      price: "Sur demande",
      location: "Abidjan",
    },
    coverImage:
      "/Academy_images/Digital Twin Industrie.webp",
    youtubeEmbed: "https://www.youtube.com/embed/GtFyILZ1ICY",
    pdfProgram:
      "/Academy PDF/Digital Twin Industrie.pdf",
  },
];

export const academyRegistrationUrl =
  process.env.NEXT_PUBLIC_ACADEMY_REGISTRATION_URL ?? "";

export const categories = Array.from(
  new Set(trainings.map((training) => training.category))
);

export const getTraining = (slug: string) =>
  trainings.find((training) => training.slug === slug);

