import { ReservationForm } from "@/components/sections/reservation-form";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function ReservationsSection() {
  return (
    <AnimatedSection id="reservas" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Reservas"
            title="Convierte visitas en mesas ocupadas."
            description="El formulario arma un mensaje ordenado para WhatsApp. Mas adelante puede conectarse a una integracion real de reservas sin cambiar la experiencia visual."
          />
          <div className="mt-8 grid gap-4 text-sm text-white/65">
            <p className="rounded-lg premium-border bg-white/[0.035] p-4">Ideal para cenas, cumpleaños, reuniones y eventos privados.</p>
            <p className="rounded-lg premium-border bg-white/[0.035] p-4">Confirmacion sujeta a disponibilidad del local.</p>
          </div>
        </div>
        <ReservationForm />
      </div>
    </AnimatedSection>
  );
}
