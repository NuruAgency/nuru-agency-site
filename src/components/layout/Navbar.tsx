"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "@/context/BookingContext"; // 👈 On a bien notre contexte

const navLinks = [
  { name: "Réalisations", href: "realisations" },
  { name: "Offre", href: "offre" },
  { name: "Histoire", href: "histoire" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { openBooking } = useBooking();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 10;
    if (shouldBeScrolled !== isScrolled) setIsScrolled(shouldBeScrolled);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">

      <motion.nav
        layout
        animate={{
          width: isScrolled ? "min(90%, 64rem)" : "100%",
          borderRadius: isScrolled ? "9999px" : "16px",
          y: isScrolled ? 10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.5,
        }}
        className={cn(
          "pointer-events-auto relative z-50 flex items-center justify-between px-6 py-3 transition-all duration-500",
          isScrolled
            ? "bg-nuru-background/60 backdrop-blur-2xl saturate-150 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
            : "bg-transparent border border-transparent",
          isMobileMenuOpen && !isScrolled && "bg-nuru-background/90 backdrop-blur-xl border-white/10"
        )}
      >
        {/* --- LOGO --- */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <img
            src="/assets/logo.svg"
            alt="Logo Nuru Agency"
            className="w-20 md:w-30 lg:w-35 h-auto object-contain shrink-0 transition-all duration-300"
          />
        </Link>

        {/* --- LIENS DESKTOP --- */}
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

        <div className="flex items-center gap-4">
          {/* --- BOUTON RESERVER DESKTOP --- */}
          <button 
            onClick={openBooking}
            className="hidden md:flex items-center gap-2 bg-nuru-primary hover:bg-nuru-primary/90 text-white px-5 py-2.5 rounded-full text-sm transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(230,12,115,0.4)]" 
          >
            <span className="font-glitz tracking-widest pt-0.5">
              Réserver un appel
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* --- BOUTON MENU BURGER MOBILE --- */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* --- MENU MOBILE --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto absolute top-full left-4 right-4 bg-nuru-background/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}

           
            <button
              onClick={() => {
                setIsMobileMenuOpen(false); 
                openBooking(); 
              }}
              className="mt-4 flex items-center justify-center gap-2 bg-nuru-primary text-white px-5 py-3.5 rounded-2xl text-base font-glitz tracking-widest transition-transform active:scale-95"
            >
              Réserver un appel
              <ArrowUpRight className="w-5 h-5" />
            </button>
            
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
