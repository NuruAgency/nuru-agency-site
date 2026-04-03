"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // On utilise un ref pour stocker le chronomètre du "Debounce"
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (term: string) => {
        // On annule le précédent chronomètre si l'utilisateur tape encore
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // On lance un nouveau chronomètre de 300ms
        timerRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (term) {
                params.set("q", term);
            } else {
                params.delete("q");
            }

            // On remet la page à 1 pour la nouvelle recherche
            params.set("page", "1");

            // router.replace est mieux que push ici, pour ne pas polluer l'historique du navigateur
            router.replace(`${pathname}?${params.toString()}`);
        }, 300); // 300 millisecondes d'attente
    };

    return (
        <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                // On déclenche la fonction à chaque fois que la valeur change
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("q")?.toString()}
                placeholder="Rechercher par nom ou email..."
                className="w-full bg-[#1A1D2D] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-nuru-primary transition-colors shadow-inner"
            />
            {/* Le bouton "Chercher" n'est plus nécessaire puisque c'est en temps réel ! */}
        </div>
    );
}