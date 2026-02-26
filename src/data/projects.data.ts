// export const showcaseProjects = [
//   {
//     id: 1,
//     clientName: "NURU AGENCY",
//     projectType: "MULTI-PAGES",
//     dateBadge: "Projet ajouté en Fév 2026",
//     description: "Une sélection de nos projets les plus représentatifs en parlant de SaaS Tech ou website créatif, chacun avec leur univers propre.",
//     image: "/assets/nuruagency.png", // Pense à mettre une vraie image dans ton dossier public/assets
//     link: "#"
//   },
//   {
//     id: 2,
//     clientName: "E-COMMERCE PRO",
//     projectType: "BOUTIQUE EN LIGNE",
//     dateBadge: "Projet ajouté en Janvier 2026",
//     description: "Une plateforme de vente en ligne ultra-rapide optimisée pour la conversion et l'expérience utilisateur avec un design épuré.",
//     image: "/assets/showcase-2.jpg",
//     link: "#"
//   },
//   {
//     id: 3,
//     clientName: "DASHBOARD SAAS",
//     projectType: "APPLICATION WEB",
//     dateBadge: "Projet ajouté en Décembre 2025",
//     description: "Interface d'administration complexe avec visualisation de données en temps réel et gestion des utilisateurs avancée.",
//     image: "/assets/showcase-3.jpg",
//     link: "#"
//   }
// ];

// // 1. Les catégories exactes de ta maquette
// export const archiveCategories = ["Tout", "Agence", "SaaS", "Application", "Portfolio"];

// // 2. Les projets d'archives
// export const archiveProjects = [
//   {
//     id: 1,
//     clientName: "NURU AGENCY",
//     category: "Agence", // Doit correspondre à l'une des catégories ci-dessus
//     tags: ["React", "Tailwind", "Framer"], // Les petits badges bleus
//     description: "Une sélection de nos projets les plus représentatifs en parlant de SaaS Tech ou website créatif, chacun avec leur univers propre.",
//     image: "/assets/archive-1.jpg", // Mets tes images dans public/assets/
//     detailsLink: "#",
//     liveLink: "#"
//   },
//   {
//     id: 2,
//     clientName: "FINTECH DASHBOARD",
//     category: "SaaS",
//     tags: ["Vue.js", "Node.js", "API"],
//     description: "Interface d'administration complexe avec visualisation de données en temps réel et gestion des utilisateurs avancée.",
//     image: "/assets/archive-2.jpg",
//     detailsLink: "#",
//     liveLink: "#"
//   },
//   {
//     id: 3,
//     clientName: "E-COMMERCE APP",
//     category: "Application",
//     tags: ["React Native", "Stripe", "UX"],
//     description: "Application mobile de e-commerce fluide avec paiement intégré et suivi de commande en temps réel pour vos clients.",
//     image: "/assets/archive-3.jpg",
//     detailsLink: "#",
//     liveLink: "#"
//   },
//   {
//     id: 4,
//     clientName: "CREATIVE STUDIO",
//     category: "Portfolio",
//     tags: ["Three.js", "WebGL", "GSAP"],
//     description: "Un portfolio immersif 3D pour un studio de design avec des transitions webGL époustouflantes et une direction artistique pointue.",
//     image: "/assets/archive-4.jpg",
//     detailsLink: "#",
//     liveLink: "#"
//   }
// ];

// src/data/projects.data.ts

export const archiveCategories = ["Tout", "Agence", "SaaS", "Application", "Portfolio"];

export const allProjects = [
  {
    id: 1,
    slug: "nuru-agency",
    clientName: "Nuru Agency",
    category: "Agence",
    tags: ["React", "Tailwind", "Framer Motion"],
    shortDescription: "Une sélection de nos projets les plus représentatifs en parlant de SaaS Tech ou website créatif...",
    fullDescription: "Nuru Agency est une agence web innovante qui repousse les limites de la création digitale. Notre objectif était de concevoir notre propre plateforme pour démontrer notre savoir-faire technique et notre direction artistique.",
    details: {
      context: "Pour Nuru Agency, le site n'est pas un détail, c'est le cœur du positionnement. L'objectif : une landing page qui incarne l'univers 'premium' du studio et renforce la valeur perçue dès le premier regard. Loin de l'image d'une page de vente classique.",
      solution: "On a donc poussé chaque détail pour coller parfaitement à l'univers code du projet. Le design garantit un parti pris résolument assumé, type 'interface' et un mouvement pensé pour faire vivre la même expérience peu importe l'appareil.\n\n- Direction artistique sombre et audacieuse\n- Micro-interactions 'smooth'\n- Gestion des animations en scroll sur mesure"
    },
    team: [
      { name: "Benjamin Trazie", role: "Founder & Lead Full Stack JS", image: "/assets/benjamin.jpg" },
      { name: "Mohamed S.", role: "UI/UX Designer", image: "/assets/mohamed.jpg" }
    ],
    gallery: [
      "/assets/nuruagency.png",
      "/assets/nuruagency.png",
      "/assets/nuruagency.png"
    ],
    liveLink: "https://nuruagency.com"
  },
  {
    id: 2,
    slug: "finflow-analytics-saas",
    clientName: "FinFlow Analytics",
    category: "SaaS",
    tags: ["NestJS", "Prisma", "Docker", "PostgreSQL"],
    shortDescription: "Un tableau de bord financier ultra-rapide traitant des milliers de transactions en temps réel.",
    fullDescription: "FinFlow avait besoin d'une refonte complète de son architecture backend pour supporter une charge utilisateur croissante. Nous avons conçu une application SaaS robuste capable de traiter des flux financiers complexes tout en gardant une interface claire et réactive.",
    details: {
      context: "Le client souffrait de lenteurs extrêmes sur son ancien système PHP. L'enjeu était double : moderniser l'infrastructure pour la rendre scalable et concevoir une interface de Data Visualization (graphiques, tableaux) fluide pour les analystes financiers.",
      solution: "Nous avons opté pour une architecture micro-services conteneurisée.\n\n- Backend robuste avec NestJS et Prisma pour des requêtes optimisées.\n- Conteneurisation complète via Docker pour un déploiement CI/CD sans faille.\n- Interface utilisateur pensée pour la lisibilité des données complexes."
    },
    team: [
      { name: "Benjamin Trazie", role: "Lead Full Stack Developer", image: "/assets/benjamin.jpg" }
    ],
    gallery: [
      "/assets/showcase-2.jpg",
      "/assets/archive-3.jpg",
      "/assets/archive-4.jpg"
    ],
    liveLink: "https://finflow.example.com"
  },
  {
    id: 3,
    slug: "autoscale-workflow",
    clientName: "AutoScale Corp",
    category: "Application",
    tags: ["n8n", "Node.js", "API", "Automatisation"],
    shortDescription: "Automatisation de 100% des processus métier d'une entreprise de logistique via n8n.",
    fullDescription: "AutoScale perdait des centaines d'heures par mois dans des tâches administratives répétitives. Nous avons audité leurs processus pour créer un écosystème d'automatisations interconnectant leurs CRM, ERP et outils de communication.",
    details: {
      context: "La synchronisation manuelle des données entre Shopify, Salesforce et la facturation générait des erreurs humaines coûteuses. Le défi était de centraliser ces flux sans perturber le travail quotidien des équipes.",
      solution: "Déploiement d'une instance n8n personnalisée hébergée sur le cloud du client.\n\n- Création de workflows complexes (plus de 50 nœuds) pour le traitement des commandes.\n- Développement de webhooks sur-mesure en Node.js pour combler les manques des API existantes.\n- Réduction du temps de traitement manuel de 95%."
    },
    team: [
      { name: "Benjamin Trazie", role: "Automation Expert & Developer", image: "/assets/benjamin.jpg" }
    ],
    gallery: [
      "/assets/showcase-3.jpg",
      "/assets/archive-5.jpg"
    ],
    liveLink: "https://autoscale.example.com"
  },
  {
    id: 4,
    slug: "lumina-ecommerce",
    clientName: "Lumina Paris",
    category: "Agence",
    tags: ["Next.js", "Stripe", "Zustand"],
    shortDescription: "Boutique en ligne premium pour une marque de bijoux de luxe avec expérience d'achat fluide.",
    fullDescription: "Création d'une plateforme e-commerce headless pour Lumina Paris. Le but était de s'éloigner des templates classiques de Shopify pour offrir une expérience sur-mesure, rapide, et hautement esthétique qui reflète le luxe de leurs produits.",
    details: {
      context: "Le taux de rebond sur mobile était trop élevé. Lumina souhaitait une refonte totale axée sur le 'Mobile First', avec des transitions élégantes entre les pages de produits et un tunnel d'achat sans friction.",
      solution: "Utilisation de l'App Router de Next.js pour des performances optimales (SSR/SSG).\n\n- Intégration de Stripe pour des paiements sécurisés et rapides en 1 clic.\n- Panier d'achat global géré avec Zustand pour une réactivité instantanée.\n- Score Lighthouse de 98+ sur les performances."
    },
    team: [
      { name: "Benjamin Trazie", role: "Full Stack JS", image: "/assets/benjamin.jpg" },
      { name: "Mohamed S.", role: "Art Director", image: "/assets/mohamed.jpg" }
    ],
    gallery: [
      "/assets/archive-6.jpg",
      "/assets/archive-7.jpg"
    ],
    liveLink: "https://lumina.example.com"
  },
  {
    id: 5,
    slug: "archviz-studio",
    clientName: "ArchViz Studio",
    category: "Portfolio",
    tags: ["Three.js", "WebGL", "GSAP"],
    shortDescription: "Portfolio immersif en 3D pour un cabinet d'architecture d'intérieur.",
    fullDescription: "Pour ce cabinet d'architecture, des photos ne suffisaient pas. Nous avons développé une expérience webGL immersive où les visiteurs peuvent naviguer virtuellement dans les rendus 3D des projets avant même de faire défiler la page.",
    details: {
      context: "Le client voulait un effet 'Wahou' immédiat. Le défi technique était de charger des modèles 3D lourds (.gltf) sans impacter les temps de chargement du site, tout en gardant une fluidité de 60fps sur les téléphones portables.",
      solution: "Création d'un canvas Three.js superposé au DOM HTML.\n\n- Optimisation drastique des modèles 3D (compression Draco).\n- Animations de scroll synchronisées avec la caméra 3D via GSAP.\n- Typographie cinétique et transitions de pages fluides."
    },
    team: [
      { name: "Benjamin Trazie", role: "Creative Developer", image: "/assets/benjamin.jpg" }
    ],
    gallery: [
      "/assets/showcase-1.jpg",
      "/assets/archive-2.jpg",
      "/assets/archive-4.jpg"
    ],
    liveLink: "https://archviz.example.com"
  },
  {
    id: 6,
    slug: "mediconnect-app",
    clientName: "MediConnect",
    category: "Application",
    tags: ["React Native", "TypeScript", "NestJS"],
    shortDescription: "Application mobile de téléconsultation et de prise de rendez-vous médicaux.",
    fullDescription: "Développement d'une application mobile cross-platform (iOS et Android) permettant aux patients de gérer leurs dossiers médicaux, prendre des rendez-vous et effectuer des consultations vidéo sécurisées.",
    details: {
      context: "La sécurité des données et la fiabilité des appels vidéo étaient les priorités absolues. L'interface devait également être extrêmement accessible pour un public de tout âge.",
      solution: "Une stack Full JS robuste de bout en bout.\n\n- Application front-end en React Native pour un code source unique.\n- Backend API en NestJS couplé à une base de données chiffrée.\n- Intégration de WebRTC pour les consultations vidéo en direct."
    },
    team: [
      { name: "Benjamin Trazie", role: "Lead Full Stack JS", image: "/assets/benjamin.jpg" },
      { name: "Mohamed S.", role: "Product Designer", image: "/assets/mohamed.jpg" }
    ],
    gallery: [
      "/assets/archive-1.jpg",
      "/assets/archive-5.jpg"
    ],
    liveLink: "https://mediconnect.example.com"
  }
];

// On exporte aussi les variables spécifiques pour la page d'accueil / showcase si besoin
export const showcaseProjects = allProjects.slice(0, 3);
export const archiveProjects = allProjects;