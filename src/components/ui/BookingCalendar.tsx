"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Video, Globe, Calendar as CalendarIcon, ArrowLeft, CheckCircle2 } from "lucide-react";
import { createBooking } from "@/actions/booking.action";

const DAYS_OF_WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export function BookingCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState<"calendar" | "form" | "success">("calendar");

    // État de chargement pour la base de données
    const [isPending, startTransition] = useTransition();

    // Logique du calendrier
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startingDay = getFirstDayOfMonth(year, month);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const handleDateSelect = (day: number) => {
        const newDate = new Date(year, month, day);
        if (newDate >= today) {
            setSelectedDate(newDate);
            setSelectedTime(null);
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setTimeout(() => setStep("form"), 300);
    };

    // SOUMISSION VERS PRISMA
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (selectedDate) formData.append("date", selectedDate.toISOString());
        if (selectedTime) formData.append("time", selectedTime);

        startTransition(async () => {
            try {
                const result = await createBooking(formData);
                if (result.success) {
                    setStep("success");
                } else {
                    alert("Erreur : " + result.error);
                }
            } catch (error) {
                alert("Une erreur de connexion est survenue.");
            }
        });
    };

    const blanks = Array.from({ length: startingDay }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="w-full bg-[#0F111A] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl text-white font-sans flex flex-col md:flex-row min-h-[500px]">

            {/* --- COLONNE DE GAUCHE : INFOS DE L'APPEL --- */}
            <div className="w-full md:w-[300px] p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-nuru-background flex items-center justify-center shadow-inner border border-white/5 mb-6">
                    <span className="font-glitz text-nuru-primary font-bold text-2xl">N</span>
                </div>
                <h3 className="text-gray-400 text-sm font-semibold mb-1">Nuru Agency</h3>
                <h2 className="text-2xl font-bold mb-6 font-glitz tracking-wide">Appel Stratégique</h2>

                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                    Discutons de votre projet, de vos objectifs et voyons comment nos architectures peuvent vous aider à exploser vos conversions.
                </p>

                <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                        <Clock className="w-5 h-5 text-gray-500" /> 30 min
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                        <Video className="w-5 h-5 text-gray-500" /> Google Meet
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                        <Globe className="w-5 h-5 text-gray-500" /> Heure d'Abidjan (GMT)
                    </div>
                </div>
            </div>

            {/* --- COLONNE DE DROITE : INTERACTION --- */}
            <div className="flex-1 relative overflow-hidden bg-[#0A0C13]">
                <AnimatePresence mode="wait">
                    {step === "calendar" && (
                        <motion.div key="calendar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col xl:flex-row w-full h-full">
                            <div className="p-8 flex-1">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-bold">
                                        {MONTHS[month]} <span className="text-gray-400 font-normal">{year}</span>
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
                                        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                    {DAYS_OF_WEEK.map(day => <div key={day} className="text-xs font-bold text-gray-500 uppercase tracking-wider">{day}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {blanks.map(blank => <div key={`blank-${blank}`} className="p-2" />)}
                                    {days.map(day => {
                                        const date = new Date(year, month, day);
                                        const isPast = date < today;
                                        const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month;
                                        return (
                                            <button
                                                key={day} onClick={() => handleDateSelect(day)} disabled={isPast}
                                                className={`aspect-square rounded-full flex items-center justify-center text-sm font-semibold transition-all ${isPast ? 'text-gray-700 cursor-not-allowed' : 'hover:bg-white/10'} ${isSelected ? 'bg-nuru-primary text-white hover:bg-nuru-primary shadow-[0_0_15px_rgba(230,12,115,0.4)]' : ''}`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            {selectedDate && (
                                <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} className="w-full xl:w-[250px] border-t xl:border-t-0 xl:border-l border-white/10 p-8 bg-[#0F111A]">
                                    <h4 className="text-sm font-bold text-gray-400 mb-6 flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" /> {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </h4>
                                    <div className="flex flex-col gap-3 max-h-[300px] xl:max-h-full overflow-y-auto pr-2 custom-scrollbar">
                                        {TIME_SLOTS.map(time => (
                                            <button
                                                key={time} onClick={() => handleTimeSelect(time)}
                                                className={`w-full py-3 rounded-xl text-sm font-bold border transition-all ${selectedTime === time ? 'border-nuru-primary bg-nuru-primary/20 text-white' : 'border-white/10 text-gray-300 hover:border-nuru-primary/50 hover:bg-white/5'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {step === "form" && (
                        <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 w-full h-full flex flex-col">
                            <button onClick={() => setStep("calendar")} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8 w-max">
                                <ArrowLeft className="w-4 h-4" /> Retour
                            </button>
                            <h3 className="text-2xl font-bold mb-2">Vos informations</h3>
                            <p className="text-gray-400 text-sm mb-8">
                                Confirmons votre rendez-vous le <span className="text-white font-bold">{selectedDate?.toLocaleDateString('fr-FR')} à {selectedTime}</span>.
                            </p>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nom complet</label>
                                    <input required name="name" type="text" className="w-full bg-[#1A1D2D] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nuru-primary transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</label>
                                    <input required name="email" type="email" className="w-full bg-[#1A1D2D] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nuru-primary transition-colors" placeholder="john@entreprise.com" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Votre Projet (Optionnel)</label>
                                    <textarea name="project" rows={3} className="w-full bg-[#1A1D2D] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nuru-primary transition-colors resize-none" placeholder="Décrivez brièvement vos besoins..."></textarea>
                                </div>
                                <button type="submit" disabled={isPending} className="mt-auto w-full bg-nuru-primary text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(230,12,115,0.4)] disabled:opacity-50 flex items-center justify-center">
                                    {isPending ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Confirmer le rendez-vous"}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 w-full h-full flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"><CheckCircle2 className="w-10 h-10" /></div>
                            <h3 className="text-3xl font-glitz tracking-wide mb-4">C'est noté !</h3>
                            <p className="text-gray-400 max-w-sm mb-8">
                                Votre appel est confirmé pour le <span className="text-white">{selectedDate?.toLocaleDateString('fr-FR')} à {selectedTime}</span>. Un email avec le lien Google Meet vous sera envoyé.
                            </p>
                            <button onClick={() => window.location.href = '/'} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-3 rounded-full font-bold transition-colors">
                                Retour à l'accueil
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}