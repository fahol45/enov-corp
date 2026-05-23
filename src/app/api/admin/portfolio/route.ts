import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: "hydro" | "web" | "training";
  tags: string;
  external_url: string;
  sort_order: number;
  active: boolean;
};

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ ok: true, items: data ?? [] });
  } catch {
    return NextResponse.json({ ok: true, items: [] });
  }
}

export async function POST(request: NextRequest) {
  let body: Partial<PortfolioItem>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide." }, { status: 400 });
  }

  if (!body.title?.trim()) {
    return NextResponse.json({ ok: false, message: "title requis." }, { status: 400 });
  }

  const { data, error } = await supabaseServer.from("portfolio_items").insert({
    title: body.title.trim(),
    description: body.description?.trim() ?? "",
    image_url: body.image_url?.trim() ?? "",
    category: body.category ?? "web",
    tags: body.tags?.trim() ?? "",
    external_url: body.external_url?.trim() ?? "",
    sort_order: body.sort_order ?? 0,
    active: body.active !== false,
  }).select().single();

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, item: data });
}

export async function PATCH(request: NextRequest) {
  let body: Partial<PortfolioItem> & { id: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide." }, { status: 400 });
  }

  if (!body.id) return NextResponse.json({ ok: false, message: "id requis." }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (body.title !== undefined) updates.title = body.title;
  if (body.description !== undefined) updates.description = body.description;
  if (body.image_url !== undefined) updates.image_url = body.image_url;
  if (body.category !== undefined) updates.category = body.category;
  if (body.tags !== undefined) updates.tags = body.tags;
  if (body.external_url !== undefined) updates.external_url = body.external_url;
  if (body.sort_order !== undefined) updates.sort_order = body.sort_order;
  if (body.active !== undefined) updates.active = body.active;

  const { error } = await supabaseServer.from("portfolio_items").update(updates).eq("id", body.id);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, message: "id requis." }, { status: 400 });

  // Fetch image_url before deleting so we can remove from storage
  const { data: row } = await supabaseServer.from("portfolio_items").select("image_url").eq("id", id).single();

  const { error } = await supabaseServer.from("portfolio_items").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  // Delete file from Supabase Storage if it belongs to our bucket
  if (row?.image_url) {
    const match = row.image_url.split("/academy-media/")[1];
    if (match) await supabaseServer.storage.from("academy-media").remove([match]);
  }

  return NextResponse.json({ ok: true });
}
