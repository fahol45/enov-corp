import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("portfolio_items")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true }).abortSignal(AbortSignal.timeout(8000));

  if (error) {
    return NextResponse.json({ ok: false, items: [] }, { status: 503 });
  }
  return NextResponse.json({ ok: true, items: data ?? [] });
}
