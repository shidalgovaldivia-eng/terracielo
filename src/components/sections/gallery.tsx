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
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div key={image.src} className="overflow-hidden rounded-lg premium-border bg-black">
              <div className={image.galleryClassName ?? "relative aspect-[4/3]"}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={`${image.objectFit === "contain" ? "object-contain p-2" : "object-cover"} transition duration-700 hover:scale-105`}
                  style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
