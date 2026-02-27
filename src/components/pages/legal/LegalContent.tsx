"use client";

import { motion } from "framer-motion";
import { Scale, ShieldCheck, Server, Copyright, Cookie } from "lucide-react";

const sections = [
    {
        id: "editeur",
        icon: <Scale className="w-6 h-6 text-nuru-primary" />,
        title: "1. Éditeur du site",
        content: (
            <>
                <p>Le présent site est édité par <strong>Nuru Agency</strong>, agence de développement web et d'automatisation.</p>
                <ul className="mt-4 space-y-2 text-gray-400 list-disc list-inside ml-4">
                    <li><strong>Fondateur & Lead Developer :</strong> Benjamin Trazie</li>
                    <li><strong>Localisation :</strong> Côte d'Ivoire</li>
                    <li><strong>Contact :</strong> (+225) 01 53 27 54 36</li>
                </ul>
            </>
        )
    },
    {
        id: "hebergement",
        icon: <Server className="w-6 h-6 text-nuru-blue" />,
        title: "2. Hébergement",
        content: (
            <>
                <p>L'architecture de ce site est déployée et gérée de manière autonome sur un Serveur Privé Virtuel (VPS).</p>
                <p className="mt-4 text-gray-400">
                    L'infrastructure physique d'hébergement est fournie par <strong>Hostinger International Ltd.</strong><br />
                    61 Lordou Vironos Street<br />
                    6023 Larnaca, Chypre<br />
                    <a href="https://www.hostinger.fr/contact" target="_blank" rel="noopener noreferrer" className="hover:text-nuru-primary transition-colors">www.hostinger.fr</a>
                </p>
            </>
        )
    },
    {
        id: "donnees",
        icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
        title: "3. Protection des données",
        content: (
            <>
                <p>Nuru Agency s'engage à ce que la collecte et le traitement de vos données, effectués à partir de ce site, soient conformes aux réglementations en vigueur sur la protection des données personnelles.</p>
                <h4 className="text-white font-bold mt-6 mb-2">Données collectées via la réservation :</h4>
                <p className="text-gray-400 mb-4">
                    Lorsque vous réservez un appel stratégique via notre plateforme interne, nous collectons votre <strong>Nom</strong>, votre <strong>Adresse Email</strong>, et la <strong>Description de votre projet</strong>.
                </p>
                <h4 className="text-white font-bold mt-6 mb-2">Finalité et stockage :</h4>
                <p className="text-gray-400">
                    Ces données sont strictement utilisées pour préparer notre échange et vous recontacter. Elles sont stockées de manière sécurisée dans notre propre base de données isolée et ne sont en <strong>aucun cas</strong> revendues ou partagées à des tiers.
                </p>
            </>
        )
    },
    {
        id: "cookies",
        icon: <Cookie className="w-6 h-6 text-yellow-500" />,
        title: "4. Utilisation des Cookies",
        content: (
            <>
                <p>L'expérience utilisateur de notre site public ne requiert aucun cookie de traçage publicitaire intrusif.</p>
                <p className="mt-4 text-gray-400">
                    Seuls des <strong>cookies techniques strictement nécessaires</strong> au fonctionnement de l'application (notamment pour la sécurisation de l'accès à l'espace d'administration) sont utilisés.
                </p>
            </>
        )
    },
    {
        id: "propriete",
        icon: <Copyright className="w-6 h-6 text-purple-400" />,
        title: "5. Propriété Intellectuelle",
        content: (
            <>
                <p>L'ensemble de ce site relève de la législation sur le droit d'auteur et la propriété intellectuelle.</p>
                <p className="mt-4 text-gray-400">
                    Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables, les représentations iconographiques, le code source (React/Next.js) et le design (UI/UX). La reproduction de tout ou partie de ce site sur un support quel qu'il soit est formellement interdite sans l'autorisation expresse de Nuru Agency.
                </p>
            </>
        )
    }
];

export function LegalContent() {
    return (
        <section className="pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">

            {/* EN-TÊTE ANIMÉ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 md:mb-24 text-center md:text-left"
            >
                <span className="text-nuru-primary font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                    Transparence & Sécurité
                </span>
                <h1 className="text-4xl md:text-6xl font-glitz tracking-widest text-white mb-6">
                    Mentions Légales
                </h1>
                <p className="text-gray-400 text-lg">
                    Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </p>
            </motion.div>

            {/* LISTE DES SECTIONS */}
            <div className="space-y-12 md:space-y-16">
                {sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 md:p-10 hover:bg-white/[0.04] transition-colors"
                    >
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-white/5 flex items-center justify-center shadow-inner">
                                {section.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-white">
                                {section.title}
                            </h2>
                        </div>

                        <div className="text-gray-300 leading-relaxed space-y-4">
                            {section.content}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 text-center text-gray-500 font-mono text-sm"
            >
                Nuru Agency © {new Date().getFullYear()} — L'exigence au service du code.
            </motion.div>

        </section>
    );
}