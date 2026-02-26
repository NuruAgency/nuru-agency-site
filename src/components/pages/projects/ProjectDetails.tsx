"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Globe, ChevronDown, FileText, Users } from "lucide-react";

// On importe le type ou on le déduit de nos données
import { allProjects } from "@/data/projects.data";
type Project = typeof allProjects[0];

export function ProjectDetails({ project }: { project: Project }) {
  const router = useRouter();
  
  // États pour les accordéons
  const [isProjectOpen, setIsProjectOpen] = useState(true);
  const [isTeamOpen, setIsTeamOpen] = useState(true);

  return (
    <section className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Bouton Retour */}
      <button 
        onClick={() => router.back()}
        className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-nuru-background hover:bg-gray-200 transition-colors mb-12 shadow-lg"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
        
        {/* === COLONNE GAUCHE (STICKY) === */}
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-32 flex flex-col gap-8">
          
          {/* Titre style [ Nuru Agency ] */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-2 mb-6">
              <span className="text-nuru-primary font-mono font-light">[</span>
              <span className="text-white">{project.clientName}</span>
              <span className="text-nuru-primary font-mono font-light">]</span>
            </h1>
            <p className="text-nuru-text/80 text-sm md:text-base leading-relaxed font-medium">
              {project.fullDescription}
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col gap-3">
            <Link 
              href="/contact"
              className="group flex items-center justify-between bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="font-semibold text-sm">Réserver un appel</span>
              <ArrowUpRight className="w-5 h-5 text-nuru-text group-hover:text-white transition-colors" />
            </Link>
            
            <a 
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="font-semibold text-sm">{project.liveLink.replace('https://', '')}</span>
              <Globe className="w-5 h-5 text-nuru-text group-hover:text-white transition-colors" />
            </a>
          </div>

          <div className="w-full h-px bg-white/10 my-2" />

          {/* === ACCORDÉONS === */}
          
          {/* Accordéon 1 : Le Projet */}
          <div className="flex flex-col border border-white/10 rounded-3xl bg-white/5 overflow-hidden">
            <button 
              onClick={() => setIsProjectOpen(!isProjectOpen)}
              className="flex items-center justify-between p-5 w-full text-left"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-nuru-primary" />
                <span className="font-bold text-nuru-primary text-lg tracking-wide">Projet</span>
              </div>
              <motion.div animate={{ rotate: isProjectOpen ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 text-white/50" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isProjectOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 flex flex-col gap-6 text-sm text-nuru-text/80">
                    <div>
                      <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white mb-3">Contexte</span>
                      <p className="leading-relaxed">{project.details.context}</p>
                    </div>
                    <div>
                      <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white mb-3">Solution</span>
                      <p className="leading-relaxed whitespace-pre-line">{project.details.solution}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordéon 2 : L'Equipe */}
          <div className="flex flex-col border border-white/10 rounded-3xl bg-white/5 overflow-hidden">
            <button 
              onClick={() => setIsTeamOpen(!isTeamOpen)}
              className="flex items-center justify-between p-5 w-full text-left"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-nuru-primary" />
                <span className="font-bold text-nuru-primary text-lg tracking-wide">Equipe</span>
              </div>
              <motion.div animate={{ rotate: isTeamOpen ? 180 : 0 }}>
                <ChevronDown className="w-5 h-5 text-white/50" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isTeamOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 flex gap-4">
                    {project.team.map((member, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden relative border-2 border-nuru-primary/30">
                          <Image src={member.image} alt={member.name} fill className="object-cover" />
                        </div>
                        <div className="text-center">
                          <p className="text-white text-xs font-bold">{member.name}</p>
                          <div className="bg-nuru-primary mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* === COLONNE DROITE (GALERIE QUI DÉFILE) === */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {project.gallery.map((imageSrc, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full h-[300px] sm:h-[400px] md:h-[600px] bg-white/5 rounded-[32px] overflow-hidden relative group border border-white/5"
            >
              <Image 
                src={imageSrc} 
                alt={`${project.clientName} galerie ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay pour simuler un lecteur vidéo sur la première image (comme sur ta maquette) */}
              {index === 0 && (
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                       <ArrowUpRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}