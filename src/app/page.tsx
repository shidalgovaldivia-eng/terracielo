import { AboutSection } from "@/components/sections/about";
import { CocktailsSection } from "@/components/sections/cocktails";
import { DishesSection } from "@/components/sections/dishes";
import { EventsSection } from "@/components/sections/events";
import { GallerySection } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { LocationSection } from "@/components/sections/location";
import { PromotionsSection } from "@/components/sections/promotions";
import { ReservationsSection } from "@/components/sections/reservations";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { restaurantJsonLd, safeJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(restaurantJsonLd()) }}
      />
      <Hero />
      <AboutSection />
      <DishesSection />
      <CocktailsSection />
      <EventsSection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationsSection />
      <LocationSection />
      <PromotionsSection />
      <section id="politicas" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg premium-border bg-white/[0.035] p-6 text-sm leading-7 text-white/60">
          <h2 className="text-xl font-bold text-cream">Politicas</h2>
          <p className="mt-3">
            Las reservas enviadas por WhatsApp quedan sujetas a confirmacion del equipo de Terracielo Gastrobar.
            Promociones, horarios y disponibilidad pueden variar segun fecha, evento y capacidad del local.
          </p>
        </div>
      </section>
    </main>
  );
}
