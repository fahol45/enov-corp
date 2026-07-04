"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";

export function AcademyNav() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const sync = (u: { email?: string; user_metadata?: { first_name?: string } } | null) => {
      if (u) {
        const name = u.user_metadata?.first_name ?? u.email?.split("@")[0] ?? "Moi";
        setUserName(name);
        setUserInitial(name[0]?.toUpperCase() ?? "?");
      } else {
        setUserName(null);
        setUserInitial(null);
      }
    };
    supabase.auth.getUser().then(({ data }) => sync(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => sync(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/academy");
    router.refresh();
  };

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/95 backdrop-blur-md">
      <div className="app-shell flex h-14 items-center gap-6">

        {/* Logo Academy */}
        <Link href="/academy" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-600 to-violet-700 flex items-center justify-center">
            <span className="text-[10px] font-black text-white">EA</span>
          </div>
          <span className="font-black text-sm tracking-tight text-white hidden sm:block">
            ENOV <span className="text-fuchsia-400">Academy</span>
          </span>
        </Link>

        {/* Nav center */}
        <nav className="hidden md:flex flex-1 items-center gap-6">
          <Link
            href="/academy"
            className={`text-[0.7rem] font-semibold uppercase tracking-widest transition ${isActive("/academy") && pathname === "/academy" ? "text-white" : "text-slate-400 hover:text-white"}`}
          >
            Formations
          </Link>
          {userName && (
            <Link
              href="/mon-espace"
              className={`text-[0.7rem] font-semibold uppercase tracking-widest transition ${isActive("/mon-espace") ? "text-fuchsia-400" : "text-slate-400 hover:text-white"}`}
            >
              Mon espace
            </Link>
          )}
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/"
            className="hidden md:flex items-center gap-1 text-[0.65rem] text-slate-500 hover:text-slate-300 transition"
          >
            ← Site principal
          </Link>

          {userName ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="inline-flex items-center gap-2 border border-fuchsia-500/40 hover:bg-fuchsia-500/10 rounded-full pl-1.5 pr-3 py-1 transition"
              >
                <span className="w-6 h-6 rounded-full bg-fuchsia-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {userInitial}
                </span>
                <span className="text-[0.7rem] font-semibold text-fuchsia-400 hidden sm:block">{userName}</span>
                <span className="text-slate-500 text-xs">▾</span>
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-20 w-44 rounded-xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">
                    <Link
                      href="/mon-espace"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition"
                    >
                      Mon espace
                    </Link>
                    <Link
                      href="/academy"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition"
                    >
                      Formations
                    </Link>
                    <div className="border-t border-white/8" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition text-left"
                    >
                      Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-[0.7rem] font-semibold uppercase tracking-widest border border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-500/10 rounded-full px-4 py-1.5 transition"
            >
              Se connecter
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden h-9 w-9 rounded-full border border-white/10 text-white flex items-center justify-center hover:border-fuchsia-400"
          >
            <span className="text-xs">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/8 bg-slate-950/98 px-4 py-3 space-y-1">
          <Link href="/academy" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5">Formations</Link>
          {userName && <Link href="/mon-espace" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5">Mon espace</Link>}
          <Link href="/" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-white/5">← Site principal</Link>
          {userName && (
            <button onClick={handleLogout} className="w-full text-left rounded-lg px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10">
              Déconnexion
            </button>
          )}
        </div>
      )}
    </header>
  );
}
