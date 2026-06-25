import extractedMenu from "../../docs/menu-extraction/menu.normalized.json";
import { getMenuImageForProduct, type MenuImageKind, type MenuImageType } from "@/lib/menu-images";

type RawProductGroup = {
  name?: string | null;
};

type RawProduct = {
  id: number;
  name: string;
  description?: string | null;
  position?: number | null;
  price?: number | null;
  priceDelivery?: number | null;
  pricePickup?: number | null;
  productCategoryId?: number | null;
  productGroups?: RawProductGroup[];
  isAvailable?: boolean;
  image?: { url?: string | null } | null;
};

type RawCategory = {
  id: number;
  name: string;
  parentId?: number | null;
  position?: number | null;
  products: RawProduct[];
  children: RawCategory[];
};

export type CommercialCategoryName =
  | "Menú del día"
  | "Cafetería"
  | "Desayunos"
  | "Platos de fondo"
  | "Productos del mar"
  | "Para compartir"
  | "Pizzas"
  | "Quesadillas"
  | "Coctelería"
  | "Cervezas"
  | "Bebidas"
  | "Postres";

export type MenuProduct = {
  id: number;
  name: string;
  description: string;
  price: number | null;
  priceLabel: string;
  available: boolean;
  sourceCategory: string;
  categoryPath: string;
  commercialCategory: CommercialCategoryName;
  optionGroups: string[];
  imageUrl?: string;
  imageType: MenuImageType;
  imageKind: MenuImageKind;
  featured: boolean;
};

export type MenuCategory = {
  name: CommercialCategoryName;
  products: MenuProduct[];
};

export type CartaMenu = {
  sourceUrl: string;
  accountName: string;
  products: MenuProduct[];
  categories: MenuCategory[];
};

export const commercialCategoryOrder: CommercialCategoryName[] = [
  "Menú del día",
  "Cafetería",
  "Desayunos",
  "Platos de fondo",
  "Productos del mar",
  "Para compartir",
  "Pizzas",
  "Quesadillas",
  "Coctelería",
  "Cervezas",
  "Bebidas",
  "Postres"
];

export function formatMenuPrice(price: number | null | undefined) {
  if (price == null || Number.isNaN(Number(price))) return "";

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(price);
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function getCommercialCategory(product: RawProduct, categoryPath: string): CommercialCategoryName {
  const text = normalizeText(`${product.name} ${categoryPath}`);

  if (includesAny(text, ["menu tipo buffet", "menu del dia", "consome", "crema del dia"])) return "Menú del día";
  if (includesAny(text, ["cafeteria", "cafecitos", "tecitos", "frapuccino", "cafe", "te "])) return "Cafetería";
  if (includesAny(text, ["desayuno", "omelette", "huevo", "tostada"])) return "Desayunos";
  if (includesAny(text, ["producto del mar", "salmon", "camaron", "pescado", "reineta", "atun"])) return "Productos del mar";
  if (includesAny(text, ["tabla", "canasta", "compartir", "salsas caseras"])) return "Para compartir";
  if (includesAny(text, ["pizza"])) return "Pizzas";
  if (includesAny(text, ["quesadilla", "terra mexico", "taco", "nacho"])) return "Quesadillas";
  if (includesAny(text, ["schop", "cerveza", "botellin", "heineken", "kunstmann", "austral", "corona"])) return "Cervezas";
  if (includesAny(text, ["barra", "mojito", "coctail", "coctel", "sour", "vino", "botellon", "michelada", "trago"])) {
    return "Coctelería";
  }
  if (includesAny(text, ["bebida", "jugo", "limonada", "agua", "para refrescar", "sin alcohol"])) return "Bebidas";
  if (includesAny(text, ["postre", "torta", "cheesecake", "brownie", "helado", "panqueque"])) return "Postres";

  return "Platos de fondo";
}

function flattenProducts(categories: RawCategory[], path: string[] = []): MenuProduct[] {
  const products: MenuProduct[] = [];

  for (const category of categories) {
    const categoryPathParts = [...path, category.name];
    const categoryPath = categoryPathParts.join(" > ");

    for (const product of category.products) {
      const commercialCategory = getCommercialCategory(product, categoryPath);
      const image = getMenuImageForProduct({
        name: product.name,
        commercialCategory,
        categoryPath,
        imageUrl: product.image?.url
      });

      products.push({
        id: product.id,
        name: product.name,
        description: product.description?.replace(/\s+/g, " ").trim() ?? "",
        price: product.price ?? null,
        priceLabel: formatMenuPrice(product.price),
        available: product.isAvailable ?? true,
        sourceCategory: category.name,
        categoryPath,
        commercialCategory,
        optionGroups: product.productGroups?.map((group) => group.name).filter((name): name is string => Boolean(name)) ?? [],
        imageUrl: image.url,
        imageType: image.type,
        imageKind: image.kind,
        featured: false
      });
    }

    products.push(...flattenProducts(category.children, categoryPathParts));
  }

  return products;
}

function scoreFeaturedProduct(product: MenuProduct) {
  let score = 0;
  const text = normalizeText(`${product.name} ${product.categoryPath}`);

  if (includesAny(text, ["botella", "botellon", "reserva 2022"])) return 0;
  if (text.includes("terracielo") || text.includes("terra ")) score += 5;
  if (product.commercialCategory === "Pizzas") score += 5;
  if (product.commercialCategory === "Platos de fondo") score += 4;
  if (product.commercialCategory === "Para compartir") score += 4;
  if (product.commercialCategory === "Coctelería") score += 3;
  if (product.description) score += 1;

  return score;
}

export function getFeaturedProducts(products: MenuProduct[]) {
  const categoryCounts = new Map<CommercialCategoryName, number>();
  const featured: MenuProduct[] = [];
  const candidates = products
    .filter((product) => product.available)
    .map((product) => ({ product, score: scoreFeaturedProduct(product) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name, "es"));

  for (const { product } of candidates) {
    const count = categoryCounts.get(product.commercialCategory) ?? 0;
    if (count >= 2) continue;

    featured.push({ ...product, featured: true });
    categoryCounts.set(product.commercialCategory, count + 1);

    if (featured.length >= 8) break;
  }

  return featured;
}

export function getProductsByCommercialCategory(products: MenuProduct[]) {
  const groups = new Map<CommercialCategoryName, MenuProduct[]>();

  for (const category of commercialCategoryOrder) groups.set(category, []);

  for (const product of products) {
    groups.get(product.commercialCategory)?.push(product);
  }

  return commercialCategoryOrder
    .map((name) => ({
      name,
      products: groups.get(name)?.sort((a, b) => a.name.localeCompare(b.name, "es")) ?? []
    }))
    .filter((group) => group.products.length > 0);
}

export function getCartaMenu(): CartaMenu {
  const products = flattenProducts(extractedMenu.categories as RawCategory[]);
  const featuredIds = new Set(getFeaturedProducts(products).map((product) => product.id));
  const productsWithFeatured = products.map((product) => ({
    ...product,
    featured: featuredIds.has(product.id)
  }));

  return {
    sourceUrl: extractedMenu.source.qrMenuUrl,
    accountName: extractedMenu.account.displayName ?? extractedMenu.account.name,
    products: productsWithFeatured,
    categories: getProductsByCommercialCategory(productsWithFeatured)
  };
}
