"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
// On importe showcaseProjects depuis notre fichier de données centralisé
import { showcaseProjects } from "@/data/projects.data";

export function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonctions pour naviguer (avec boucle infinie)
  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseProjects.length) % showcaseProjects.length);
  };

  // Les variants d'animation pour Framer Motion
  const cardVariants = {
    active: {
      x: "0%",
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 20,
    },
    next: {
      x: "105%", // Décale la carte juste à l'extérieur de la première
      scale: 0.85,
      opacity: 0.6,
      filter: "blur(6px)",
      zIndex: 10,
    },
    prev: {
      x: "-105%", // Fait disparaître la carte précédente par la gauche
      scale: 0.85,
      opacity: 0,
      filter: "blur(6px)",
      zIndex: 0,
    },
    hidden: {
      x: "200%",
      scale: 0.8,
      opacity: 0,
      zIndex: -1,
    },
  };

  return (
    <section className="py-24 w-full overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* --- HEADER DE LA SECTION --- */}
        <div className="mb-12">
          {/* Titre style "Badge + Texte" comme sur la maquette */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/10 border border-white/10 px-5 py-2 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-glitz tracking-widest text-white tracking-wide">Projets</h2>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white/60 tracking-wide">Showcase.</h2>
          </div>

          <p className="text-nuru-text/70 text-sm md:text-base max-w-xl mb-8 font-medium leading-relaxed">
            Une sélection de nos projets les plus représentatifs en parlant de SaaS Tech ou website créatif, chacun avec leur univers propre.
          </p>

          {/* Boutons de navigation (Flèches) */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevProject}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-nuru-background hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextProject}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-nuru-background hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* --- CARROUSEL DES PROJETS --- */}
        {/* On fixe une hauteur pour que les cartes en position absolute ne fassent pas s'effondrer le conteneur */}
        <div className="relative h-[650px] md:h-[450px] w-full mt-12">
          {showcaseProjects.map((project, index) => {
            // Logique pour déterminer la position de chaque carte
            const isActive = index === currentIndex;
            const isNext = index === (currentIndex + 1) % showcaseProjects.length;
            const isPrev = index === (currentIndex - 1 + showcaseProjects.length) % showcaseProjects.length;

            let position = "hidden";
            if (isActive) position = "active";
            else if (isNext) position = "next";
            else if (isPrev) position = "prev";

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial={false} // Empêche l'animation au tout premier chargement
                animate={position}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} // Une courbe de Bézier ultra douce
                // La carte fait 85% de la largeur pour laisser de la place à la suivante sur le côté droit
                className="absolute top-0 left-0 w-full md:w-[85%] h-full bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-2xl origin-left"
              >

                {/* Contenu gauche (Texte) */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    {/* Faux logo du client */}
                    <div className="w-10 h-10 bg-nuru-background rounded-xl flex items-center justify-center">

                      <img src="/assets/icon.png" alt="icon" />
                    </div>
                    <div>
                      <h3 className="text-xl font-glitz tracking-widest text-nuru-background leading-none">{project.clientName}</h3>
                      {/* Utilisation de category au lieu de projectType */}
                      <p className="text-black text-xs font-semibold tracking-widest mt-1 uppercase">{project.category}</p>
                    </div>
                  </div>

                  {/* Badge (Remplacé par le premier tag de ton tableau tags) */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="bg-blue-500 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full w-max mb-6 tracking-wide shadow-sm">
                      {project.tags[0]}
                    </div>
                  )}

                  {/* Description (Utilisation de shortDescription) */}
                  <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8 max-w-md">
                    {project.shortDescription}
                  </p>

                  {/* Lien dynamique vers la page de détails */}
                  <Link
                    href={`/realisations/${project.slug}`}
                    className="inline-flex items-center gap-2 bg-nuru-blue text-white px-6 py-3 rounded-full w-max text-sm font-semibold hover:bg-blue-600 transition-colors group shadow-md"
                  >
                    Détails du projet
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Contenu droit (Image principale de la galerie) */}
                <div className="flex-1 relative w-full h-[250px] md:h-full bg-gray-100 rounded-[24px] overflow-hidden">
                  <Image
                    src={project.gallery[0] || "/assets/placeholder.jpg"}
                    alt={project.clientName}
                    fill
                    className="object-cover"
                  />
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}