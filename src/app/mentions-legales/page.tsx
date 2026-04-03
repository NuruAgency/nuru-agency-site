import { LegalContent } from "@/components/pages/legal/LegalContent";

export const metadata = {
    title: "Mentions Légales & Confidentialité | Nuru Agency",
    description: "Consultez les mentions légales et la politique de protection des données (RGPD) de Nuru Agency.",
};

export default function LegalPage() {
    return (
        <main className="bg-nuru-background selection:bg-nuru-primary selection:text-white relative overflow-hidden">

            {/* Lueur de fond subtile propre au design Nuru */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-nuru-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10">
                <LegalContent />
            </div>

        </main>
    );
}