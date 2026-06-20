import Image from "next/image";
import { galleryImages } from "@/data/site";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function GallerySection() {
  return (
    <AnimatedSection id="galeria" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Galeria"
          title="Primeras fotos reales del ambiente Terracielo."
          description="La grilla combina imagenes actuales del local con placeholders premium mientras se prepara una sesion fotografica completa."
          align="center"
        />
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <div key={image.src} className="mb-5 break-inside-avoid overflow-hidden rounded-lg premium-border bg-white/[0.035]">
              <div className={index % 3 === 0 ? "relative h-96" : "relative h-72"}>
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
