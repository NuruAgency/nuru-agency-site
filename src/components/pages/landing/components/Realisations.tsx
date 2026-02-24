import { projects } from "@/data/realisations.data";

export function Realisations() {
  return (
    <section id="realisations" className="py-24 container mx-auto px-6">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
        Nos réalisations <span className="text-nuru-primary">uniques</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass-card p-6 rounded-3xl group">
            <div className="h-48 bg-nuru-background rounded-2xl mb-4 overflow-hidden">
               {/* Image avec zoom au hover */}
               <div className="w-full h-full bg-nuru-purple/10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex gap-2 mb-3">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 rounded-full border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-nuru-gray text-sm mb-4">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}