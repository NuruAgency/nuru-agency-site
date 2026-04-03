import { StoryContent } from "@/components/pages/histoire/StoryContent";


export const metadata = {
    title: "Notre Histoire | Nuru Agency",
    description: "Découvrez la genèse de Nuru Agency. Depuis la Côte d'Ivoire, nous construisons les standards web et l'automatisation de demain.",
};

export default function HistoirePage() {
    return (
        <main className="bg-nuru-background selection:bg-nuru-primary selection:text-white">

            <StoryContent />

            {/* <Footer /> */}
        </main>
    );
}