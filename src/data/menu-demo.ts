import { formatChileDate } from "@/lib/menu-del-dia";
import type { MenuDelDia } from "@/types/menu-del-dia";

export function getDemoMenuDelDia(date = new Date()): MenuDelDia {
  return {
    fecha: formatChileDate(date),
    entrada: "Ensalada fresca",
    fondo: "Pollo grillado",
    acompanamiento: "Arroz primavera",
    bebida: "Bebida o jugo natural",
    postre: "Postre del día",
    precio: "$7.990",
    disponible: "SI"
  };
}
