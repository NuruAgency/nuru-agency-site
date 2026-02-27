"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Code2, Cpu, Zap } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

import { PillarsSection } from "@/components/pages/landing/components/PillarsSection";

export function StoryContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { openBooking } = useBooking();

    // Effets de parallaxe au scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    return (
        <div ref={containerRef} className="relative bg-nuru-background min-h-screen overflow-hidden">

            {/* === 1. HERO PARALLAX === */}
            <motion.div
                style={{ opacity: opacityHero, scale: scaleHero }}
                className="sticky top-0 h-screen flex flex-col items-center justify-center pt-20 px-4 z-0"
            >
                {/* Formes lumineuses en arrière-plan */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-nuru-primary/20 rounded-full blur-[120px]"
                    />
                </div>

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-nuru-primary font-mono text-sm tracking-[0.3em] uppercase mb-6"
                >
                    Notre Genèse
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-[120px] font-glitz text-white tracking-widest text-center leading-none"
                >
                    LA LUMIÈRE<br />DANS LE CHAOS.
                </motion.h1>
            </motion.div>

            {/* === 2. LE MANIFESTE (Contenu scrollable par-dessus) === */}
            <div className="relative z-10 bg-[#0A0C13] rounded-t-[40px] md:rounded-t-[80px] mt-[100vh] border-t border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">

                <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-tight md:leading-snug mb-16"
                    >
                        <span className="text-gray-500">"Nuru" signifie lumière en swahili.</span>
                        <br />Notre mission est d'éclairer l'écosystème digital des entreprises en remplaçant les systèmes instables par des <span className="text-nuru-primary">architectures natives millimétrées</span>.
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6 text-gray-400 text-lg leading-relaxed"
                        >
                            <p>
                                L'idée de Nuru Agency est née d'un constat simple : la plupart des entreprises perdent un temps précieux avec des outils mal connectés et des sites web lents qui détruisent leur taux de conversion.
                            </p>
                            <p>
                                En tant que développeurs Full Stack, nous refusons les solutions préfabriquées. Nous sculptons le code. De la base de données <strong className="text-white">Prisma</strong> aux interfaces fluides en <strong className="text-white">Next.js</strong>, jusqu'à l'automatisation absolue avec <strong className="text-white">n8n</strong>.
                            </p>
                        </motion.div>

                        {/* Carte visuelle animée */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative aspect-square rounded-[40px] border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center p-8 group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-nuru-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="grid grid-cols-2 gap-4 w-full h-full relative z-10">
                                <div className="bg-[#0A0C13] rounded-2xl flex flex-col items-center justify-center gap-3 border border-white/5 shadow-xl">
                                    <Code2 className="w-8 h-8 text-nuru-primary" />
                                    <span className="text-xs font-mono font-bold">FRONT-END</span>
                                </div>
                                <div className="bg-[#0A0C13] rounded-2xl flex flex-col items-center justify-center gap-3 border border-white/5 shadow-xl mt-8">
                                    <Cpu className="w-8 h-8 text-nuru-blue" />
                                    <span className="text-xs font-mono font-bold">BACK-END</span>
                                </div>
                                <div className="bg-[#0A0C13] rounded-2xl flex flex-col items-center justify-center gap-3 border border-white/5 shadow-xl -mt-8">
                                    <Zap className="w-8 h-8 text-yellow-500" />
                                    <span className="text-xs font-mono font-bold">WORKFLOWS</span>
                                </div>
                                <div className="bg-[#0A0C13] rounded-2xl flex items-center justify-center border border-white/5 shadow-xl">
                                    <span className="font-glitz text-2xl text-white">NURU</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* === 3. TES PILIERS (Composant importé) === */}
                <div className="relative border-y border-white/5 bg-[#0F111A]">
                    <div className="py-24">
                        <PillarsSection />
                    </div>
                </div>

                {/* === 4. NOTE DU FONDATEUR & CTA === */}
                <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-nuru-primary/50 mb-8 relative shadow-[0_0_30px_rgba(230,12,115,0.3)]"
                    >
                        {/* Mets ta plus belle photo ici */}
                        <Image src="/assets/icon.png" alt="Benjamin Trazie" fill className="object-cover" />
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-white mb-4"
                    >
                        "L'excellence n'a pas de frontières."
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 mb-12 max-w-2xl"
                    >
                        Depuis la Côte d'Ivoire, nous construisons les standards technologiques mondiaux de demain. Nuru Agency n'est pas qu'un prestataire, c'est votre partenaire d'ingénierie et de croissance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            onClick={openBooking}
                            className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform"
                        >
                            Écrire notre histoire ensemble <ArrowRight className="w-5 h-5" />
                        </button>
                        <p className="text-nuru-primary font-bold mt-6">Benjamin Trazie</p>
                        <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-widest">Lead Full Stack & Founder</p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}