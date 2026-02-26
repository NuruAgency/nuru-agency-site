"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export function PortfolioCTA() {
  return (
    <section className="py-24 px-4 md:px-8 w-full relative z-20 bg-nuru-background flex justify-center">
      
      {/* --- LE BLOC MAGENTA --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="w-full max-w-5xl bg-nuru-primary rounded-[40px] p-8 md:p-16 lg:p-20 flex flex-col items-center text-center shadow-[0_20px_60px_rgba(230,12,115,0.3)] relative overflow-hidden"
      >
        {/* Cercles décoratifs pour donner un peu de relief au fond magenta */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Titre Principal */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-glitz tracking-widest text-white mb-6 leading-[1.15] max-w-4xl tracking-tight"
          >
            Des architectures natives époustouflantes pour des visions uniques.
          </motion.h2>

          {/* Paragraphe descriptif */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-sm md:text-base font-medium max-w-2xl mb-12 leading-relaxed"
          >
            Nous aidons les entreprises à générer de nouveaux revenus et optimiser leurs processus grâce au design sur-mesure, au code natif et à la puissance de l'IA.
          </motion.p>

          {/* Ligne d'accroche */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white font-glitz tracking-widest text-sm md:text-base mb-6"
          >
            - Vous avez un projet en tête, nous l'exécutons -
          </motion.p>

          {/* Preuve sociale (Avis client) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 overflow-hidden flex-shrink-0 relative">
                 {/* Remplace par une vraie photo si tu en as une */}
                 <Image src="/assets/avatar-placeholder.jpg" alt="Client" fill className="object-cover" />
              </div>
              <span className="text-white font-bold text-sm tracking-wide">Mohamed S.</span>
            </div>
            
            <div className="w-px h-6 bg-white/30" /> {/* Séparateur vertical */}

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-[#FFD700] text-[#FFD700] drop-shadow-sm" />
              ))}
            </div>
          </motion.div>

          {/* Bouton d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/contact"
              className="group flex items-center gap-3 bg-nuru-blue text-white px-8 py-4 rounded-full text-sm md:text-base font-bold transition-all hover:bg-blue-600 hover:scale-105 shadow-xl hover:shadow-[0_0_30px_rgba(57,123,191,0.6)]"
            >
              C'est parti !
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}