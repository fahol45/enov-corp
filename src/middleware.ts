import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const adminPublicPaths = ["/admin/login", "/api/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin auth ──────────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (adminPublicPaths.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }
    const sessionToken = process.env.ADMIN_SESSION_TOKEN;
    if (!sessionToken) {
      return new NextResponse("Admin session not configured.", { status: 500 });
    }
    const cookieToken = request.cookies.get("enov_admin_session")?.value ?? "";
    if (cookieToken !== sessionToken) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ ok: false, message: "Non autorise." }, { status: 401 });
      }
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ── Supabase user auth ───────────────────────────────────────────────────────
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (pathname.startsWith("/mon-espace") && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (user && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/mon-espace", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/mon-espace/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
