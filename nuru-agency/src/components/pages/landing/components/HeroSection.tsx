"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { heroData } from "@/data/hero.data";
import { cn } from "@/lib/utils";

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
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden">
      

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 px-4 md:px-6 text-center max-w-5xl mx-auto"
      >
        
        {/* --- BADGE --- */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-nuru-primary/30 bg-nuru-primary/10 text-nuru-primary text-sm font-semibold tracking-wide backdrop-blur-md shadow-[0_0_15px_rgba(230,12,115,0.2)]">
            ✨ {heroData.badge}
          </span>
        </motion.div>

        {/* --- TITRE PRINCIPAL --- */}
        <motion.h1 variants={itemVariants} className="font-glitz tracking-widest text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          {heroData.title.start}{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-nuru-primary via-purple-400 to-nuru-blue">
            {heroData.title.highlight}
            {/* Soulignement créatif */}
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-nuru-primary opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
          <br className="hidden md:block" /> {heroData.title.end}
        </motion.h1>

        {/* --- DESCRIPTION --- */}
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-nuru-text/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {heroData.description}
        </motion.p>

        {/* --- BOUTONS (CTA) --- */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          {/* Bouton Primaire (Magenta) */}
          <Link 
            href="/contact"
            className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-nuru-primary px-8 font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(230,12,115,0.5)] focus:outline-none focus:ring-2 focus:ring-nuru-primary focus:ring-offset-2 focus:ring-offset-nuru-background"
          >
            <span>{heroData.cta.primary}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Bouton Secondaire (Glassmorphism) */}
          <Link 
            href="#realisations"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
          >
            <PlayCircle className="w-4 h-4 text-nuru-blue" />
            <span>{heroData.cta.secondary}</span>
          </Link>
        </motion.div>

        {/* --- SOCIAL PROOF --- */}
        <motion.div variants={itemVariants} className="border-t border-white/5 pt-10">
          <p className="text-sm text-nuru-text/50 mb-6 font-medium uppercase tracking-wider">
            {heroData.socialProof.text}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
             {/* Remplacer par tes vrais SVG de logos */}
             {heroData.socialProof.logos.map((logo, i) => (
                <div key={i} className="text-xl font-bold text-white/40 hover:text-white transition-colors cursor-default">
                    {logo}
                </div>
             ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}