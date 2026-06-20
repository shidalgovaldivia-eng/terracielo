import { JWT } from "google-auth-library";
import { findMenuForDate, formatChileDate, normalizeMenuRows } from "@/lib/menu-del-dia";
import type { MenuDelDia } from "@/types/menu-del-dia";

const SHEETS_READONLY_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
const SHEET_RANGE = "A:H";

type SheetsValuesResponse = {
  values?: string[][];
};

function requiredEnv(name: "GOOGLE_SERVICE_ACCOUNT_EMAIL" | "GOOGLE_PRIVATE_KEY" | "GOOGLE_SHEET_ID") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function normalizePrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

function createSheetsAuthClient() {
  return new JWT({
    email: requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: normalizePrivateKey(requiredEnv("GOOGLE_PRIVATE_KEY")),
    scopes: [SHEETS_READONLY_SCOPE]
  });
}

export async function fetchMenuRowsFromGoogleSheets() {
  const sheetId = requiredEnv("GOOGLE_SHEET_ID");
  const authClient = createSheetsAuthClient();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    sheetId
  )}/values/${encodeURIComponent(SHEET_RANGE)}?majorDimension=ROWS`;

  const response = await authClient.fetch(url);
  const data = response.data as SheetsValuesResponse;

  return data.values ?? [];
}

export async function getMenuDelDiaFromGoogleSheets(date = formatChileDate()): Promise<MenuDelDia | null> {
  const rows = await fetchMenuRowsFromGoogleSheets();
  const menus = normalizeMenuRows(rows);

  return findMenuForDate(menus, date);
}
