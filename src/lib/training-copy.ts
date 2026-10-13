// Rewrite earlier catalogue copy while preserving new text entered by administrators.
const revisions: Record<string, string> = {
  "Construire des pipelines d'automatisation avec dashboards premium.": "Automatiser la collecte de données et créer des tableaux de bord.",
  "Un programme pour automatiser la collecte, la transformation et le reporting des données opérationnelles.": "Collecte de données, transformation et création de rapports automatiques.",
  "Structurer l'expérience utilisateur avec une méthode orientée produit.": "Concevoir les écrans et les parcours d’une application.",
  "Un parcours pour bâtir des interfaces cohérentes, prioriser les besoins et piloter l'UX en équipe.": "Analyse des besoins, prototypes d’interfaces et organisation du travail de design.",
  "Créer des applications mobiles élégantes avec un pipeline design-to-code.": "Concevoir et développer une application mobile.",
  "Un programme axé sur la création de produits mobiles complets, du prototypage au lancement, avec des ateliers UX/UI.": "Prototypage, développement et publication d’une application mobile.",
  "Maîtrisez Next.js, APIs et déploiements cloud avec un accompagnement orienté production.": "Développer une application web avec Next.js et des API.",
  "Un parcours intensif pour créer des plateformes web robustes, sécurisées et performantes, avec un focus sur l'architecture et l'expérience utilisateur.": "Développement frontend et backend, architecture de l’application et déploiement.",
  "Optimiser la production agricole par les capteurs, l'analyse et l'automatisation.": "Utiliser des capteurs pour suivre les cultures et automatiser l’irrigation.",
  "Un programme en préparation pour développer des solutions de culture connectée, du pilotage à l'analyse des performances.": "Programme en préparation : installation de capteurs, lecture des mesures et automatisation.",
  "Programme avancé autour des jumeaux numériques pour sites industriels.": "Créer un modèle numérique d’une installation industrielle.",
  "Formation fermée temporairement, avec repositionnement en cours pour 2026.": "Les inscriptions à cette formation sont fermées.",
  "Construire des prototypes connectés et piloter des systèmes embarqués.": "Assembler et programmer des prototypes connectés.",
  "Un laboratoire appliqué pour créer des solutions IoT, intégrer capteurs, cloud et automatisation.": "Ateliers de programmation, connexion de capteurs et transmission des données.",
  "Session interactive pour cadrer une roadmap IA produit et éviter les pièges courants.": "Préparer l’intégration de fonctions IA dans un produit.",
  "Un webinaire stratégique pour identifier les bons cas d'usage IA, structurer une feuille de route et aligner les équipes produit & tech.": "Choix des fonctions IA, besoins en données et étapes de développement.",
  "Les bonnes pratiques de cybersécurité opérationnelle pour les équipes tech et business.": "Protéger les comptes, les accès et les données de l’entreprise.",
  "Un webinaire pratique pour sécuriser les accès, limiter les risques et mettre en place des routines simples.": "Gestion des accès, protection des comptes et mesures de sécurité quotidiennes."
};

export function trainingCopy(text: string): string {
  return revisions[text] ?? text;
}
