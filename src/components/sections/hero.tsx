import Image from "next/image";
import { heroImage, siteConfig } from "@/data/site";
import { defaultReservationUrl } from "@/lib/links";
import { CtaButton } from "@/components/ui/cta-button";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate min-h-[92vh] overflow-hidden pt-20">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,4,5,0.94)_0%,rgba(7,4,5,0.72)_42%,rgba(7,4,5,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(229,9,47,0.34),transparent_34rem)]" />
      <div className="relative mx-auto flex min-h-[calc(92vh-5rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-soft-gold/35 bg-soft-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-soft-gold">
            {siteConfig.tagline} · Alto Hospicio
          </p>
          <h1 className="text-balance text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-white/78 sm:text-2xl">
            Gastronomia, cocteleria y experiencias unicas en Alto Hospicio.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CtaButton href={defaultReservationUrl}>Reservar Mesa</CtaButton>
            <CtaButton href="/carta" variant="secondary">Ver Carta</CtaButton>
            <CtaButton href={defaultReservationUrl} variant="ghost">WhatsApp</CtaButton>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {["Karaoke", "DJ en vivo", "Eventos privados"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm font-bold text-white/78 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
