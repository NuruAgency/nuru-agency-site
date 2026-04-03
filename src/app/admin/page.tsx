import { getBookings } from "@/actions/admin.action";
import { Calendar as CalendarIcon, CheckCircle2, TrendingUp } from "lucide-react";

// On importe nos composants
import { BookingsTable } from "@/components/admin/BookingsTable";
import { AdminSidebar } from "@/components/admin/AdminSidebar"; // 👈 La nouvelle sidebar !

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    // Récupération des données via Prisma
    const bookings = await getBookings();

    // --- CALCUL DES KPI ---
    const totalBookings = bookings.length;
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentBookingsCount = bookings.filter(b => b.createdAt >= oneWeekAgo).length;

    return (
        <div className="min-h-screen bg-[#0A0C13] text-white selection:bg-nuru-primary font-sans flex flex-col md:flex-row">

            {/* LA SIDEBAR (Qui gère le menu burger et les liens) */}
            <AdminSidebar />

            {/* === CONTENU PRINCIPAL === */}
            <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden">

                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-glitz tracking-widest mb-2">Aperçu Général</h1>
                        <p className="text-gray-400 text-sm">Bienvenue dans le centre de commandement Nuru.</p>
                    </div>
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 flex items-center gap-2 w-max">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Système Opérationnel
                    </div>
                </header>

                {/* --- SECTIONS KPI --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* KPI 1 : Total */}
                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-nuru-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <CalendarIcon className="w-6 h-6 text-nuru-primary" />
                            </div>
                            <h3 className="text-gray-400 font-medium">Total Appels</h3>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-glitz">{totalBookings}</span>
                        </div>
                    </div>

                    {/* KPI 2 : Tendances */}
                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-gray-400 font-medium">7 derniers jours</h3>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-glitz">{recentBookingsCount}</span>
                            <span className="text-sm text-green-400 font-medium mb-1">+ Nouveaux leads</span>
                        </div>
                    </div>

                    {/* KPI 3 : Statut */}
                    <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 relative overflow-hidden hidden lg:block">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-gray-400 font-medium">Statut</h3>
                        </div>
                        <div className="flex items-end gap-3">
                            <span className="text-5xl font-glitz">100%</span>
                            <span className="text-sm text-blue-400 font-medium mb-1">Confirmés</span>
                        </div>
                    </div>
                </div>

                {/* --- COMPOSANT INTERACTIF DU TABLEAU --- */}
                <BookingsTable bookings={bookings} />

            </main>
        </div>
    );
}