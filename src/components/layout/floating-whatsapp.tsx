"use client";

import { usePathname } from "next/navigation";
import { defaultReservationUrl } from "@/lib/links";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const isCarta = pathname === "/carta";
  if (isCarta) return null;

  return (
    <a
      href={defaultReservationUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Reservar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-3 rounded-full bg-[#25D366] px-5 text-sm font-black text-black shadow-[0_18px_45px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:bg-[#39e27a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span className="text-lg">WA</span>
      <span className="hidden sm:inline">Reservar</span>
    </a>
  );
}
