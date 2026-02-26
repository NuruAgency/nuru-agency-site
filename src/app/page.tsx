import { Preloader } from "@/components/ui/Preloader";
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
      <Preloader />
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Transition "En 2026..." */}
      <TransitionSection />
      
      {/* 3. Portfolio Mockup */}
      <PortfolioSection />
      
      {/* 4. Pourquoi choisir Nuru Agency */}
      <PillarsSection />


    </main>
    </>
  );
}
