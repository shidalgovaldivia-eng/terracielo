import { siteConfig } from "@/data/site";

export function whatsappUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function reservationMessage(values: {
  name: string;
  phone: string;
  people: string;
  date: string;
  time: string;
}) {
  return [
    "Hola Terracielo, quiero reservar una mesa.",
    `Nombre: ${values.name}`,
    `Telefono: ${values.phone}`,
    `Personas: ${values.people}`,
    `Fecha: ${values.date}`,
    `Hora: ${values.time}`
  ].join("\n");
}

export const defaultReservationUrl = whatsappUrl(
  "Hola Terracielo, quiero reservar una mesa. Me ayudan con disponibilidad?"
);

export const eventReservationUrl = whatsappUrl(
  "Hola Terracielo, quiero cotizar o reservar un evento privado."
);
