import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const API_BASE = "https://integrations.fu.do/fudo";
const API_KEY = "terracielosaboryvida";
const APP = "qr-menu";
const OUT_DIR = path.join(process.cwd(), "docs", "menu-extraction");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "fudo-app": APP,
  "fudo-account-id": Buffer.from(API_KEY, "utf8").toString("base64"),
};

async function fetchJson(endpoint) {
  const url = `${API_BASE}${endpoint}?a=${encodeURIComponent(API_KEY)}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} fetching ${url}`);
  }

  return response.json();
}

function byPositionThenName(a, b) {
  return (a.position ?? 0) - (b.position ?? 0) || String(a.name ?? "").localeCompare(String(b.name ?? ""), "es");
}

function formatPrice(value) {
  if (value == null || Number.isNaN(Number(value))) return "";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function csvEscape(value) {
  const text = value == null ? "" : String(value).replace(/\s+/g, " ").trim();
  return `"${text.replaceAll('"', '""')}"`;
}

function buildMenu(account, categories, products) {
  const categoriesById = new Map(categories.map((category) => [category.id, { ...category, children: [], products: [] }]));
  const roots = [];

  for (const category of categoriesById.values()) {
    if (category.parentId && categoriesById.has(category.parentId)) {
      categoriesById.get(category.parentId).children.push(category);
    } else {
      roots.push(category);
    }
  }

  for (const product of products) {
    const category = categoriesById.get(product.productCategoryId);
    if (category) category.products.push(product);
  }

  for (const category of categoriesById.values()) {
    category.children.sort(byPositionThenName);
    category.products.sort(byPositionThenName);
  }

  roots.sort(byPositionThenName);

  return {
    extractedAt: new Date().toISOString(),
    source: {
      qrMenuUrl: `https://menu.fu.do/${API_KEY}/qr-menu`,
      apiBase: API_BASE,
      apiKey: API_KEY,
      app: APP,
    },
    account: {
      name: account.name,
      displayName: account.settings?.name,
      currencySymbol: account.settings?.currencySymbol,
      countryCode: account.settings?.countryCode,
      contact: account.settings?.contact,
      social: account.settings?.social,
    },
    summary: {
      categoryCount: categories.length,
      rootCategoryCount: roots.length,
      productCount: products.length,
      availableProductCount: products.filter((product) => product.isAvailable).length,
      unavailableProductCount: products.filter((product) => !product.isAvailable).length,
    },
    categories: roots,
  };
}

function flattenProducts(categories, parentPath = []) {
  const rows = [];

  for (const category of categories) {
    const categoryPath = [...parentPath, category.name];
    for (const product of category.products) {
      rows.push({
        category: categoryPath[0] ?? "",
        subcategory: categoryPath.slice(1).join(" > "),
        categoryPath: categoryPath.join(" > "),
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        priceFormatted: formatPrice(product.price),
        available: product.isAvailable,
        imageUrl: product.image?.url ?? "",
        optionGroupCount: product.productGroups?.length ?? 0,
      });
    }
    rows.push(...flattenProducts(category.children, categoryPath));
  }

  return rows;
}

function markdownForMenu(menu) {
  const lines = [
    `# Carta extraida - ${menu.account.displayName ?? menu.account.name}`,
    "",
    `Fuente: ${menu.source.qrMenuUrl}`,
    `Extraccion: ${menu.extractedAt}`,
    "",
    "## Resumen",
    "",
    `- Categorias: ${menu.summary.categoryCount}`,
    `- Productos: ${menu.summary.productCount}`,
    `- Disponibles: ${menu.summary.availableProductCount}`,
    `- No disponibles: ${menu.summary.unavailableProductCount}`,
    "",
  ];

  function addCategory(category, level = 2) {
    lines.push(`${"#".repeat(level)} ${category.name}`, "");

    for (const product of category.products) {
      const status = product.isAvailable ? "" : " (no disponible)";
      const price = formatPrice(product.price);
      lines.push(`- **${product.name}**${status}${price ? ` - ${price}` : ""}`);
      if (product.description) lines.push(`  ${product.description.replace(/\s+/g, " ").trim()}`);
      if (product.productGroups?.length) {
        lines.push(`  Opciones/grupos: ${product.productGroups.map((group) => group.name).filter(Boolean).join(", ")}`);
      }
    }

    if (category.products.length) lines.push("");

    for (const child of category.children) {
      addCategory(child, Math.min(level + 1, 6));
    }
  }

  for (const category of menu.categories) addCategory(category);

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

function csvForProducts(rows) {
  const columns = [
    "category",
    "subcategory",
    "categoryPath",
    "id",
    "name",
    "description",
    "price",
    "priceFormatted",
    "available",
    "imageUrl",
    "optionGroupCount",
  ];

  return [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n") + "\n";
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const [{ account }, { productCategories }, { products }] = await Promise.all([
    fetchJson("/account/"),
    fetchJson("/product-categories/"),
    fetchJson("/products/"),
  ]);

  const sortedCategories = [...productCategories].sort(byPositionThenName);
  const sortedProducts = [...products].sort(byPositionThenName);
  const menu = buildMenu(account, sortedCategories, sortedProducts);
  const flatProducts = flattenProducts(menu.categories);

  await Promise.all([
    writeFile(path.join(OUT_DIR, "account.raw.json"), JSON.stringify(account, null, 2), "utf8"),
    writeFile(path.join(OUT_DIR, "categories.raw.json"), JSON.stringify(sortedCategories, null, 2), "utf8"),
    writeFile(path.join(OUT_DIR, "products.raw.json"), JSON.stringify(sortedProducts, null, 2), "utf8"),
    writeFile(path.join(OUT_DIR, "menu.normalized.json"), JSON.stringify(menu, null, 2), "utf8"),
    writeFile(path.join(OUT_DIR, "products.csv"), csvForProducts(flatProducts), "utf8"),
    writeFile(path.join(OUT_DIR, "carta-extraida.md"), markdownForMenu(menu), "utf8"),
  ]);

  console.log(`Extracted ${menu.summary.productCount} products in ${menu.summary.categoryCount} categories.`);
  console.log(`Output: ${OUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
