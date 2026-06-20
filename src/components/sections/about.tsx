import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    title: "Historia editable",
    text: "Terracielo nace como un punto de encuentro para comer rico, tomar algo bien preparado y vivir noches memorables en Alto Hospicio."
  },
  {
    title: "Mision",
    text: "Crear experiencias gastronomicas y sociales con buena atencion, ambiente cuidado y propuestas para cada momento del dia."
  },
  {
    title: "Vision",
    text: "Ser el gastrobar referente de Alto Hospicio para celebraciones, eventos tematicos, cocteleria y reuniones sociales."
  }
];

export function AboutSection() {
  return (
    <AnimatedSection id="nosotros" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Un gastrobar con energia nocturna, comida para compartir y sello local."
          description="La web esta preparada para editar historia, mision y vision sin tocar la arquitectura. Hoy comunica una marca premium, cercana y comercial."
        />
        <div className="grid gap-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-lg premium-border bg-white/[0.035] p-6">
              <h3 className="text-xl font-bold text-cream">{pillar.title}</h3>
              <p className="mt-3 leading-7 text-white/62">{pillar.text}</p>
            </article>
          ))}
          <article className="rounded-lg border border-neon-red/35 bg-neon-red/10 p-6">
            <h3 className="text-xl font-bold text-cream">Que hace unico a Terracielo</h3>
            <p className="mt-3 leading-7 text-white/68">
              Combina restaurante, cafeteria, cocteleria y eventos en un solo lugar: ideal para almorzar, celebrar, cantar, bailar o reservar una noche especial.
            </p>
          </article>
        </div>
      </div>
    </AnimatedSection>
  );
}
