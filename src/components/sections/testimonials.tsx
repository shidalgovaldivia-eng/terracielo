import { testimonials } from "@/data/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function TestimonialsSection() {
  return (
    <AnimatedSection id="opiniones" className="bg-black/35 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Opiniones"
          title="Prueba social estilo Google Reviews."
          description="Testimonios simulados hasta conectar opiniones reales desde la ficha de Google."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-lg premium-border bg-white/[0.04] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-cream">{testimonial.name}</h3>
                  <p className="text-xs text-white/42">{testimonial.detail}</p>
                </div>
                <p className="text-soft-gold" aria-label={`${testimonial.rating} estrellas`}>
                  {"★".repeat(testimonial.rating)}
                </p>
              </div>
              <p className="mt-5 leading-7 text-white/68">“{testimonial.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
