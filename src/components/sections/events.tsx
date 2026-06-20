import Image from "next/image";
import { events } from "@/data/site";
import { eventReservationUrl } from "@/lib/links";
import { AnimatedSection } from "@/components/ui/animated-section";
import { CtaButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventsSection() {
  return (
    <AnimatedSection id="eventos" className="bg-black/35 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Eventos"
            title="Calendario visual para mover reservas cada semana."
            description="Karaoke, DJ, fechas especiales y eventos privados con una experiencia preparada para grupos."
          />
          <CtaButton href={eventReservationUrl}>Reservar Evento</CtaButton>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.name} className="group overflow-hidden rounded-lg premium-border bg-white/[0.035]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={event.src} alt={event.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <p className="absolute bottom-4 left-4 rounded-full bg-soft-gold px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black">
                  {event.schedule}
                </p>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-black text-cream">{event.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
