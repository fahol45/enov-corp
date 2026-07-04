"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";

const NAV_LINKS = [
  { href: "/academy",    label: "Formations" },
  { href: "/mon-espace", label: "Mon espace", authOnly: true },
];

export function AcademyNav() {
  const [userName,    setUserName]    = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef       = useRef<HTMLElement>(null);

  /* ── Auth sync ── */
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const sync = (u: { email?: string; user_metadata?: { first_name?: string } } | null) => {
      if (u) {
        const name = u.user_metadata?.first_name ?? u.email?.split("@")[0] ?? "Moi";
        setUserName(name);
        setUserInitial(name[0]?.toUpperCase() ?? "?");
      } else { setUserName(null); setUserInitial(null); }
    };
    supabase.auth.getUser().then(({ data }) => sync(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => sync(s?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Animated active indicator ── */
  useEffect(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;
    if (!nav || !ind) return;
    const active = nav.querySelector<HTMLElement>("[data-active='true']");
    if (active) {
      const navRect  = nav.getBoundingClientRect();
      const linkRect = active.getBoundingClientRect();
      ind.style.width   = `${linkRect.width}px`;
      ind.style.left    = `${linkRect.left - navRect.left}px`;
      ind.style.opacity = "1";
    } else {
      ind.style.opacity = "0";
    }
  }, [pathname, userName]);

  const handleLogout = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/academy");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/academy"
      ? pathname === "/academy" || pathname?.startsWith("/academy/")
      : pathname === href || pathname?.startsWith(href + "/");

  const visibleLinks = NAV_LINKS.filter(l => !l.authOnly || userName);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[#080810]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        : "bg-[#080810]/80 backdrop-blur-md border-b border-transparent"
    }`}>
      <div className="app-shell flex h-14 items-center gap-6">

        {/* Logo */}
        <Link href="/academy" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-fuchsia-600 to-violet-700 flex items-center justify-center shadow-[0_0_16px_rgba(192,38,211,0.3)] group-hover:shadow-[0_0_24px_rgba(192,38,211,0.45)] transition-shadow">
            <span className="text-[10px] font-black text-white tracking-tight">EA</span>
          </div>
          <span className="font-black text-sm tracking-tight text-white hidden sm:block">
            ENOV <span className="text-fuchsia-400">Academy</span>
          </span>
        </Link>

        {/* Nav center with animated indicator */}
        <nav ref={navRef} className="hidden md:flex flex-1 items-center gap-1 relative">
          {/* Sliding underline indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-fuchsia-500 rounded-full transition-all duration-300 ease-out pointer-events-none"
            style={{ opacity: 0 }}
          />
          {visibleLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                className={`relative px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-widest transition-colors duration-200 rounded-lg ${
                  active
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <Link href="/" className="hidden md:flex items-center gap-1 text-[0.64rem] text-slate-600 hover:text-slate-400 transition">
            ← Site principal
          </Link>

          {userName ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="inline-flex items-center gap-2 border border-white/10 hover:border-fuchsia-500/40 bg-white/[0.03] hover:bg-white/[0.06] rounded-full pl-1.5 pr-3 py-1 transition-all duration-200"
              >
                <span className="w-6 h-6 rounded-full bg-linear-to-br from-fuchsia-600 to-violet-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {userInitial}
                </span>
                <span className="text-[0.7rem] font-semibold text-white hidden sm:block">{userName}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-500">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-2xl border border-white/[0.08] bg-[#0e0e1c] shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <p className="text-xs font-bold text-white">{userName}</p>
                      <p className="text-[0.62rem] text-slate-600 mt-0.5">Apprenant Enov Academy</p>
                    </div>
                    <Link href="/mon-espace"  onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] transition">Mon espace</Link>
                    <Link href="/academy"     onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] transition">Formations</Link>
                    <div className="border-t border-white/[0.06]" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/[0.07] transition text-left">
                      Déconnexion
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="text-[0.7rem] font-bold uppercase tracking-widest border border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/70 rounded-full px-4 py-1.5 transition-all">
              Se connecter
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden h-9 w-9 rounded-full border border-white/10 text-slate-400 flex items-center justify-center hover:border-white/20 hover:text-white transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#080810]/98 px-4 py-2 space-y-0.5">
          {visibleLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-3 py-2.5 text-sm transition ${isActive(l.href) ? "text-white bg-white/[0.05]" : "text-slate-400 hover:bg-white/[0.04]"}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/" onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-white/[0.04] transition">← Site principal</Link>
          {userName && (
            <button onClick={handleLogout} className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-red-400/80 hover:bg-red-500/[0.07] transition">
              Déconnexion
            </button>
          )}
        </div>
      )}
    </header>
  );
}
