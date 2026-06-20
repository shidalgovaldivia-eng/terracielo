import { describe, expect, it } from "vitest";
import {
  findMenuForDate,
  formatChileDate,
  normalizeMenuRows,
  parseDisponible
} from "@/lib/menu-del-dia";

describe("menu del dia", () => {
  it("formats the current date using Chile timezone", () => {
    const utcDate = new Date("2026-06-20T03:30:00.000Z");

    expect(formatChileDate(utcDate)).toBe("2026-06-19");
  });

  it("normalizes Google Sheets rows using expected headers", () => {
    const rows = [
      ["fecha", "entrada", "fondo", "acompanamiento", "bebida", "postre", "precio", "disponible"],
      ["2026-06-19", "Crema de zapallo", "Pollo grillado", "Arroz primavera", "Jugo natural", "Flan", "$8.900", "SI"]
    ];

    expect(normalizeMenuRows(rows)).toEqual([
      {
        fecha: "2026-06-19",
        entrada: "Crema de zapallo",
        fondo: "Pollo grillado",
        acompanamiento: "Arroz primavera",
        bebida: "Jugo natural",
        postre: "Flan",
        precio: "$8.900",
        disponible: "SI"
      }
    ]);
  });

  it("accepts SI with accents, spaces and lowercase as available", () => {
    expect(parseDisponible(" sí ")).toBe(true);
    expect(parseDisponible("SI")).toBe(true);
    expect(parseDisponible("no")).toBe(false);
  });

  it("returns only today's available menu", () => {
    const menus = normalizeMenuRows([
      ["fecha", "entrada", "fondo", "acompanamiento", "bebida", "postre", "precio", "disponible"],
      ["2026-06-18", "Sopa", "Carne", "Papas", "Bebida", "Postre", "$7.900", "SI"],
      ["2026-06-19", "Ensalada", "Pasta", "Pan", "Jugo", "Helado", "$8.900", "NO"],
      ["2026-06-19", "Consome", "Merluza", "Pure", "Agua", "Fruta", "$9.900", "SI"]
    ]);

    expect(findMenuForDate(menus, "2026-06-19")).toMatchObject({
      entrada: "Consome",
      fondo: "Merluza",
      precio: "$9.900"
    });
  });

  it("returns null when today's menu is missing or unavailable", () => {
    const menus = normalizeMenuRows([
      ["fecha", "entrada", "fondo", "acompanamiento", "bebida", "postre", "precio", "disponible"],
      ["2026-06-19", "Ensalada", "Pasta", "Pan", "Jugo", "Helado", "$8.900", "NO"]
    ]);

    expect(findMenuForDate(menus, "2026-06-19")).toBeNull();
    expect(findMenuForDate(menus, "2026-06-20")).toBeNull();
  });
});
