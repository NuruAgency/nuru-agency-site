"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react"; 
import { portfolioData } from "@/data/portfolio.data";

export function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % portfolioData.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + portfolioData.length) % portfolioData.length);
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 200 : -200, 
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -150 : 150, 
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: { duration: 0.3 }
    })
  };

  const currentProject = portfolioData[currentIndex];
  const nextProj = portfolioData[(currentIndex + 1) % portfolioData.length];

  return (
    <section id="realisations" className="pt-24 pb-10 relative flex justify-center overflow-visible z-10">
      <div className="container max-w-5xl px-4 md:px-6 relative">
        
        {/* --- LE PROJET SUIVANT FLOU (En dessous) --- */}
        <div className="absolute -bottom-24 md:-bottom-32 left-1/2 -translate-x-1/2 w-[85%] md:w-[75%] h-[400px] rounded-[32px] opacity-40 blur-xl scale-[0.90] z-0 pointer-events-none transition-all duration-500 bg-white/5 p-2 shadow-2xl border border-white/10">
           <div className="w-full h-full bg-nuru-surface rounded-[24px] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E233A] to-[#13172A]" />
              <div className="relative z-10 text-white/40 font-bold tracking-widest text-sm uppercase font-sans">
                 Mockup {nextProj.title}
              </div>
           </div>
        </div>

        {/* --- CARROUSEL PRINCIPAL --- */}
        <div className="relative z-20 w-full min-h-[500px]">
          
          {/* BOUTONS VERTICAUX : Parfaitement centrés grâce à l'espace libéré par lg:gap-24 */}
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

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              // CORRECTION ICI 👇 : lg:gap-24 au lieu de gap-8 pour libérer le centre
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-stretch relative"
            >
              
              {/* --- IMAGE GAUCHE --- */}
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-auto rounded-[32px] overflow-hidden bg-white p-2 shadow-2xl border border-white/10">
  <div className="w-full h-full bg-nuru-surface rounded-[24px] relative overflow-hidden group">
     <Image
        src={currentProject.image}
        alt={`Mockup du projet ${currentProject.title}`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        priority
     />
  </div>
</div>

              {/* --- CARTE DROITE --- */}
              <div className="p-8 md:p-12 rounded-[32px] flex flex-col justify-center ">
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-nuru-blue to-nuru-primary flex items-center justify-center font-glitz text-white font-bold text-2xl shadow-lg">
                    {currentProject.logo}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide font-glitz">
                    {currentProject.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {currentProject.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full  border border-white/10 bg-[#397BBF] text-xs font-bold uppercase tracking-wider font-sans">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex-grow">
                  <p className="text-nuru-text/70 text-base md:text-lg leading-relaxed mb-10 font-sans">
                    {currentProject.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Link 
                    href={currentProject.detailsLink} 
                    className="flex-1 py-3.5 px-6 rounded-2xl border border-white/10 bg-white/5 text-center text-white font-semibold text-sm hover:bg-white/10 transition-all font-sans"
                  >
                    Détails du projet
                  </Link>
                  <Link 
                    href={currentProject.liveLink} 
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-white text-nuru-background text-center font-bold text-sm hover:scale-105 transition-all font-sans shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Website live
                  </Link>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Boutons Mobiles (En bas avec Flèches Haut/Bas aussi) */}
          <div className="flex items-center justify-center gap-4  lg:hidden z-30 relative">
             <button onClick={prevProject} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-nuru-background shadow-xl">
               <ChevronUp className="w-6 h-6 mb-0.5" />
             </button>
             <button onClick={nextProject} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-nuru-background shadow-xl">
               <ChevronDown className="w-6 h-6 mt-0.5" />
             </button>
          </div>

        </div>
      </div>
    </section>
  );
}