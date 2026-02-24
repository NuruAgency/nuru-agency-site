"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, PlaySquare, Star } from "lucide-react";
import { heroData } from "@/data/hero.data";
import { cn } from "@/lib/utils";
import LiquidEther from "@/components/background/LiquidEther";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

export function HeroSection() {
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % heroData.reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-70">
        <LiquidEther 
          // J'utilise les couleurs de ta charte : Primary (Magenta), Blue, Purple
          colors={['#E60C73', '#397BBF', '#4E4595']} 
          mouseForce={30} // Force de l'interaction avec la souris
          cursorSize={120} // Taille du curseur fluide
          autoSpeed={0.8} // Vitesse de l'animation automatique
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 px-4 md:px-6 text-center max-w-5xl mx-auto flex flex-col items-center"
      >
        
        {/*  TITRE PRINCIPAL   */}
        <motion.h1 variants={itemVariants} className="font-glitz tracking-widest text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold text-white mb-10 leading-[1.3] md:leading-[1.2]">
          {heroData.title.start}{" "}
          
          {/* Mot avec le badge incrusté (Overlap prononcé) */}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10">{heroData.title.highlight}</span>
            
            <span className="absolute left-1/2 -translate-x-1/2 top-[65%] md:top-[60%] bg-nuru-primary text-white text-[8px] md:text-[10px] font-sans font-extrabold tracking-[0.2em] px-3 py-1 rounded-full uppercase z-20 shadow-[0_4px_20px_rgba(230,12,115,0.6)] border border-nuru-primary/50">
              {heroData.title.badge}
            </span>
          </span>
          
          <br className="hidden md:block" /> {heroData.title.end}
        </motion.h1>

        {/*  DESCRIPTION  */}
        <motion.p variants={itemVariants} className="text-sm md:text-base text-nuru-text/60 max-w-3xl mx-auto mb-10 leading-relaxed font-sans">
          {heroData.description}
        </motion.p>

        {/*  BOUTONS (CTA)  */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {/* Bouton Primaire */}
          <Link 
            href="/contact"
            className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-nuru-primary px-8 text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(230,12,115,0.4)]"
          >
            <span className=" font-glitz tracking-widest text-sm tracking-wide">{heroData.cta.primary}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          {/* Bouton Secondaire */}
          <Link 
            href="#realisations"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-white backdrop-blur-md transition-all hover:bg-white/10"
          >
            <PlaySquare className="w-4 h-4 text-white/80" />
            <span className="font-sans font-medium text-sm tracking-wide">{heroData.cta.secondary}</span>
          </Link>
        </motion.div>

        {/* AVIS CLIENTS DYNAMIQUES  */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-16 min-h-[160px] w-full max-w-xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full"
            >
              {/* Le texte de l'avis */}
              <p className="text-nuru-text/80 font-mono tracking-tight text-sm mb-6 whitespace-pre-line text-center">
                {heroData.reviews[currentReview].text}
              </p>
              
              {/* L'auteur et les étoiles */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-nuru-surface border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-lg overflow-hidden">
                  
                  {heroData.reviews[currentReview].avatar}
                </div>
                <span className="text-sm font-bold text-white">
                  {heroData.reviews[currentReview].author}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(heroData.reviews[currentReview].stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Le Badge  */}
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-nuru-surface/50 backdrop-blur-md">
            <span className="text-xs font-semibold text-white tracking-wide">Client reviews</span>
            <div className="flex items-center gap-1 bg-nuru-primary px-2.5 py-0.5 rounded-full">
               <Star className="w-3 h-3 fill-white text-white" />
               <span className="text-[11px] font-bold text-white">{heroData.overallRating}</span>
            </div>
          </div>
        </motion.div>

        {/* --- SOCIAL PROOF --- */}
        <motion.div variants={itemVariants} className="border-t border-white/5 pt-12 w-full">
          <p className="text-xs text-nuru-text/60 mb-8 font-medium tracking-widest font-sans">
            {heroData.socialProof.text}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
             {heroData.socialProof.logos.map((logo, i) => (
                <div key={i} className="flex items-center gap-2 cursor-default">
                    
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-nuru-blue to-nuru-primary flex items-center justify-center font-bold text-white text-[10px]">N</div>
                    <span className="font-glitz tracking-widest text-lg text-white font-bold">{logo}</span>
                </div>
             ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}