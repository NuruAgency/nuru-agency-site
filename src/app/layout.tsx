import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ou ta police
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar"; // Importe le composant


const inter = Inter({ subsets: ["latin"] });

const glitz = localFont({
  src: "./fonts/Glitz.otf", 
  variable: "--font-glitz", 
  display: "swap",
});

// L'URL de production de ton site
const siteUrl = "https://nuruagency.com"; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nuru Agency | Agence Web & Automatisation IA",
    template: "%s | Nuru Agency", // Pour les autres pages (ex: "Contact | Nuru Agency")
  },
  description: "Agence de développement Full Stack et automatisation basée en Côte d'Ivoire. Nous créons des SaaS, des sites natifs et des écosystèmes digitaux sur-mesure (Next.js, n8n).",
  keywords: [
    "Nuru Agency",
    "Agence web Côte d'Ivoire",
    "Développement sur mesure",
    "Création de SaaS",
    "Automatisation n8n",
    "Développeur Full Stack JS",
    "Intelligence Artificielle",
    "Création de site internet Abidjan"
  ],
  authors: [{ name: "Benjamin Trazie", url: siteUrl }],
  creator: "Benjamin Trazie",
  publisher: "Nuru Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title: "Nuru Agency | Agence Web & Automatisation IA",
    description: "Architectures natives et automatisation de processus métier pour décupler votre croissance.",
    siteName: "Nuru Agency",
    images: [
      {
        url: "/assets/images/og-image.jpg", // ⚠️ À créer (1200x630px) avec ton logo et un beau fond
        width: 1200,
        height: 630,
        alt: "Nuru Agency - Création de solutions digitales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuru Agency | Agence Web & Automatisation",
    description: "Architectures natives et automatisation de processus métier pour décupler votre croissance.",
    images: ["/assets/images/og-image.jpg"],
    creator: "@ton_compte_twitter_si_tu_en_as_un",
  },
  alternates: {
    canonical: siteUrl, // Évite le contenu dupliqué aux yeux de Google
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} ${glitz.variable} antialiased bg-nuru-background text-nuru-text`}>
        <Navbar /> 
        <main className="min-h-screen pt-20">    
      {/* <div className="h-[100vh]"></div>  */}
          {children}
        </main>
      </body>
      <footer className="container max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center md:items-end text-nuru-text/50 text-sm border-t border-white/5 mt-20">
        
        {/* Bloc Gauche : Logo au-dessus du texte */}
        <div className="flex flex-col items-center md:items-start gap-4 mb-6 md:mb-0">
           <Image
                                        src="/assets/logo.svg"
                                        alt="Logo Nuru Agency"
                                        width={160}
                                        height={40}
                                        className="w-28 md:w-36 lg:w-40 h-auto object-contain shrink-0 transition-all duration-300"
                                        priority
                                        unoptimized
                                        />
          
          {/* Année dynamique avec JS */}
          <span>&copy; {new Date().getFullYear()} Nuru Agency. Tous droits réservés.</span>
        </div>
      
        {/* Bloc Droit : Liens */}
        <a href="#" className="hover:text-white transition-colors">
          Mentions légales
        </a>
        
      </footer>
    </html>
  );
}
