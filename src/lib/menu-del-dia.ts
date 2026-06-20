import type { MenuDelDia } from "@/types/menu-del-dia";

const EXPECTED_HEADERS = [
  "fecha",
  "entrada",
  "fondo",
  "acompanamiento",
  "bebida",
  "postre",
  "precio",
  "disponible"
] as const;

type MenuHeader = (typeof EXPECTED_HEADERS)[number];

export function formatChileDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function parseDisponible(value: string) {
  return value
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase() === "SI";
}

export function normalizeSheetDate(value: string) {
  const trimmed = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const slashMatch = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (slashMatch) {
    const [, day, month, year] = slashMatch;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return trimmed;
}

export function normalizeHeader(value: string) {
  return value
    .trim()
    .replace(/^\uFEFF/, "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function normalizeMenuRows(rows: string[][]): MenuDelDia[] {
  const [headerRow, ...dataRows] = rows;

  if (!headerRow) {
    return [];
  }

  const normalizedHeaders = headerRow.map(normalizeHeader);

  return dataRows
    .filter((row) => row.some((cell) => cell.trim() !== ""))
    .map((row) => {
      const record = EXPECTED_HEADERS.reduce(
        (accumulator, header) => ({ ...accumulator, [header]: "" }),
        {} as Record<MenuHeader, string>
      );

      normalizedHeaders.forEach((header, index) => {
        if (EXPECTED_HEADERS.includes(header as MenuHeader)) {
          record[header as MenuHeader] = row[index]?.trim() ?? "";
        }
      });

      return {
        ...record,
        fecha: normalizeSheetDate(record.fecha)
      };
    });
}

export function findMenuForDate(menus: MenuDelDia[], chileDate: string) {
  return menus.find((menu) => menu.fecha === chileDate && parseDisponible(menu.disponible)) ?? null;
}
