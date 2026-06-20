import { NextResponse } from "next/server";
import { getDemoMenuDelDia } from "@/data/menu-demo";
import { formatChileDate } from "@/lib/menu-del-dia";
import { getMenuDelDiaFromGoogleSheets } from "@/lib/google-sheets-menu";
import type { MenuDelDia, MenuDelDiaResponse } from "@/types/menu-del-dia";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 300;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60"
};

function fallbackResponse(date: string, message: string, status = 200) {
  const payload: MenuDelDiaResponse = {
    ok: status < 400,
    date,
    source: "fallback",
    menu: null,
    message
  };

  return NextResponse.json(payload, { status, headers: CACHE_HEADERS });
}

function isMissingGoogleConfig(error: unknown) {
  return error instanceof Error && error.message.startsWith("Missing required environment variable:");
}

function hasGoogleSheetsConfig() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID
  );
}

function menuResponse(date: string, menu: MenuDelDia, source: MenuDelDiaResponse["source"]) {
  const payload: MenuDelDiaResponse = {
    ok: true,
    date,
    source,
    menu,
    message: source === "demo" ? "Menu ejecutivo demo disponible" : "Menu ejecutivo disponible"
  };

  return NextResponse.json(payload, { headers: CACHE_HEADERS });
}

export async function GET() {
  const chileDate = formatChileDate();

  try {
    if (!hasGoogleSheetsConfig()) {
      return menuResponse(chileDate, getDemoMenuDelDia(), "demo");
    }

    const menu = await getMenuDelDiaFromGoogleSheets(chileDate);

    if (!menu) {
      return fallbackResponse(chileDate, "Consulta el menu ejecutivo de hoy por WhatsApp");
    }

    return menuResponse(chileDate, menu, "google_sheets");
  } catch (error) {
    if (!isMissingGoogleConfig(error)) {
      console.error("Failed to load menu del dia", error);
    }

    return fallbackResponse(chileDate, "Consulta el menu ejecutivo de hoy por WhatsApp", 200);
  }
}
