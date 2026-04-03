import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Command Center | Nuru Agency",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // L'ASTUCE ULTIME ICI :
        // 1. "fixed inset-0" : Fixe le bloc aux 4 coins de l'écran (cache Navbar et Footer en dessous).
        // 2. "z-[9999]" : S'assure d'être au-dessus de tout.
        // 3. "overflow-y-auto" : Permet de scroller DANS le dashboard sans scroller la page en dessous.
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#0A0C13] text-white selection:bg-nuru-primary selection:text-white font-sans w-full">
            {children}
        </div>
    );
}