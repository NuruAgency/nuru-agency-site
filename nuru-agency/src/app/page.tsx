import { HeroSection } from "@/components/pages/landing/components/HeroSection";
import { TransitionSection } from "@/components/pages/landing/components/TransitionSection";
import { PortfolioSection } from "@/components/pages/landing/components/PortfolioSection";
import { PillarsSection } from "@/components/pages/landing/components/PillarsSection";

export default function Home() {
  return (
    <main className="bg-nuru-background min-h-screen selection:bg-nuru-primary selection:text-white">
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Transition "En 2026..." */}
      <TransitionSection />
      
      {/* 3. Portfolio Mockup */}
      <PortfolioSection />
      
      {/* 4. Pourquoi choisir Nuru Agency */}
      <PillarsSection />

      {/* 5. Footer Minimaliste */}
      <footer className="container max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center text-nuru-text/50 text-sm border-t border-white/5 mt-20">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-nuru-blue to-nuru-primary flex items-center justify-center font-bold text-white text-xs">N</div>
            <span>2026 Nuru Agency. Tous droits réservés.</span>
        </div>
        <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
      </footer>
    </main>
  );
}