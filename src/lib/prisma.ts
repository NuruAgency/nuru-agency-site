import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

// On englobe ta logique dans une fonction
const prismaClientSingleton = () => {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
};

// On déclare la variable globale pour Next.js
declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// On instancie ou on récupère l'instance existante
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

// En mode dev, on sauvegarde l'instance dans le globalThis
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;