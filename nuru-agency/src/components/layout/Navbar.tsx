"use client";

import { useState } from "react";
import Link from "next/link";
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
          backgroundColor: isScrolled ? "rgba(19, 23, 42, 0.8)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 400, // Augmenté pour la vitesse
          damping: 30, // Ajusté pour la stabilité
          mass: 0.8, // Plus léger pour plus de réactivité
        }}
        className={cn(
          "flex items-center justify-between px-6 py-3",
          isScrolled ? "glass-nuru" : "" // Utilisation de ton utilitaire CSS
        )}
      >
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-nuru-blue to-nuru-primary shadow-lg shadow-nuru-primary/20">
            <span className="font-bold text-white text-lg font-sans">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            Nuru <span className="text-nuru-primary">Agency</span>
          </span>
        </Link>

        {/* --- LIENS (Desktop) --- */}
        <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
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
            className="hidden md:flex items-center gap-2 bg-nuru-primary hover:bg-nuru-primary/90 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(230,12,115,0.4)]"
          >
            <span>Réserver un appel</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-white bg-white/10 rounded-full backdrop-blur-md">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>
    </header>
  );
}
