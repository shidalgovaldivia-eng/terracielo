import { siteConfig } from "@/data/site";
import { defaultReservationUrl } from "@/lib/links";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CtaButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";

export function LocationSection() {
  return (
    <AnimatedSection id="ubicacion" className="bg-black/35 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-lg premium-border bg-white/[0.035]">
          <iframe
            title="Mapa de Terracielo Gastrobar"
            src={siteConfig.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0"
          />
        </div>
        <div>
          <SectionHeading eyebrow="Ubicacion" title="En Alto Hospicio, listo para tu proxima reserva." />
          <div className="mt-8 grid gap-5 text-white/68">
            <p><strong className="text-cream">Direccion:</strong> {siteConfig.address.street}, {siteConfig.address.city}</p>
            <p><strong className="text-cream">Telefono:</strong> {siteConfig.displayPhone}</p>
            <p><strong className="text-cream">Instagram:</strong> @terracielogastrobar</p>
            <div>
              <strong className="text-cream">Horarios:</strong>
              <ul className="mt-3 grid gap-2">
                {siteConfig.hours.map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={defaultReservationUrl}>Reservar ahora</CtaButton>
            <CtaButton href={siteConfig.instagramUrl} variant="ghost">Ver Instagram</CtaButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
