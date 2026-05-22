import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("hero_slides")
      .select("id, image_url, title, sort_order, active")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ ok: true, slides: data ?? [] });
  } catch {
    return NextResponse.json({ ok: true, slides: [] });
  }
}
