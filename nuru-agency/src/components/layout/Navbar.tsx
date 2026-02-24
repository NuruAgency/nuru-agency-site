"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Réalisations", href: "#realisations" },
  { name: "Offre", href: "#offre" },
  { name: "Histoire", href: "#histoire" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Optimisation : Réaction immédiate dès 10px de scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 10;
    if (shouldBeScrolled !== isScrolled) setIsScrolled(shouldBeScrolled);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <motion.nav
        layout
        animate={{
          width: isScrolled ? "min(90%, 64rem)" : "100%",
          borderRadius: isScrolled ? "9999px" : "0px",
          y: isScrolled ? 10 : 0,
          // ⚠️ SUPPRESSION du backgroundColor ici. On laisse Tailwind gérer le vrai verre !
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.5,
        }}
        className={cn(
          // 1. pointer-events-auto FIXE LE BUG DES BOUTONS NON CLIQUABLES
          // 2. transition-all rend le changement de fond fluide
          "pointer-events-auto flex items-center justify-between px-6 py-3 transition-all duration-500",
          isScrolled
            ? // LE VRAI GLASS EFFECT : Fond très transparent (40%), Gros Flou (2xl), Saturation des couleurs (+50%)
              "bg-nuru-background/40 backdrop-blur-2xl saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
            : "bg-transparent border border-transparent",
        )}
      >
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="">
            
            <Image
              src="/assets/logo.svg" // ou .png
              alt="Logo Nuru Agency"
              width={100} // Largeur d'affichage estimée
              height={24} // Hauteur d'affichage estimée
              priority // Très important pour que le logo charge instantanément
            />
          </div>
        </Link>

        {/* --- LIENS (Desktop) --- */}
        {/* J'ai allégé le fond derrière les liens pour ne pas superposer deux "verres" */}
        <div className="hidden md:flex items-center gap-8 px-6 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-nuru-text/70 hover:text-white transition-colors relative"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- CTA --- */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-2 bg-nuru-primary hover:bg-nuru-primary/90 text-white px-5 py-2.5 rounded-full text-sm transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(230,12,115,0.4)]"
          >
            <span className="font-glitz tracking-widest">
              Réserver un appel
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-white bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>
    </header>
  );
}
