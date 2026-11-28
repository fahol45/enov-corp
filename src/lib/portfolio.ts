import { cache } from "react";
import { supabaseServer } from "@/lib/supabase/server";

export type PortfolioItem = {
  id: string; title: string; description: string; image_url: string;
  category: "hydro" | "web" | "training"; tags: string; external_url: string;
  duration: string; year: string; client_name: string; results: string;
};
export type PortfolioResult = { items: PortfolioItem[]; available: boolean };
const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
export function normalizePortfolio(row: Record<string, unknown>): PortfolioItem {
  return { id: text(row.id), title: text(row.title), description: text(row.description), image_url: text(row.image_url), category: row.category === "hydro" || row.category === "training" ? row.category : "web", tags: text(row.tags), external_url: text(row.external_url), duration: text(row.duration), year: text(row.year), client_name: text(row.client_name), results: text(row.results) };
}
export const getPortfolio = cache(async (): Promise<PortfolioResult> => {
  try {
    const { data, error } = await supabaseServer.from("portfolio_items").select("*").eq("active", true).order("sort_order", { ascending: true }).abortSignal(AbortSignal.timeout(8000));
    return error ? { items: [], available: false } : { items: (data ?? []).map(normalizePortfolio).filter(item => item.id && item.title), available: true };
  } catch { return { items: [], available: false }; }
});
export function portfolioKind(item: PortfolioItem): "client" | "training" | "example" {
  if (item.category === "training") return "training";
  return item.client_name ? "client" : "example";
}
export const getPortfolioItem = cache(async (id: string): Promise<PortfolioItem | null> => {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  try {
    const { data, error } = await supabaseServer.from("portfolio_items").select("*").eq("id", id).eq("active", true).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
    return error || !data ? null : normalizePortfolio(data);
  } catch { return null; }
});
