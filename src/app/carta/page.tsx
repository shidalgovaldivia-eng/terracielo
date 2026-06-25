import type { Metadata } from "next";
import { CartaExperience } from "@/components/carta/carta-experience";
import { getCartaMenu } from "@/lib/menu";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Carta Terracielo Gastrobar | Menú, Coctelería y Almuerzos en Alto Hospicio",
  description:
    "Revisa la carta digital de Terracielo Gastrobar: cafetería, almuerzos, pizzas, parrilladas, coctelería, promociones y menú ejecutivo en Alto Hospicio.",
  alternates: {
    canonical: "/carta"
  },
  openGraph: {
    title: "Carta Terracielo Gastrobar | Menú, Coctelería y Almuerzos en Alto Hospicio",
    description:
      "Carta digital de Terracielo Gastrobar con cafetería, almuerzos, pizzas, parrilladas, coctelería y menú ejecutivo.",
    url: `${siteConfig.url}/carta`,
    type: "website"
  }
};

export default function CartaPage() {
  const menu = getCartaMenu();

  return <CartaExperience menu={menu} />;
}
