"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export function TransitionSection() {
  return (
    <section className="py-24 relative overflow-hidden flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="container max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <h2 className="text-xxl md:text-3xl lg:text-xxl font-bold leading-tight max-w-2xl text-white">
          En 2026, une simple présence digitale ne suffit plus à porter votre ambition.
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <Link 
            href="/contact"
            className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-nuru-primary px-6 font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(230,12,115,0.4)]"
          >
            <span>Réserver un appel</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="#realisations"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
          >
            <PlayCircle className="w-4 h-4 text-nuru-blue" />
            <span>Voir nos réalisations</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}