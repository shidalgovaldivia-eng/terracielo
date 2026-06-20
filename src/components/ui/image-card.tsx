import Image from "next/image";
import type { FeaturedItem } from "@/types/site";

type ImageCardProps = {
  item: FeaturedItem;
};

export function ImageCard({ item }: ImageCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg premium-border bg-white/[0.035]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />
        {item.tag ? (
          <span className="absolute left-4 top-4 rounded-full bg-neon-red px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
            {item.tag}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-cream">{item.name}</h3>
          <p className="shrink-0 text-sm font-bold text-soft-gold">{item.price}</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/62">{item.description}</p>
      </div>
    </article>
  );
}
