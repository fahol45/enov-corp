import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export type HeroSlide = {
  id: string;
  image_url: string;
  title: string;
  sort_order: number;
  active: boolean;
};

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("hero_slides")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ ok: true, slides: data ?? [] });
  } catch {
    return NextResponse.json({ ok: true, slides: [] });
  }
}

export async function POST(request: NextRequest) {
  let body: Partial<HeroSlide>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide." }, { status: 400 });
  }

  if (!body.image_url?.trim()) {
    return NextResponse.json({ ok: false, message: "image_url requis." }, { status: 400 });
  }

  const { data, error } = await supabaseServer.from("hero_slides").insert({
    image_url: body.image_url.trim(),
    title: body.title?.trim() ?? "",
    sort_order: body.sort_order ?? 0,
    active: body.active !== false,
  }).select().single();

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, slide: data });
}

export async function PATCH(request: NextRequest) {
  let body: Partial<HeroSlide> & { id: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "JSON invalide." }, { status: 400 });
  }

  if (!body.id) return NextResponse.json({ ok: false, message: "id requis." }, { status: 400 });

  const { error } = await supabaseServer.from("hero_slides").update({
    ...(body.image_url !== undefined && { image_url: body.image_url }),
    ...(body.title !== undefined && { title: body.title }),
    ...(body.sort_order !== undefined && { sort_order: body.sort_order }),
    ...(body.active !== undefined && { active: body.active }),
  }).eq("id", body.id);

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, message: "id requis." }, { status: 400 });

  const { error } = await supabaseServer.from("hero_slides").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
