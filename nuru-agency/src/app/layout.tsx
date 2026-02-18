import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ou ta police
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar"; // Importe le composant


const inter = Inter({ subsets: ["latin"] });

const glitz = localFont({
  src: "./fonts/Glitz.otf", 
  variable: "--font-glitz", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuru Agency | Solutions Digitales & Automatisation",
  description: "Agence Full Stack & Automation basée en Côte d'Ivoire.",
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
    </html>
  );
}