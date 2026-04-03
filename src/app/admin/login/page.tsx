"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loginAdmin } from "@/actions/admin.action";
import { Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const res = await loginAdmin(formData);
            if (res.success) {
                router.push("/admin");
            } else {
                setError(res.error || "Erreur de connexion");
            }
        });
    };

    return (
        <div className="min-h-screen bg-nuru-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background flou (Identité Nuru) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nuru-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl backdrop-blur-xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="w-16 h-16 bg-nuru-background rounded-2xl flex items-center justify-center border border-white/10 mb-6 shadow-inner">
                        <Lock className="w-8 h-8 text-nuru-primary" />
                    </div>
                    <h1 className="text-3xl font-glitz tracking-widest text-white mb-2">Zone Sécurisée</h1>
                    <p className="text-gray-400 text-sm">Accès restreint au centre de commandement Nuru Agency.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Clé d'accès</label>
                        <input
                            required
                            name="password"
                            type="password"
                            className="w-full bg-[#1A1D2D] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-nuru-primary transition-colors text-center tracking-[0.5em] font-mono text-lg"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-nuru-primary text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_15px_rgba(230,12,115,0.4)] flex justify-center items-center gap-2 disabled:opacity-50 mt-2"
                    >
                        {isPending ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>Déverrouiller <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}