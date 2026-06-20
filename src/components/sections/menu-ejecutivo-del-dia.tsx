"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/links";
import type { MenuDelDiaResponse } from "@/types/menu-del-dia";

const fallbackMessage = "Consulta el menu ejecutivo de hoy por WhatsApp";
const orderUrl = whatsappUrl("Hola, me interesa el menú ejecutivo de hoy.");

const menuItems = [
  { key: "entrada", label: "Entrada", icon: "EN" },
  { key: "fondo", label: "Fondo", icon: "FO" },
  { key: "acompanamiento", label: "Acompanamiento", icon: "AC" },
  { key: "bebida", label: "Bebida", icon: "BE" },
  { key: "postre", label: "Postre", icon: "PO" }
] as const;

export function MenuEjecutivoDelDia() {
  const [data, setData] = useState<MenuDelDiaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadMenu() {
      try {
        const response = await fetch("/api/menu-del-dia", {
          headers: {
            Accept: "application/json"
          }
        });

        const payload = (await response.json()) as MenuDelDiaResponse;

        if (isMounted) {
          setData(payload);
          setHasError(!response.ok || !payload.ok);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  const menu = data?.menu ?? null;

  return (
    <section id="menu-ejecutivo" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-soft-gold/25 bg-[radial-gradient(circle_at_top_left,rgba(215,168,77,0.18),transparent_28rem),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-soft-gold">
              Menu ejecutivo del dia
            </p>
            <h2 className="text-balance text-3xl font-black tracking-tight text-cream sm:text-5xl">
              Almuerzo diario actualizado desde Google Sheets.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              El equipo de Terracielo puede cambiar entrada, fondo, acompanamiento, bebida,
              postre y precio sin tocar codigo ni hacer despliegues.
            </p>
            <a
              href={orderUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-neon-red px-6 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_32px_rgba(229,9,47,0.42)] transition hover:-translate-y-0.5 hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold"
            >
              Pedir por WhatsApp
            </a>
          </div>

          <article className="rounded-lg border border-white/12 bg-black/35 p-5 sm:p-6">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white/48">
                  {data?.date ? `Fecha Chile: ${data.date}` : "Fecha Chile"}
                </p>
                <h3 className="mt-2 text-2xl font-black text-cream">
                  {isLoading ? "Cargando menu..." : menu ? "Disponible hoy" : fallbackMessage}
                </h3>
              </div>
              {menu?.precio ? (
                <div className="rounded-lg bg-soft-gold px-5 py-4 text-center text-black">
                  <p className="text-xs font-black uppercase tracking-[0.2em]">Precio</p>
                  <p className="mt-1 text-2xl font-black">{menu.precio}</p>
                </div>
              ) : null}
            </div>

            {isLoading ? (
              <div className="mt-6 grid gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-16 animate-pulse rounded-lg bg-white/8" />
                ))}
              </div>
            ) : menu ? (
              <div className="mt-6 grid gap-3">
                {menuItems.map((item) => (
                  <div key={item.key} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-soft-gold/35 bg-soft-gold/10 text-xs font-black text-soft-gold">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">{item.label}</p>
                      <p className="mt-1 font-semibold leading-7 text-cream">{menu[item.key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-neon-red/25 bg-neon-red/10 p-5">
                <p className="font-bold text-cream">{fallbackMessage}</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  {hasError
                    ? "No pudimos leer la planilla en este momento. El boton de WhatsApp queda disponible como respaldo."
                    : "Aun no hay menu marcado como disponible para la fecha actual."}
                </p>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
