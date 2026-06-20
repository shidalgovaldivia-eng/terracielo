import { promotions } from "@/data/site";
import { defaultReservationUrl } from "@/lib/links";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CtaButton } from "@/components/ui/cta-button";

export function PromotionsSection() {
  return (
    <AnimatedSection id="promociones" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-neon-red/35 bg-[radial-gradient(circle_at_top_left,rgba(229,9,47,0.32),transparent_32rem),linear-gradient(135deg,rgba(92,13,24,0.9),rgba(7,4,5,0.98))] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-soft-gold">Promociones</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black text-cream sm:text-5xl">
              Banners dinamicos para empujar reservas, cumpleaños y noches especiales.
            </h2>
          </div>
          <CtaButton href={defaultReservationUrl} variant="secondary">Consultar Promo</CtaButton>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {promotions.map((promotion) => (
            <article key={promotion.title} className="rounded-lg bg-black/28 p-5 premium-border">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-neon-red">{promotion.badge}</p>
              <h3 className="mt-3 text-xl font-bold text-cream">{promotion.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{promotion.description}</p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
