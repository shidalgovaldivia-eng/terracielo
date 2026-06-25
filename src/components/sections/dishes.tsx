import { featuredDishes } from "@/data/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CtaButton } from "@/components/ui/cta-button";
import { ImageCard } from "@/components/ui/image-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function DishesSection() {
  return (
    <AnimatedSection id="platos" className="bg-black/35 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Platos destacados"
            title="Propuestas para compartir, celebrar y volver."
            description="Precios referenciales. La carta completa y actualizada se mantiene en Fudo."
          />
          <CtaButton href="/carta" variant="secondary">Ver Carta Completa</CtaButton>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDishes.map((dish) => (
            <ImageCard key={dish.name} item={dish} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
