import type { MenuProduct } from "@/lib/menu";

type ProductCardProps = {
  product: MenuProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            {product.featured ? (
              <p className="mb-1 text-[0.66rem] font-black uppercase tracking-[0.16em] text-soft-gold">
                Recomendado
              </p>
            ) : null}
            <h3 className="mt-1 text-lg font-black leading-tight text-cream">{product.name}</h3>
          </div>
          {product.priceLabel ? (
            <span className="shrink-0 rounded-full bg-neon-red/12 px-3 py-1.5 text-sm font-black text-white">
              {product.priceLabel}
            </span>
          ) : null}
        </div>

        {product.description ? (
          <p className="line-clamp-4 text-sm leading-6 text-white/68">{product.description}</p>
        ) : (
          <p className="text-sm leading-6 text-white/45">Consulta preparacion, acompanamientos y disponibilidad.</p>
        )}

        {product.optionGroups.length > 0 ? (
          <p className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs leading-5 text-white/58">
            Opciones: {product.optionGroups.join(", ")}
          </p>
        ) : null}
      </div>
    </article>
  );
}
