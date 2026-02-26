"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react"; 
// 1. On importe les données centralisées
import { showcaseProjects } from "@/data/projects.data";

export function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % showcaseProjects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + showcaseProjects.length) % showcaseProjects.length);
  };

  // 2. Les Variants ajustés pour recréer l'effet Peek avec AnimatePresence
  const variants: Variants = {
    // La nouvelle carte arrive (floutée et réduite) depuis le bas (ou le haut)
    enter: (direction: number) => ({
      y: direction > 0 ? "50%" : "-50%", 
      opacity: 0.2,
      scale: 0.85,
      filter: "blur(20px)",
      zIndex: direction > 0 ? 10 : 0, // Gère qui passe par-dessus qui
    }),
    // La carte est au centre, nette et à 100%
    center: {
      y: "0%",
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      zIndex: 20,
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } // La transition ultra-fluide Apple !
    },
    // L'ancienne carte part (devient floutée et réduite)
    exit: (direction: number) => ({
      y: direction > 0 ? "-50%" : "50%", 
      opacity: 0,
      scale: 0.85,
      filter: "blur(15px)",
      zIndex: direction > 0 ? 0 : 10,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
    })
  };

  // 3. On utilise les données de showcaseProjects
  const currentProject = showcaseProjects[currentIndex];
  const nextProj = showcaseProjects[(currentIndex + 1) % showcaseProjects.length];

  return (
    <section id="realisations" className="pt-24 pb-10 relative flex justify-center overflow-visible z-10">
      <div className="container max-w-5xl px-4 md:px-6 relative">
        
        {/* --- LE PROJET SUIVANT FLOU (En dessous) - Ton Design d'origine --- */}
        <div className="absolute -bottom-24 md:-bottom-32 left-1/2 -translate-x-1/2 w-[85%] md:w-[75%] h-[400px] rounded-[32px] opacity-40 blur-xl scale-[0.90] z-0 pointer-events-none transition-all duration-500 bg-white/5 p-2 shadow-2xl border border-white/10">
           <div className="w-full h-full bg-nuru-surface rounded-[24px] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E233A] to-[#13172A]" />
              <div className="relative z-10 text-white/40 font-bold tracking-widest text-sm uppercase font-sans">
                 Mockup {nextProj.clientName}
              </div>
           </div>
        </div>

        {/* --- CARROUSEL PRINCIPAL --- */}
        <div className="relative z-20 w-full min-h-[500px]">
          
          {/* BOUTONS VERTICAUX : Parfaitement centrés dans le gap-24 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2 bg-white/5 border border-white/10 p-2 rounded-full backdrop-blur-xl shadow-2xl">
            <button 
              onClick={prevProject}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-nuru-background hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all group"
            >
              <ChevronUp className="w-6 h-6 mb-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={3} />
            </button>
            <button 
              onClick={nextProject}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-nuru-background hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all group"
            >
              <ChevronDown className="w-6 h-6 mt-0.5 group-hover:translate-y-0.5 transition-transform" strokeWidth={3} />
            </button>
          </div>

          {/* ATTENTION : Le mode "popLayout" permet aux cartes de se croiser (effet Peek) au lieu de s'attendre */}
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              // On garde exactement tes classes
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-stretch relative origin-center"
            >
              
              {/* --- IMAGE GAUCHE --- */}
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-auto rounded-[32px] overflow-hidden bg-white p-2 shadow-2xl border border-white/10">
                <div className="w-full h-full bg-nuru-surface rounded-[24px] relative overflow-hidden group">
                   <Image
                      src={currentProject.gallery[0] || "/assets/placeholder.jpg"}
                      alt={`Mockup du projet ${currentProject.clientName}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority
                   />
                </div>
              </div>

              {/* --- CARTE DROITE --- */}
              <div className="p-8 md:p-12 rounded-[32px] flex flex-col justify-center">
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-nuru-blue to-nuru-primary flex items-center justify-center font-glitz text-white font-bold text-2xl shadow-lg">
                    {/* On utilise la première lettre du client comme Logo dynamique */}
                    {currentProject.clientName.charAt(0)}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide font-glitz">
                    {currentProject.clientName}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {currentProject.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full border border-white/10 bg-[#397BBF] text-xs font-bold uppercase tracking-wider font-sans">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex-grow">
                  <p className="text-nuru-text/70 text-base md:text-lg leading-relaxed mb-10 font-sans">
                    {currentProject.shortDescription}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link 
                    href={`/realisations/${currentProject.slug}`} 
                    className="flex-1 py-3.5 px-6 rounded-2xl border border-white/10 bg-white/5 text-center text-white font-semibold text-sm hover:bg-white/10 transition-all font-sans"
                  >
                    Détails du projet
                  </Link>
                  <a 
                    href={currentProject.liveLink} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-white text-nuru-background text-center font-bold text-sm hover:scale-105 transition-all font-sans shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Website live
                  </a>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Boutons Mobiles (En bas avec Flèches Haut/Bas) */}
          <div className="flex items-center justify-center gap-4 lg:hidden z-30 relative mt-8">
             <button onClick={prevProject} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-nuru-background shadow-xl active:scale-95 transition-transform">
               <ChevronUp className="w-6 h-6 mb-0.5" />
             </button>
             <button onClick={nextProject} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-nuru-background shadow-xl active:scale-95 transition-transform">
               <ChevronDown className="w-6 h-6 mt-0.5" />
             </button>
          </div>

        </div>
      </div>
    </section>
  );
}