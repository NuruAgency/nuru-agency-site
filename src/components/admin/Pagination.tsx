"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    // On récupère la page actuelle dans l'URL (ou 1 par défaut)
    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `/admin/reservations?${params.toString()}`;
    };

    // Si on a qu'une seule page, pas besoin d'afficher la pagination
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between md:justify-center gap-6 mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl w-max mx-auto">
            <button
                onClick={() => router.push(createPageURL(currentPage - 1))}
                disabled={currentPage <= 1}
                className="p-2 rounded-xl border border-white/10 bg-[#1A1D2D] disabled:opacity-30 hover:bg-nuru-primary hover:border-nuru-primary transition-colors text-white"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-bold text-gray-300">
                Page <span className="text-white">{currentPage}</span> sur <span className="text-nuru-primary">{totalPages}</span>
            </span>

            <button
                onClick={() => router.push(createPageURL(currentPage + 1))}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-xl border border-white/10 bg-[#1A1D2D] disabled:opacity-30 hover:bg-nuru-primary hover:border-nuru-primary transition-colors text-white"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}