"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BookingCalendar } from "@/components/ui/BookingCalendar";
import { useEffect } from "react";

export function BookingDrawer() {
    const { isOpen, closeBooking } = useBooking();

    // Bloque le scroll du site derrière quand le tiroir est ouvert
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay sombre */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBooking}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] cursor-pointer"
                    />

                    {/* Le Tiroir */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full lg:w-[800px] xl:w-[900px] bg-[#0A0C13] border-l border-white/10 z-[9999] overflow-y-auto shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0A0C13]/90 backdrop-blur-md z-10">
                            <h2 className="text-xl font-glitz tracking-widest text-white">Prendre Rendez-vous</h2>
                            <button onClick={closeBooking} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* On injecte le calendrier réutilisable ici ! */}
                        <div className="p-6 md:p-8">
                            <BookingCalendar />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}