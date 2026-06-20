import { defaultReservationUrl } from "@/lib/links";
import { CtaButton } from "@/components/ui/cta-button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 pt-20">
      <section className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.32em] text-soft-gold">404</p>
        <h1 className="mt-4 text-4xl font-black text-cream">Esta mesa no esta disponible.</h1>
        <p className="mt-4 leading-7 text-white/62">
          La pagina que buscas no existe, pero puedes volver al inicio o consultar disponibilidad por WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaButton href="/">Volver al inicio</CtaButton>
          <CtaButton href={defaultReservationUrl} variant="ghost">WhatsApp</CtaButton>
        </div>
      </section>
    </main>
  );
}
