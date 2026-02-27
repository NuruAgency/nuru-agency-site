"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Mail, Clock, CheckCircle2, User, X, FileText, Check } from "lucide-react";
import { markBookingAsCompleted } from "@/actions/booking.action"; // 👈 L'import de ton action

export function BookingsTable({ bookings }: { bookings: any[] }) {
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [isPending, startTransition] = useTransition();

    // On filtre pour ne garder que les appels en attente (PENDING)
    const pendingBookings = bookings.filter(b => b.status === "PENDING" || !b.status);

    useEffect(() => {
        if (selectedBooking) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedBooking]);

    // La fonction déclenchée au clic sur le bouton "Terminer"
    const handleComplete = (id: string) => {
        startTransition(async () => {
            const res = await markBookingAsCompleted(id);
            if (res.success) {
                setSelectedBooking(null); // On ferme le tiroir
            } else {
                alert("Une erreur est survenue.");
            }
        });
    };

    return (
        <>
            {/* --- LE TABLEAU --- */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
                <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Appels à venir ({pendingBookings.length})</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs uppercase tracking-widest text-gray-500 border-b border-white/5 bg-white/[0.02]">
                                <th className="px-8 py-4 font-semibold">Client</th>
                                <th className="px-8 py-4 font-semibold">Contact</th>
                                <th className="px-8 py-4 font-semibold">Date & Heure</th>
                                <th className="px-8 py-4 font-semibold">Projet</th>
                                <th className="px-8 py-4 font-semibold text-right">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {pendingBookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    onClick={() => setSelectedBooking(booking)}
                                    className="border-b border-white/5 hover:bg-white/[0.05] transition-colors cursor-pointer group"
                                >
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-nuru-primary/20 flex items-center justify-center text-nuru-primary font-bold text-xs uppercase group-hover:bg-nuru-primary group-hover:text-white transition-colors">
                                                {booking.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-white">{booking.name}</span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Mail className="w-4 h-4" />
                                            <span>{booking.email}</span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium capitalize">
                                                {new Date(booking.bookingDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })}
                                            </span>
                                            <span className="text-xs text-nuru-primary font-bold tracking-widest flex items-center gap-1 mt-1">
                                                <Clock className="w-3 h-3" /> {booking.bookingTime}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5 max-w-[200px]">
                                        <p className="text-gray-400 truncate">
                                            {booking.projectDescription || <span className="italic opacity-50">Aucun détail fourni</span>}
                                        </p>
                                    </td>

                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" /> En attente
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {pendingBookings.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <CheckCircle2 className="w-10 h-10 text-green-500/50 mb-3" />
                                            <p className="text-gray-400 font-medium">Tout est propre ! Aucun appel en attente.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- LE TIROIR LATÉRAL (SLIDE-OVER) --- */}
            <AnimatePresence>
                {selectedBooking && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBooking(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] cursor-pointer"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#0F111A] border-l border-white/10 z-[9999] p-8 overflow-y-auto shadow-2xl flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-glitz tracking-widest text-white">Détails du Lead</h2>
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-8 flex-1">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-nuru-primary/20 flex items-center justify-center text-nuru-primary font-bold text-2xl uppercase border border-nuru-primary/30">
                                        {selectedBooking.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedBooking.name}</h3>
                                        <div className="flex items-center gap-2 text-gray-400 mt-1">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                En attente
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#0A0C13] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email</p>
                                        <div className="flex items-center gap-3 text-white">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <a href={`mailto:${selectedBooking.email}`} className="hover:text-nuru-primary transition-colors">
                                                {selectedBooking.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-white/5" />
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Date & Heure de l'appel</p>
                                        <div className="flex items-center gap-3 text-white">
                                            <CalendarIcon className="w-4 h-4 text-nuru-primary" />
                                            <span className="capitalize">{new Date(selectedBooking.bookingDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="font-bold text-nuru-primary">{selectedBooking.bookingTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                        <h4 className="text-lg font-bold text-white">Description du projet</h4>
                                    </div>
                                    <div className="bg-[#0A0C13] border border-white/5 rounded-2xl p-6 h-full min-h-[150px]">
                                        {selectedBooking.projectDescription ? (
                                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                                                {selectedBooking.projectDescription}
                                            </p>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                                                <FileText className="w-8 h-8 mb-2" />
                                                <p className="text-sm">Le client n'a pas laissé de description supplémentaire.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 🎯 LE NOUVEAU BOUTON "TERMINER" */}
                                <div className="pt-4 border-t border-white/10 mt-auto">
                                    <button
                                        onClick={() => handleComplete(selectedBooking.id)}
                                        disabled={isPending}
                                        className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isPending ? (
                                            <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" /> Marquer l'appel comme terminé
                                            </>
                                        )}
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}