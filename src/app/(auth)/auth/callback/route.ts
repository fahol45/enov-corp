import { createSupabaseServerClient } from "@/lib/supabase/auth-server";
import { learnerReturnPath } from "@/lib/auth-redirect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = learnerReturnPath(searchParams.get("next"));

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(new URL("/auth/login", origin));
  }

  return NextResponse.redirect(`${origin}${next}`);
}
