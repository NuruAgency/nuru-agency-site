import { notFound } from "next/navigation";
import { allProjects } from "@/data/projects.data";

import { ProjectDetails } from "@/components/pages/projects/ProjectDetails";
import { PortfolioCTA } from "@/components/pages/realisations/PortfolioCTA";

// 1. Fonction Next.js pour générer les routes statiques lors du build (Très bon pour le SEO)
export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

// 2. La page en elle-même
export default async function SingleProjectPage({ params }: { params: { slug: string } }) {
  // Dans Next.js 15, on doit 'await' params. (Si tu es sur Next 14, tu peux enlever le 'await')
  const { slug } = await params;
  
  // On cherche le projet dans notre source de vérité
  const project = allProjects.find((p) => p.slug === slug);

  // Si on tape une fausse URL, on renvoie une 404
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-nuru-background text-white selection:bg-nuru-primary selection:text-white">

      
      {/* Le composant qu'on vient de créer */}
      <ProjectDetails project={project} />
      
      {/* Le CTA de fin qui est présent sur la maquette */}
      <PortfolioCTA />
      
      {/* <Footer /> */}
    </main>
  );
}