"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Bloquer le défilement de la page pendant le chargement
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    
    // 2. Animer le compteur de 0 à 100 de manière organique
    const interval = setInterval(() => {
      // Ajoute une valeur aléatoire entre 5 et 15 pour un effet plus naturel qu'un simple +1
      currentProgress += Math.floor(Math.random() * 15) + 5; 
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        
        // Petite pause de 500ms quand il arrive à 100% avant de lancer l'animation de sortie
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "auto"; // Réactiver le scroll
        }, 500); 
      } else {
        setProgress(currentProgress);
      }
    }, 100); // Vitesse globale du compteur (plus c'est bas, plus c'est rapide)

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    // AnimatePresence permet d'animer la disparition (exit) du composant
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // État initial (visible)
          initial={{ y: 0 }}
          // Animation de sortie (Glisse vers le haut)
          exit={{ y: "-100%" }}
          // La courbe [0.76, 0, 0.24, 1] est la fameuse courbe "Apple/Awwwards" ultra fluide
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          // z-[9999] s'assure qu'il passe par-dessus la navbar et tout le reste
          className="fixed inset-0 z-[9999] bg-nuru-primary flex flex-col items-center justify-center text-white overflow-hidden"
        >
          {/* --- L'ICÔNE AU MILIEU --- */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-24 h-24 md:w-32 md:h-32"
          >
            {/* Si tu as une image SVG spéciale pour l'icône, mets-la ici. 
                Sinon, on recrée ton "N" stylisé en CSS */}
            <div className="w-full h-full bg-nuru-background rounded-3xl flex items-center justify-center shadow-2xl">
                          <span className="font-glitz text-nuru-primary font-bold text-6xl md:text-8xl">
                               <Image
            src="/assets/logo.svg" 
            alt="Logo Nuru Agency"
            width={90} 
            height={70} 

          />
              </span>
            </div>
          </motion.div>

          {/* --- LE COMPTEUR --- */}
          {/* Positionné en bas à droite (très tendance) ou au centre selon tes goûts. Ici je l'ai mis en bas à droite */}
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 overflow-hidden">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-6xl md:text-8xl lg:text-[120px] font-glitz font-bold tracking-tighter leading-none"
            >
              {progress}%
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
