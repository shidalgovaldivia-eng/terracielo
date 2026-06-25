"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CartaMenu, CommercialCategoryName, MenuProduct } from "@/lib/menu";
import { ProductCard } from "@/components/carta/product-card";
import { getMenuImageForCommercialCategory } from "@/lib/menu-images";

type CartaExperienceProps = {
  menu: CartaMenu;
};

const allCategoriesLabel = "Todo";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function filterProducts(products: MenuProduct[], query: string, category: string) {
  const normalizedQuery = normalize(query);

  return products.filter((product) => {
    const matchesCategory = category === allCategoriesLabel || product.commercialCategory === category;
    const matchesQuery =
      !normalizedQuery ||
      normalize(`${product.name} ${product.description} ${product.commercialCategory}`).includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

export function CartaExperience({ menu }: CartaExperienceProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(allCategoriesLabel);
  const categoryNames = menu.categories.map((category) => category.name);
  const featured = menu.products.filter((product) => product.featured).slice(0, 8);
  const filteredProducts = useMemo(
    () => filterProducts(menu.products, query, selectedCategory),
    [menu.products, query, selectedCategory]
  );
  const filteredGroups = useMemo(() => {
    const productIds = new Set(filteredProducts.map((product) => product.id));

    return menu.categories
      .map((category) => ({
        ...category,
        products: category.products.filter((product) => productIds.has(product.id))
      }))
      .filter((category) => category.products.length > 0);
  }, [filteredProducts, menu.categories]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const section = category === allCategoriesLabel ? "productos" : `categoria-${category}`;
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#070405] pb-24 pt-20 text-cream">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(229,9,47,0.24),transparent_28rem)] px-4 pb-6 pt-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-soft-gold">Carta digital</p>
              <h1 className="mt-2 max-w-2xl text-3xl font-black leading-tight text-white sm:text-5xl">
                Terracielo Gastrobar
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68 sm:text-base">
                Cocteleria, cafeteria, almuerzos, pizzas, parrilladas y promos para revisar rapido desde la mesa.
              </p>
            </div>
            <a
              href={menu.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-11 shrink-0 items-center rounded-md border border-white/15 px-4 text-sm font-bold text-white/82 transition hover:border-soft-gold hover:text-soft-gold sm:inline-flex"
            >
              Ver Fudo
            </a>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Buscar producto</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar mojito, pizza, cafe..."
                className="min-h-12 w-full rounded-md border border-white/12 bg-black/45 px-4 text-base font-semibold text-white outline-none ring-0 transition placeholder:text-white/38 focus:border-neon-red focus:bg-black/70"
              />
            </label>
            <a
              href={menu.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-neon-red px-4 text-sm font-black text-white shadow-[0_16px_40px_rgba(229,9,47,0.28)] transition hover:bg-[#ff2847] sm:hidden"
            >
              Ver carta original / ordenar en Fudo
            </a>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
            {[allCategoriesLabel, ...categoryNames].map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className={`min-h-11 rounded-md border px-3 text-center text-xs font-black leading-tight transition sm:text-sm ${
                    active
                      ? "border-neon-red bg-neon-red text-white shadow-[0_0_26px_rgba(229,9,47,0.28)]"
                      : "border-white/12 bg-white/[0.055] text-white/72 hover:border-soft-gold hover:text-soft-gold"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-5 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <p className="text-2xl font-black text-white">{filteredProducts.length}</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/48">Resultados</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
            <p className="text-2xl font-black text-white">{menu.categories.length}</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/48">Secciones</p>
          </div>
        </div>
      </section>

      {featured.length > 0 && !query && selectedCategory === allCategoriesLabel ? (
        <section className="px-4 pb-8 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-soft-gold">Destacados</p>
                <h2 className="mt-1 text-2xl font-black text-white">Favoritos para empezar</h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="productos" className="px-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-9">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((category) => (
              <CategorySection
                key={category.name}
                name={category.name}
                products={category.products}
              />
            ))
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-8 text-center">
              <h2 className="text-xl font-black text-white">No encontramos productos</h2>
              <p className="mt-2 text-sm text-white/58">Prueba con otra busqueda o revisa la carta original en Fudo.</p>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}

function CategorySection({ name, products }: { name: CommercialCategoryName; products: MenuProduct[] }) {
  const image = getMenuImageForCommercialCategory(name);

  return (
    <section id={`categoria-${name}`} className="scroll-mt-36">
      <div className="mb-4 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
        <div className="relative h-32 sm:h-44">
          <Image
            src={image.url}
            alt={`Imagen referencial para ${name}`}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/86 via-black/52 to-black/16" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-soft-gold">Seccion</p>
              <h2 className="text-2xl font-black text-white">{name}</h2>
              <p className="mt-1 text-xs font-semibold text-white/52">Imagen referencial de categoria</p>
            </div>
            <span className="rounded-full border border-white/16 bg-black/48 px-3 py-1 text-xs font-bold text-white/72 backdrop-blur">
              {products.length}
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
