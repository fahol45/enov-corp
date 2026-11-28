export type ExpertiseKey = "software" | "ai" | "systems";
export const navigation = [
  { href: "/", fr: "Accueil", en: "Home" },
  { href: "/expertises", fr: "Expertises", en: "Expertise" },
  { href: "/portfolio", fr: "Solutions & réalisations", en: "Solutions & work" },
  { href: "/innovation", fr: "Innovation", en: "Innovation" },
  { href: "/propos", fr: "À propos", en: "About" },
  { href: "/academy", fr: "ENOV Academy", en: "ENOV Academy" },
  { href: "/contact", fr: "Contact", en: "Contact" },
];
export const expertise = {
  fr: [
    { key: "software" as const, href: "/web-mobile", name: "Ingénierie logicielle", label: "Digital Engineering", title: "Des logiciels qui suivent votre façon de travailler.", text: "Applications web et mobiles, plateformes métier, SaaS et intégrations API. Nous relions vos outils et vos opérations.", tags: ["Web & mobile", "Plateformes métier", "Intégrations API"] },
    { key: "ai" as const, href: "/intelligence-artificielle", name: "IA & automatisation", label: "AI & Intelligent Automation", title: "Moins de tâches répétitives. Des données mieux exploitées.", text: "Recherche dans vos documents, assistants métier et automatisation. Nous partons d’un usage précis et vérifions ce que l’IA peut réellement apporter.", tags: ["Assistants métier", "Traitement des données", "Automatisation"] },
    { key: "systems" as const, href: "/systemes-connectes", name: "Systèmes connectés", label: "Connected Systems & Robotics", title: "Relier les équipements, les données et les équipes.", text: "Capteurs, supervision et intégration IoT. Les projets embarqués et robotiques font l’objet d’une étude de faisabilité avant tout engagement.", tags: ["IoT & capteurs", "Supervision", "Prototypage"] },
  ],
  en: [
    { key: "software" as const, href: "/web-mobile", name: "Software engineering", label: "Digital Engineering", title: "Software built around how you work.", text: "Web and mobile apps, business platforms, SaaS and API integrations. We connect your tools and operations.", tags: ["Web & mobile", "Business platforms", "API integrations"] },
    { key: "ai" as const, href: "/intelligence-artificielle", name: "AI & automation", label: "AI & Intelligent Automation", title: "Fewer repetitive tasks. Better use of your data.", text: "Document search, business assistants and automation. We start with a specific use and test what AI can actually contribute.", tags: ["Business assistants", "Data processing", "Automation"] },
    { key: "systems" as const, href: "/systemes-connectes", name: "Connected systems", label: "Connected Systems & Robotics", title: "Connecting equipment, data and teams.", text: "Sensors, monitoring and IoT integration. Embedded and robotics projects begin with a feasibility study before any commitment.", tags: ["IoT & sensors", "Monitoring", "Prototyping"] },
  ],
};
export const deliverySteps = {
  fr: [
    { title: "Comprendre", text: "Identifier les utilisateurs, le problème et les contraintes du terrain." },
    { title: "Cadrer", text: "Définir le périmètre, les livrables et les critères de réussite." },
    { title: "Concevoir", text: "Valider les parcours, l’architecture et les choix techniques." },
    { title: "Développer & intégrer", text: "Réaliser la solution et la relier à vos outils existants." },
    { title: "Tester & accompagner", text: "Vérifier le fonctionnement et préparer la prise en main." },
  ],
  en: [
    { title: "Understand", text: "Identify users, the problem and operational constraints." },
    { title: "Define", text: "Agree on scope, deliverables and success criteria." },
    { title: "Design", text: "Validate workflows, architecture and technical choices." },
    { title: "Build & integrate", text: "Develop the solution and connect it to existing tools." },
    { title: "Test & support", text: "Verify operation and prepare users for handover." },
  ],
};
