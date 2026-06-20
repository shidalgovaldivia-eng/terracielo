import Image from "next/image";
import { cocktails } from "@/data/site";
import { defaultReservationUrl } from "@/lib/links";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CtaButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";

export function CocktailsSection() {
  const [main, ...rest] = cocktails;

  return (
    <AnimatedSection id="cocteleria" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Cocteleria"
            title="Happy Hour, tragos de autor y noches con luces rojas."
            description="Una seccion pensada para vender tarde, noche y eventos. Promociones editables para campanas semanales."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {rest.map((drink) => (
              <article key={drink.name} className="rounded-lg premium-border bg-white/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-soft-gold">{drink.price}</p>
                <h3 className="mt-3 text-xl font-bold text-cream">{drink.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{drink.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <CtaButton href={defaultReservationUrl}>Consultar Happy Hour</CtaButton>
          </div>
        </div>
        <article className="group relative min-h-[520px] overflow-hidden rounded-lg premium-border">
          <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute bottom-0 p-7">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-soft-gold">{main.price}</p>
            <h3 className="mt-3 text-4xl font-black text-white">{main.name}</h3>
            <p className="mt-3 max-w-md leading-7 text-white/72">{main.description}</p>
          </div>
        </article>
      </div>
    </AnimatedSection>
  );
}
