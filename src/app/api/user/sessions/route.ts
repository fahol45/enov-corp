import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: true, sessionIds: [] });
  }

  const { data } = await supabaseServer
    .from("enrollments")
    .select("session_id")
    .eq("user_id", user.id);

  const sessionIds = (data ?? []).map((e) => e.session_id as string);
  return NextResponse.json({ ok: true, sessionIds });
}
