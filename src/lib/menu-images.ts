export type MenuImageKind =
  | "cafeteria"
  | "cocteleria"
  | "pizzas"
  | "parrilladas"
  | "platos"
  | "quesadillas"
  | "mar"
  | "desayunos"
  | "postres"
  | "bebidas"
  | "menu-ejecutivo"
  | "otros";

export type MenuImageType = "real" | "referential" | "none";

export type MenuImage = {
  url: string;
  type: MenuImageType;
  label: string;
  kind: MenuImageKind;
};

type CommercialCategoryImageName =
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

type ImageCandidate = {
  name: string;
  commercialCategory?: string;
  categoryPath?: string;
  imageUrl?: string | null;
  imageType?: MenuImageType;
};

export const referentialMenuImages: Record<MenuImageKind, string> = {
  cafeteria: "/images/terracielo/cafe-corazones.jpg",
  cocteleria: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80",
  pizzas: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80",
  parrilladas: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
  platos: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
  quesadillas: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=900&q=80",
  mar: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80",
  desayunos: "/images/terracielo/omelette-cafeteria.jpg",
  postres: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  bebidas: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
  "menu-ejecutivo": "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80",
  otros: "/images/terracielo/terraza-luces.jpg"
};

export const commercialCategoryImages: Record<CommercialCategoryImageName, MenuImage> = {
  "Menú del día": {
    url: referentialMenuImages["menu-ejecutivo"],
    type: "referential",
    label: "Imagen referencial",
    kind: "menu-ejecutivo"
  },
  "Cafetería": {
    url: referentialMenuImages.cafeteria,
    type: "referential",
    label: "Imagen referencial",
    kind: "cafeteria"
  },
  "Desayunos": {
    url: referentialMenuImages.desayunos,
    type: "referential",
    label: "Imagen referencial",
    kind: "desayunos"
  },
  "Platos de fondo": {
    url: referentialMenuImages.platos,
    type: "referential",
    label: "Imagen referencial",
    kind: "platos"
  },
  "Productos del mar": {
    url: referentialMenuImages.mar,
    type: "referential",
    label: "Imagen referencial",
    kind: "mar"
  },
  "Para compartir": {
    url: referentialMenuImages.parrilladas,
    type: "referential",
    label: "Imagen referencial",
    kind: "parrilladas"
  },
  "Pizzas": {
    url: referentialMenuImages.pizzas,
    type: "referential",
    label: "Imagen referencial",
    kind: "pizzas"
  },
  "Quesadillas": {
    url: referentialMenuImages.quesadillas,
    type: "referential",
    label: "Imagen referencial",
    kind: "quesadillas"
  },
  "Coctelería": {
    url: referentialMenuImages.cocteleria,
    type: "referential",
    label: "Imagen referencial",
    kind: "cocteleria"
  },
  "Cervezas": {
    url: referentialMenuImages.bebidas,
    type: "referential",
    label: "Imagen referencial",
    kind: "bebidas"
  },
  "Bebidas": {
    url: referentialMenuImages.bebidas,
    type: "referential",
    label: "Imagen referencial",
    kind: "bebidas"
  },
  "Postres": {
    url: referentialMenuImages.postres,
    type: "referential",
    label: "Imagen referencial",
    kind: "postres"
  }
};

export function getMenuImageForCommercialCategory(category: CommercialCategoryImageName): MenuImage {
  return commercialCategoryImages[category];
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

export function getMenuImageKind(product: ImageCandidate): MenuImageKind {
  const text = [product.name, product.commercialCategory, product.categoryPath].join(" ").toLowerCase();

  if (includesAny(text, ["cafe", "café", "tecito", "tecito", "teteria", "frapuccino"])) return "cafeteria";
  if (includesAny(text, ["mojito", "coct", "cocktail", "sour", "shot", "barra", "vino", "botellón", "tragos", "michelada"])) {
    return "cocteleria";
  }
  if (includesAny(text, ["pizza"])) return "pizzas";
  if (includesAny(text, ["noquis", "ñoquis", "pasta", "raviol", "chef", "recomendacion", "recomendación"])) return "platos";
  if (includesAny(text, ["parrilla", "carne", "lomo", "pollo", "costillar", "entraña", "plateada", "churrasco"])) {
    return "parrilladas";
  }
  if (includesAny(text, ["quesadilla", "mexico", "taco", "nacho"])) return "quesadillas";
  if (includesAny(text, ["mar", "salmon", "salmón", "camar", "pescado", "reineta", "atun", "atún"])) return "mar";
  if (includesAny(text, ["desayuno", "omelette", "huevo", "tostada"])) return "desayunos";
  if (includesAny(text, ["postre", "torta", "cheesecake", "brownie", "helado", "panqueque"])) return "postres";
  if (includesAny(text, ["bebida", "jugo", "limonada", "agua", "refrescar"])) return "bebidas";
  if (includesAny(text, ["menu", "menú", "buffet", "consome", "crema del dia", "chef"])) return "menu-ejecutivo";

  return "otros";
}

export function getMenuImageForProduct(product: ImageCandidate): MenuImage {
  if (product.imageUrl && product.imageType === "referential") {
    return {
      url: product.imageUrl,
      type: "referential",
      label: "Imagen referencial",
      kind: getMenuImageKind(product)
    };
  }

  if (product.imageUrl) {
    return {
      url: product.imageUrl,
      type: "real",
      label: "Imagen del producto",
      kind: getMenuImageKind(product)
    };
  }

  const kind = getMenuImageKind(product);

  return {
    url: referentialMenuImages[kind],
    type: "referential",
    label: "Imagen referencial",
    kind
  };
}
