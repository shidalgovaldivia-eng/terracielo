import { NextResponse } from "next/server";
import { formatChileDate } from "@/lib/menu-del-dia";
import { getMenuDelDiaFromGoogleSheets } from "@/lib/google-sheets-menu";
import type { MenuDelDiaResponse } from "@/types/menu-del-dia";

export const runtime = "nodejs";
export const revalidate = 300;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60"
};

function fallbackResponse(date: string, message: string, status = 200) {
  const payload: MenuDelDiaResponse = {
    ok: status < 400,
    date,
    menu: null,
    message
  };

  return NextResponse.json(payload, { status, headers: CACHE_HEADERS });
}

function isMissingGoogleConfig(error: unknown) {
  return error instanceof Error && error.message.startsWith("Missing required environment variable:");
}

export async function GET() {
  const chileDate = formatChileDate();

  try {
    const menu = await getMenuDelDiaFromGoogleSheets(chileDate);

    if (!menu) {
      return fallbackResponse(chileDate, "Consulta el menu ejecutivo de hoy por WhatsApp");
    }

    const payload: MenuDelDiaResponse = {
      ok: true,
      date: chileDate,
      menu,
      message: "Menu ejecutivo disponible"
    };

    return NextResponse.json(payload, { headers: CACHE_HEADERS });
  } catch (error) {
    if (!isMissingGoogleConfig(error)) {
      console.error("Failed to load menu del dia", error);
    }

    return fallbackResponse(chileDate, "Consulta el menu ejecutivo de hoy por WhatsApp", 200);
  }
}
