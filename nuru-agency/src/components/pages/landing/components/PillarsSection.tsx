"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pillars = [
  { title: "Native", desc: "Nous construisons des solutions robustes et optimisées  conçues pour la performance.", bg: "bg-nuru-primary", text: "text-white" },
  { title: "UI-UX", desc: "Une expérience utilisateur fluide et une interface pensée pour convertir.", bg: "bg-nuru-purple", text: "text-white" },
  { title: "Rendering", desc: "La qualité visuelle avant tout. Notre pôle Motion Design et Montage Vidéo donne vie à votre contenu avec un rendu professionnel.", bg: "bg-nuru-blue", text: "text-white" },
  { title: "Unique", desc: " Votre identité est votre force. Nous créons des brandings sur mesure qui vous démarquent de la concurrence.", bg: "bg-nuru-text", text: "text-purple-600" } 
];

export function PillarsSection() {
  return (
    <section className="py-24 relative flex justify-center">
      <div className="bg-white max-w-5xl mx-auto rounded-[40px] p-8 md:p-16 text-center border-white/5 ">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-16"
        >
           <span className="text-black">Pourquoi choisir</span> <span className="text-nuru-primary font-glitz">Nuru Agency </span> <span className="text-black"> ?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`rounded-3xl p-8 flex flex-col items-center justify-center  h-[280px] ${pillar.bg} ${pillar.text} hover:scale-105 transition-transform duration-300 shadow-xl`}
            >
              <h3 className="text-2xl  mb-4 font-glitz tracking-widest text-center">{pillar.title}</h3>
              <p className="text-sm text-center font-medium opacity-90 ">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
        >
            <Link 
                href="/contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-nuru-primary px-10  text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(230,12,115,0.4)]"
            >
                <span className="font-glitz tracking-widest">Réserver un appel</span>
                <ArrowRight className="w-5 h-5" />
            </Link>
        </motion.div>
      </div>
    </section>
  );
}