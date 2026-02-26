"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { archiveCategories, allProjects } from "@/data/projects.data";

export function ProjectArchives() {
  // L'état qui stocke le filtre actuel (Par défaut : "Tout")
  const [activeCategory, setActiveCategory] = useState("Tout");

  // On filtre dynamiquement les projets
  const filteredProjects = allProjects.filter((project) =>
    activeCategory === "Tout" ? true : project.category === activeCategory
  );

  return (
    <section className="py-24 w-full relative z-20 bg-nuru-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER DE LA SECTION --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl leading-[1.2]"
          >
            Naviguez à travers les archives <br className="hidden md:block"/>
            des projets Nuru Agency.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-nuru-text/70 text-sm md:text-base max-w-lg font-medium"
          >
            Plongez dans notre mer de projets. Filtrez, explorez et découvrez ce que nous créons pour chaque client.
          </motion.p>
        </div>

        {/* --- BARRE DE FILTRES --- */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16">
          {archiveCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-nuru-primary border-nuru-primary text-white shadow-[0_0_20px_rgba(230,12,115,0.4)] scale-105"
                  : "bg-transparent border-white/20 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- GRILLE DE PROJETS (ANIMÉE) --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                className="bg-white rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
              >
                {/* 1. Image du projet (Haut) -> On utilise la première image de la galerie */}
                <div className="relative w-full h-[250px] md:h-[300px] bg-gray-100 overflow-hidden">
                  <Image
                    src={project.gallery[0] || "/assets/placeholder.jpg"}
                    alt={project.clientName}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* 2. Contenu (Bas) */}
                <div className="p-8 flex-1 flex flex-col">
                  
                  {/* Titre & Logo miniature */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-nuru-background rounded-lg flex items-center justify-center shadow-inner">
                      <span className="font-glitz text-nuru-primary font-bold text-sm">N</span>
                    </div>
                    <h3 className="text-xl font-bold text-nuru-background tracking-tight">
                      {project.clientName}
                    </h3>
                  </div>

                  {/* Badges / Tags (Bleus) */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="bg-nuru-blue/10 text-nuru-blue px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description -> On utilise shortDescription */}
                  <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8 flex-1">
                    {project.shortDescription}
                  </p>

                  {/* Boutons (Bleu et Magenta) */}
                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    {/* Lien généré dynamiquement avec le slug */}
                    <Link
                      href={`/realisations/${project.slug}`}
                      className="group flex items-center gap-2 bg-nuru-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all shadow-md"
                    >
                      Détails du projet
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-nuru-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-nuru-primary/90 transition-all shadow-[0_0_15px_rgba(230,12,115,0.3)] hover:shadow-[0_0_25px_rgba(230,12,115,0.5)]"
                    >
                      Visiter le site
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Message si aucun projet ne correspond */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12 text-white/50">
              Aucun projet trouvé dans cette catégorie.
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
}