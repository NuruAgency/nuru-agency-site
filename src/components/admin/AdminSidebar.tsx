"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar as CalendarIcon,
    LogOut,
    LayoutDashboard,
    Settings,
    MessageSquare,
    AlignLeft,
    X
} from "lucide-react";
import { logoutAdmin } from "@/actions/admin.action"; // On importe l'action de déconnexion

const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Réservations", href: "/admin/reservations", icon: <CalendarIcon className="w-5 h-5" /> },
    { name: "Messages", href: "/admin/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Paramètres", href: "/admin/parametres", icon: <Settings className="w-5 h-5" /> },
];

export function AdminSidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname(); // Pour savoir quel lien est actif

    // Le contenu de la navigation (réutilisé pour Desktop et Mobile)
    const NavigationLinks = () => (
        <nav className="flex-1 flex flex-col gap-2 mt-8 md:mt-0">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)} // Ferme le menu mobile au clic
                        className={`px-4 py-3 rounded-xl flex items-center gap-3 font-medium transition-all ${isActive
                            ? 'bg-nuru-primary/20 text-nuru-primary font-bold border border-nuru-primary/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 opacity-70 hover:opacity-100'
                            }`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* === BARRE SUPÉRIEURE MOBILE === */}
            <div className="md:hidden flex items-center justify-between p-6 bg-[#0A0C13] border-b border-white/10 sticky top-0 z-40">
                <Image src="/assets/logo.svg" alt="Nuru Agency" width={100} height={30} className="w-24 h-auto" unoptimized />
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"
                >
                    <AlignLeft className="w-6 h-6" />
                </button>
            </div>

            {/* === MENU MOBILE OVERLAY (ANIMÉ) === */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 z-[100] md:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0A0C13] border-r border-white/10 z-[101] flex flex-col p-6 shadow-2xl md:hidden"
                        >
                            <div className="flex items-center justify-between">
                                <Image src="/assets/logo.svg" alt="Nuru Agency" width={100} height={30} className="w-24 h-auto" unoptimized />
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <NavigationLinks />

                            <div className="mt-auto pt-6 border-t border-white/10">
                                <form action={logoutAdmin}>
                                    <button type="submit" className="w-full px-4 py-3 text-red-400 bg-red-500/10 rounded-xl flex items-center gap-3 font-medium transition-colors">
                                        <LogOut className="w-5 h-5" /> Déconnexion
                                    </button>
                                </form>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* === SIDEBAR DESKTOP (FIXE) === */}
            {/* L'astuce est ici : h-screen (hauteur fixe de l'écran) + sticky top-0 */}
            <aside className="hidden md:flex w-64 bg-[#0A0C13] border-r border-white/10 h-screen flex-col p-6 sticky top-0 z-50">
                <div className="mb-10">
                    <Image src="/assets/logo.svg" alt="Nuru Agency" width={120} height={40} className="w-28 h-auto" unoptimized />
                </div>

                <NavigationLinks />

                <div className="mt-auto pt-6 border-t border-white/10">
                    <form action={logoutAdmin}>
                        <button type="submit" className="w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl flex items-center gap-3 font-medium transition-colors">
                            <LogOut className="w-5 h-5" />
                            Déconnexion
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
}