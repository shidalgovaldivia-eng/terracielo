import { describe, expect, it } from "vitest";
import {
  formatMenuPrice,
  getCartaMenu,
  getFeaturedProducts,
  getProductsByCommercialCategory
} from "@/lib/menu";
import { getMenuImageForCommercialCategory, getMenuImageForProduct } from "@/lib/menu-images";

describe("carta menu", () => {
  it("loads extracted Fudo menu products", () => {
    const menu = getCartaMenu();

    expect(menu.products.length).toBeGreaterThan(0);
    expect(menu.categories.length).toBeGreaterThan(0);
  });

  it("formats prices as Chilean pesos", () => {
    expect(formatMenuPrice(5500)).toBe("$5.500");
    expect(formatMenuPrice(null)).toBe("");
  });

  it("groups technical Fudo categories into client-friendly commercial categories", () => {
    const menu = getCartaMenu();
    const groupedProducts = getProductsByCommercialCategory(menu.products);

    expect(groupedProducts.some((group) => group.name === "Coctelería")).toBe(true);
    expect(groupedProducts.some((group) => group.name === "Pizzas")).toBe(true);
    expect(groupedProducts.some((group) => group.name === "Postres")).toBe(true);
    expect(groupedProducts.every((group) => group.products.length > 0)).toBe(true);
  });

  it("marks up to eight featured products from priority categories and Terracielo names", () => {
    const featured = getFeaturedProducts(getCartaMenu().products);

    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(8);
    expect(featured.every((product) => product.featured)).toBe(true);
  });

  it("uses referential images for products without real image", () => {
    const menu = getCartaMenu();
    const productWithoutRealImage = menu.products.find((product) => product.imageType !== "real");

    expect(productWithoutRealImage).toBeDefined();
    expect(productWithoutRealImage?.imageType).toBe("referential");
    expect(productWithoutRealImage?.imageUrl).toBeTruthy();
    expect(getMenuImageForProduct(productWithoutRealImage!).type).toBe("referential");
  });

  it("does not fill featured products with full bottles from the bar", () => {
    const featured = getFeaturedProducts(getCartaMenu().products);

    expect(featured.some((product) => /botella|botell[oó]n/i.test(product.name))).toBe(false);
  });

  it("uses a neutral plated dish image for chef pasta instead of a meat-only fallback", () => {
    const gnocchi = getCartaMenu().products.find((product) => product.name.includes("Ñoquis"));

    expect(gnocchi).toBeDefined();
    expect(gnocchi?.imageKind).toBe("platos");
  });

  it("provides one referential image per commercial section", () => {
    const image = getMenuImageForCommercialCategory("Cafetería");

    expect(image.type).toBe("referential");
    expect(image.url).toBeTruthy();
  });
});
