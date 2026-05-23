import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("portfolio_items")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, items: [] });
  }
  return NextResponse.json({ ok: true, items: data ?? [] });
}
