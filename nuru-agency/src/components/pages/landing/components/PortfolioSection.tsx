"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function PortfolioSection() {
  return (
    <section id="realisations" className="py-20 relative flex justify-center">
      <div className="container max-w-5xl px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* IMAGE GAUCHE */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden glass-card p-2">
            <div className="w-full h-full bg-nuru-surface rounded-2xl relative overflow-hidden">
               {/* Remplace le src par ton image de mockup */}
               <div className="absolute inset-0 bg-gradient-to-br from-nuru-blue/20 to-nuru-purple/20" />
               <div className="flex items-center justify-center h-full text-nuru-text/30">
                  Image du Projet
               </div>
            </div>
          </div>

          {/* CARTE DROITE */}
          <div className="glass-nuru p-8 md:p-10 rounded-3xl flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nuru-blue to-nuru-primary flex items-center justify-center font-bold text-xl">N</div>
              <h3 className="text-3xl font-bold">Nuru Agency</h3>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-nuru-blue/20 border border-nuru-blue/30 text-nuru-blue text-sm font-semibold">Multi-page</span>
              <span className="px-4 py-1.5 rounded-full bg-nuru-blue/20 border border-nuru-blue/30 text-nuru-blue text-sm font-semibold">InfoProduit</span>
              <span className="px-4 py-1.5 rounded-full bg-nuru-blue/20 border border-nuru-blue/30 text-nuru-blue text-sm font-semibold">Animé</span>
            </div>

            <p className="text-nuru-text/80 text-lg leading-relaxed mb-10">
              Ils ont choisi l'excellence technique pour redéfinir leurs standards.
            </p>

            <div className="flex gap-4">
              <Link href="#" className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-center font-medium hover:bg-white/10 transition-colors">
                Détails du projet
              </Link>
              <Link href="#" className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-center font-medium hover:bg-white/10 transition-colors">
                Website live
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}