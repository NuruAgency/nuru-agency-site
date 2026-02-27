import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { ListFilter } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReservationsPage(props: {
    // Next.js 15 : searchParams est une Promesse
    searchParams?: Promise<{ q?: string; page?: string }>
}) {
    const searchParams = await props.searchParams;

    // --- LECTURE DES PARAMÈTRES ---
    const query = searchParams?.q || "";
    const currentPage = Number(searchParams?.page) || 1;
    const itemsPerPage = 7; // Nombre de réservations affichées par page

    // --- CONSTRUCTION DE LA REQUÊTE PRISMA ---
    // Si on a tapé un truc, on cherche dans le nom OU dans l'email (insensible à la casse sur PostgreSQL)
    const whereCondition = query ? {
        OR: [
            { name: { contains: query, mode: "insensitive" as const } },
            { email: { contains: query, mode: "insensitive" as const } }
        ]
    } : {};

    // 1. On compte le total pour la pagination
    const totalItems = await prisma.booking.count({ where: whereCondition });
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 2. On récupère les données précises de la page demandée
    const bookings = await prisma.booking.findMany({
        where: whereCondition,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage
    });

    return (
        <div className="min-h-screen bg-[#0A0C13] text-white selection:bg-nuru-primary font-sans flex flex-col md:flex-row">

            {/* On réutilise notre belle Sidebar */}
            <AdminSidebar />

            <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden">
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-glitz tracking-widest mb-2">Historique des Appels</h1>
                    <p className="text-gray-400 text-sm">
                        Vous avez <strong className="text-white">{totalItems}</strong> réservation{totalItems > 1 ? 's' : ''} au total.
                    </p>
                </header>

                {/* BARRE DE RECHERCHE ET FILTRES */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <SearchBar />

                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium px-4 py-2 border border-white/10 rounded-xl bg-[#1A1D2D]">
                        <ListFilter className="w-4 h-4" />
                        Trier par : Plus récents
                    </div>
                </div>

                {/* LE TABLEAU (Réutilisé ! Il gèrera le slide-over tout seul) */}
                <BookingsTable bookings={bookings} />

                {/* LA PAGINATION */}
                <Pagination totalPages={totalPages} />

            </main>
        </div>
    );
}