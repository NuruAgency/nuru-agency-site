"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Le mot de passe par défaut
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function loginAdmin(formData: FormData) {
    const password = formData.get("password") as string;

    if (password === ADMIN_PASSWORD) {
        // 1. On attend (await) l'objet cookies
        const cookieStore = await cookies();

        // 2. On définit le cookie
        cookieStore.set("nuru_admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
        return { success: true };
    }

    return { success: false, error: "Mot de passe incorrect" };
}

export async function logoutAdmin() {
    // Même logique ici, on utilise await pour la déconnexion
    const cookieStore = await cookies();
    cookieStore.delete("nuru_admin_session");
    redirect("/admin/login");
}

export async function getBookings() {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { createdAt: "desc" },
        });
        return bookings;
    } catch (error) {
        console.error("Erreur récupération bookings:", error);
        return [];
    }
}