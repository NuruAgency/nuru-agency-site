
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

// Initialisation de Resend avec ta clé API sécurisée dans le .env
const resend = new Resend(process.env.RESEND_API_KEY);

// 1. CRÉATION DE RÉSERVATION ET ENVOI D'EMAIL
export async function createBooking(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const projectDescription = formData.get("project") as string;
        const dateStr = formData.get("date") as string;
        const time = formData.get("time") as string;

        if (!name || !email || !dateStr || !time) {
            return { success: false, error: "Champs obligatoires manquants" };
        }

        // A. Sauvegarde dans la base de données Prisma
        const newBooking = await prisma.booking.create({
            data: {
                name,
                email,
                projectDescription,
                bookingDate: new Date(dateStr),
                bookingTime: time,
            },
        });

        // B. Envoi des emails via Resend
        try {
            const formattedDate = new Date(dateStr).toLocaleDateString('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            });

            // 📩 1. Préparation de l'e-mail pour le PROSPECT
            const emailToProspect = resend.emails.send({
                from: "Nuru Agency <contact@nuruagency.com>", // Ton domaine vérifié !
                to: email, // L'email de ton prospect
                subject: "Confirmation de votre appel stratégique - Nuru Agency",
                html: `
                    <div style="font-family: Arial, sans-serif; color: #E5E7EB; background-color: #0A0C13; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1f2937;">
                        <h2 style="color: #ffffff; margin-bottom: 24px;">Bonjour ${name},</h2>
                        
                        <p style="font-size: 16px; line-height: 1.6;">
                            Nous avons bien reçu votre demande de réservation d'appel stratégique pour le <strong>${formattedDate} à ${time}</strong>.
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.6;">
                            Votre demande est actuellement en cours de traitement. Nous vous enverrons très prochainement un nouvel e-mail contenant le lien <strong>Google Meet</strong> pour notre échange.
                        </p>
                        
                        ${projectDescription ? `<p style="font-size: 16px; line-height: 1.6; padding: 16px; background-color: #111827; border-radius: 8px; border-left: 4px solid #E60C73;">Nous avons bien pris note des détails de votre projet. Nous sommes déjà en train de les analyser pour vous apporter un maximum de valeur lors de cet appel.</p>` : ''}
                        
                        <br/>
                        <p style="font-size: 16px;">À très vite,</p>
                        <p style="font-size: 16px; line-height: 1.4;">
                            <strong style="color: #ffffff;">Benjamin Trazie</strong><br/>
                            <span style="color: #9CA3AF; font-size: 14px;">Founder & Lead Full Stack Developer<br/>Nuru Agency</span>
                        </p>
                    </div>
                `,
            });

            // 🚨 2. Préparation de l'e-mail de NOTIFICATION POUR TOI (L'Admin)
            const emailToAdmin = resend.emails.send({
                from: "Nuru Agency <contact@nuruagency.com>", // Utilise la même adresse d'envoi vérifiée
                to: "benjamin.trazie@nuruagency.com", // ⚠️ REMPLACE CECI PAR TON ADRESSE E-MAIL DE RÉCEPTION
                subject: `🚨 Nouvelle réservation : ${name} (${formattedDate} à ${time})`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
                        <h2 style="color: #E60C73;">Nouvel appel stratégique réservé !</h2>
                        <p>Tu as une nouvelle demande de réservation. Voici les détails pour créer le lien Google Meet :</p>
                        <ul style="list-style-type: none; padding: 0;">
                            <li style="margin-bottom: 10px;"><strong>Nom :</strong> ${name}</li>
                            <li style="margin-bottom: 10px;"><strong>E-mail :</strong> <a href="mailto:${email}">${email}</a></li>
                            <li style="margin-bottom: 10px;"><strong>Date :</strong> ${formattedDate}</li>
                            <li style="margin-bottom: 10px;"><strong>Heure :</strong> ${time}</li>
                        </ul>
                        
                        <h3>Détails du projet :</h3>
                        <blockquote style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #E60C73; border-radius: 4px;">
                            ${projectDescription ? projectDescription : "<em>Aucune description fournie.</em>"}
                        </blockquote>
                        
                        <p style="margin-top: 30px;">
                            👉 <a href="https://calendar.google.com/calendar/u/0/r/eventedit" target="_blank" style="background-color: #E60C73; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Créer l'événement sur Google Agenda</a>
                        </p>
                    </div>
                `,
            });

            // 🚀 3. Envoi des deux e-mails en parallèle
            await Promise.all([emailToProspect, emailToAdmin]);
            
            console.log("Emails envoyés avec succès au client et à l'admin.");
        } catch (emailError) {
            console.error("Erreur Resend :", emailError);
        }

        // C. Rafraîchissement du Dashboard Admin
        revalidatePath("/admin");
        revalidatePath("/admin/reservations");

        return { success: true, bookingId: newBooking.id };
    } catch (error) {
        console.error("Erreur Prisma :", error);
        return { success: false, error: "Erreur lors de la sauvegarde." };
    }
}

// 2. MARQUER LA RÉSERVATION COMME TERMINÉE
export async function markBookingAsCompleted(id: string) {
    try {
        await prisma.booking.update({
            where: { id },
            data: { status: "COMPLETED" },
        });

        // Mise à jour de l'interface admin en temps réel
        revalidatePath("/admin");
        revalidatePath("/admin/reservations");

        return { success: true };
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        return { success: false, error: "Impossible de mettre à jour la réservation." };
    }
}