import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/admin/login", "/api/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionToken = process.env.ADMIN_SESSION_TOKEN;
  if (!sessionToken) {
    return new NextResponse("Admin session not configured.", { status: 500 });
  }

  const cookieToken = request.cookies.get("enov_admin_session")?.value ?? "";
  if (cookieToken !== sessionToken) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { ok: false, message: "Non autorise." },
        { status: 401 }
      );
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
