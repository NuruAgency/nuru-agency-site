// import { PortfolioHero } from "@/components/pages/realisations/PortfolioHero";
import { ProjectShowcase } from "@/components/pages/projects/ProjectShowcase";
import { ProjectArchives } from "@/components/pages/projects/ProjectArchives";
import { PortfolioCTA } from "@/components/pages/realisations/PortfolioCTA";


export default function Home() {
    return ( <>
       {/* <PortfolioHero /> */}
       <ProjectShowcase />
       <ProjectArchives />
       <PortfolioCTA />
       
         
    </>);
}
