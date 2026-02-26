"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { portfolioHeroData } from "@/data/realisations.data";

export function PortfolioHero() {
  // On duplique le tableau pour créer un effet de boucle infinie (Marquee) sans coupure
  const duplicatedLogos = [...portfolioHeroData.clientLogos, ...portfolioHeroData.clientLogos];

  return (
    <section className="relative pt-40 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* 1. ICÔNES FLOTTANTES (Effet de profondeur en haut) */}
      <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 relative z-10">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -15, 0], // Mouvement de haut en bas
              rotate: [0, index % 2 === 0 ? 5 : -5, 0] // Légère rotation
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.4 // Décalage pour un effet de vague
            }}
            // L'icône du centre est plus nette et plus grande, les autres sont floutées
            className={`flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl ${
              index === 2 
                ? "w-20 h-20 opacity-100 shadow-[0_0_30px_rgba(230,12,115,0.4)]" 
                : "w-16 h-16 opacity-60 blur-[3px] scale-90"
            }`}
          >
            {/* Remplace par l'icône de ton logo (ex: le "N" de Nuru) */}
            <div className="text-3xl font-glitz font-bold bg-gradient-to-br from-nuru-blue to-nuru-primary bg-clip-text text-transparent">
              <Image
                          src="/icon.png" 
                          alt="Logo Nuru Agency"
                          width={120} 
                          height={32} 
                        />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. TEXTES ET TITRE PRINCIPAL */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        
        {/* Titre [ Made by Nuru ] */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex items-center justify-center gap-4 text-4xl md:text-5xl lg:text-7xl font-bold mb-8"
        >
          <span className="text-nuru-primary font-mono font-light text-5xl md:text-6xl lg:text-8xl">[</span>
          <span className="text-white tracking-tight font-glitz tracking-widest">Made by</span>
          <div className="mt-1 md:mt-3">
            <Image 
              src="/assets/logo.svg" 
              alt="Nuru Agency" 
              width={200} 
              height={50} 
              className="w-[120px] md:w-[180px] lg:w-[220px] object-contain"
            />
          </div>
          <span className="text-nuru-primary font-mono font-light text-5xl md:text-6xl lg:text-8xl">]</span>
        </motion.div>

        {/* Sous-titre */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-nuru-text/70 text-sm md:text-base font-medium max-w-lg mb-10"
        >
          {portfolioHeroData.subtitle}
        </motion.p>

        {/* Bouton / Barre de recherche (Comme sur la maquette) */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group flex items-center gap-3 bg-nuru-surface/50 border border-white/10 rounded-full pl-2 pr-6 py-2 hover:bg-white/10 transition-all hover:border-white/20"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110">
            <Search className="w-4 h-4 text-white/80" />
          </div>
          <span className="text-sm font-medium text-white/80 tracking-wide">
            {portfolioHeroData.ctaText}
          </span>
        </motion.button>
      </div>

      {/* 3. GRILLE DE LOGOS DÉFILANTE (MARQUEE) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full mt-20 relative"
      >
        {/* Masques de dégradé sur les bords pour fondre les logos */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-nuru-background to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-nuru-background to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-16 items-center px-4 md:px-8"
            animate={{ x: ["0%", "-50%"] }} // Décale jusqu'à la moitié (où les clones commencent)
            transition={{
              ease: "linear",
              duration: 25, // Ajuste la vitesse de défilement ici
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                <Image 
                  src={logo.src} 
                  alt={logo.name} 
                  width={140} 
                  height={40} 
                  className="w-[100px] md:w-[140px] h-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}