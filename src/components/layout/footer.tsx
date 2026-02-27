import Image from "next/image";

export function Footer() {



    return (<>
        <div className="container max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center md:items-end text-nuru-text/50 text-sm border-t border-white/5 mt-20">

            {/* Bloc Gauche : Logo au-dessus du texte */}
            <div className="flex flex-col items-center md:items-start gap-4 mb-6 md:mb-0">
                <Image
                    src="/assets/logo.svg"
                    alt="Logo Nuru Agency"
                    width={160} // J'ai augmenté la largeur native
                    height={40} // J'ai augmenté la hauteur native
                    // CORRECTION ICI : w-28 sur mobile, w-36 sur tablet, w-40 sur desktop. Hauteur auto !
                    className="w-28 md:w-36 lg:w-40 h-auto object-contain shrink-0 transition-all duration-300"
                    priority
                />

                {/* Année dynamique avec JS */}
                <span>&copy; {new Date().getFullYear()} Nuru Agency. Tous droits réservés.</span>
            </div>

            {/* Bloc Droit : Liens */}
            <a href="/mentions-legales" className="hover:text-white transition-colors">
                Mentions légales
            </a>

        </div>
    </>)
}