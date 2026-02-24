import { HeroSection } from "@/components/pages/landing/components/HeroSection";
import { TransitionSection } from "@/components/pages/landing/components/TransitionSection";
import { PortfolioSection } from "@/components/pages/landing/components/PortfolioSection";
import { PillarsSection } from "@/components/pages/landing/components/PillarsSection";
import Image from "next/image";
import Script from "next/script";




export default function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", // Ou "ProfessionalService"
    "name": "Nuru Agency",
    "image": "https://nuruagency.com/assets/logo.png",
    "@id": "https://nuruagency.com",
    "url": "https://nuruagency.com",
    "telephone": "TON_NUMERO_DE_TELEPHONE", // Important pour le référencement local
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abidjan", // Ou ta ville exacte
      "addressCountry": "CI" // Côte d'Ivoire
    },
    "founder": {
      "@type": "Person",
      "name": "Benjamin Trazie"
    },
    "description": "Agence de développement Full Stack et automatisation de processus métier en Côte d'Ivoire.",
    "sameAs": [
      "LIEN_VERS_TON_LINKEDIN",
      "LIEN_VERS_TA_PAGE_FACEBOOK" // Aide Google à relier tes entités
    ]
  };
  return (
    <>
    <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
<footer className="container max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center md:items-end text-nuru-text/50 text-sm border-t border-white/5 mt-20">
  
  {/* Bloc Gauche : Logo au-dessus du texte */}
  <div className="flex flex-col items-center md:items-start gap-4 mb-6 md:mb-0">
    <Image
      src="/assets/logo.svg" 
      alt="Logo Nuru Agency"
      width={150} 
      height={32} 
      className="h-5 w-auto sm:h-6" // Garde cette classe pour la finesse du logo
      priority 
    /> 
    
    {/* Année dynamique avec JS */}
    <span>&copy; {new Date().getFullYear()} Nuru Agency. Tous droits réservés.</span>
  </div>

  {/* Bloc Droit : Liens */}
  <a href="#" className="hover:text-white transition-colors">
    Mentions légales
  </a>
  
</footer>
    </main>
    </>
  );
}