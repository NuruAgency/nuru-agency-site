"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Layout, MonitorPlay, Sparkles, ArrowUpRight } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const pillars = [
  {
    title: "Native",
    desc: "Nous construisons des solutions robustes, optimisées et conçues sur-mesure pour la performance.",
    bg: "bg-nuru-primary",
    text: "text-white",
    icon: Cpu
  },
  {
    title: "UI-UX",
    desc: "Une expérience utilisateur fluide et une interface esthétique pensée pour maximiser vos conversions.",
    bg: "bg-nuru-purple",
    text: "text-white",
    icon: Layout
  },
  {
    title: "Rendering",
    desc: "La qualité visuelle avant tout. Notre pôle Motion Design donne vie à votre contenu avec un rendu pro.",
    bg: "bg-nuru-blue",
    text: "text-white",
    icon: MonitorPlay
  },
  {
    title: "Unique",
    desc: "Votre identité est votre force. Nous créons des brandings uniques qui vous démarquent de la concurrence.",
    bg: "bg-nuru-text",
    text: "text-purple-600",
    icon: Sparkles
  }
];

export function PillarsSection() {

  const { openBooking } = useBooking();
  return (
    // 1. AJOUT DU PADDING (px-4 md:px-8 lg:px-12) pour créer les marges latérales
    // 2. AJOUT DE w-full pour que la section prenne tout l'écran
    <section className="py-24 px-4 md:px-8 lg:px-12 relative z-20 bg-nuru-background flex justify-center w-full">

      {/* 3. RETRAIT DE max-w-5xl ET AJOUT DE w-full pour que le fond blanc s'étire */}
      <div className="bg-white w-full rounded-[40px] p-8 md:p-16 lg:p-20 text-center border-white/5 shadow-2xl">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16"
        >
          <span className="text-black">Pourquoi choisir</span> <span className="text-nuru-primary font-glitz tracking-widest">Nuru Agency </span> <span className="text-black">?</span>
        </motion.h2>

        {/* Grille des piliers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`rounded-[32px] p-8 flex flex-col items-center justify-start min-h-[320px] ${pillar.bg} ${pillar.text} hover:scale-105 transition-transform duration-300 shadow-xl`}
            >
              {/* Le conteneur de l'icône */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${pillar.bg === 'bg-nuru-text' ? 'bg-purple-600/10' : 'bg-black/15'}`}>
                <pillar.icon className="w-7 h-7" strokeWidth={2} />
              </div>

              <h3 className="text-2xl mb-4 font-glitz tracking-widest text-center">
                {pillar.title}
              </h3>

              <p className="text-sm text-center font-medium opacity-90 leading-relaxed font-sans">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bouton CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >

          <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-nuru-primary px-10 text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(230,12,115,0.4)]" onClick={openBooking}>
            <span className="font-glitz tracking-widest text-lg pt-1">
              Réserver un appel

            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}