"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Les mots qui vont défiler au début
const buzzWords = ["NATIVE", "UI/UX", "RENDERING", "UNIQUE"];

export function Preloader() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Détermine si on est dans la phase 1 (Mots) ou phase 2 (Logo)
    const isPhase1 = progress < 50;

    useEffect(() => {
        // Bloquer le scroll pendant le preloader
        document.body.style.overflow = "hidden";

        let currentProgress = 0;
        let isPaused = false; // 👈 Nouvelle variable pour bloquer le compteur

        const interval = setInterval(() => {
            // Si le compteur est en pause (pendant le vol), on ne fait rien
            if (isPaused) return;

            const increment = currentProgress < 50
                ? Math.floor(Math.random() * 8) + 2
                : Math.floor(Math.random() * 15) + 5;

            let nextProgress = currentProgress + increment;

            // 🎯 LE SECRET EST ICI : Bloquer exactement à 50%
            if (currentProgress < 50 && nextProgress >= 50) {
                nextProgress = 50;
                currentProgress = 50;
                setProgress(50);
                isPaused = true; // On met le compteur en pause

                // On attend 800ms (le temps que le compteur vole jusqu'en bas) pour reprendre
                setTimeout(() => {
                    isPaused = false;
                }, 800);

                return; // On sort de ce tour de boucle
            }

            if (nextProgress >= 100) {
                setProgress(100);
                clearInterval(interval);

                // Pause avant l'ouverture du rideau vers la Home
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = "auto";
                }, 600);
            } else {
                currentProgress = nextProgress;
                setProgress(currentProgress);
            }
        }, 120);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = "auto";
        };
    }, []);

    // Le défilement des mots s'arrête net dès que isPhase1 devient faux (à 50%)
    useEffect(() => {
        if (!isPhase1) return;

        const wordInterval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % buzzWords.length);
        }, 250);

        return () => clearInterval(wordInterval);
    }, [isPhase1]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }} // Le rideau se lève
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-nuru-primary flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* --- BACKGROUND COMPLEXE (Grille & Formes) --- */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                        {/* Grille */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                        {/* Formes géométriques flottantes floutées */}
                        <motion.div
                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-[100px]"
                        />
                        <motion.div
                            animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/20 rounded-full blur-[120px]"
                        />
                    </div>

                    {/* --- CONTENU CENTRAL (Mots puis Logo) --- */}
                    <div className="relative z-10 flex items-center justify-center h-40 w-full">
                        <AnimatePresence mode="wait">
                            {isPhase1 ? (
                                // PHASE 1 : Les mots qui flashent (0 à 49%)
                                <motion.h2
                                    key={buzzWords[currentWordIndex]}
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute text-5xl md:text-7xl lg:text-[100px] font-glitz tracking-widest text-white text-center w-full uppercase leading-none"
                                >
                                    {buzzWords[currentWordIndex]}
                                </motion.h2>
                            ) : (
                                // PHASE 2 : Le Logo Nuru qui apparaît (50 à 100%)
                                <motion.div
                                    key="logo"
                                    initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                                    className="absolute w-32 h-32 md:w-40 md:h-40 bg-nuru-background rounded-[40px] flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/10"
                                >
                                    <Image
                                        src="/assets/logo.svg"
                                        alt="Logo Nuru Agency"
                                        width={160}
                                        height={40}
                                        className="w-28 md:w-36 lg:w-40 h-auto object-contain shrink-0 transition-all duration-300"
                                        priority
                                        unoptimized
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- LE COMPTEUR MAGIQUE (qui vole à 50%) --- */}
                    {isPhase1 ? (
                        // Au centre, géant et transparent (arrête de compter à 50)
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center w-full h-full">
                            <motion.div
                                layoutId="compteur-magique"
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Durée du vol : 800ms
                                className="text-[200px] md:text-[400px] font-glitz font-bold tracking-tighter leading-none text-white/10 select-none"
                            >
                                {progress}
                            </motion.div>
                        </div>
                    ) : (
                        // En bas à droite, plus petit et plein (reprend le compte après le vol)
                        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
                            <motion.div
                                layoutId="compteur-magique"
                                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Mêmes paramètres de vol
                                className="text-6xl md:text-8xl font-glitz font-bold tracking-tighter leading-none text-white select-none"
                            >
                                {progress}%
                            </motion.div>
                        </div>
                    )}

                    {/* Petit indicateur de chargement en bas (Progresse tout du long) */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
                        <span className="text-white/60 font-mono text-xs uppercase tracking-[0.3em]">
                            Initialisation
                        </span>
                        <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}