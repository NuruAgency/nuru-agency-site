import { OfferContent } from "@/components/pages/offer/OfferContent";
import { PortfolioCTA } from "@/components/pages/realisations/PortfolioCTA";

export const metadata = {
    title: "Notre Offre | Nuru Agency",
    description: "Découvrez notre offre clé en main. Stratégie, Design, Développement natif et Automatisation. Réservez votre appel stratégique dès aujourd'hui.",
};

export default function OfferPage() {
    return (
        <main className="min-h-screen bg-nuru-background text-white selection:bg-nuru-primary selection:text-white">

            {/* La grille avec l'offre à gauche et l'agenda à droite */}
            <OfferContent />

            <div className="pb-24">
                <PortfolioCTA />
            </div>

            {/* <Footer /> */}
        </main>
    );
}