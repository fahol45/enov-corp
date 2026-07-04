"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage, type SupportedLanguage } from "@/context/LanguageContext";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";

const navLinks: { href: string; labels: Record<SupportedLanguage, string> }[] = [
  { href: "/hydroponie", labels: { fr: "Hydroponie", en: "Hydroponics" } },
  { href: "/web-mobile", labels: { fr: "Web & Mobile", en: "Web & Mobile" } },
  { href: "/academy", labels: { fr: "Academy", en: "Academy" } },
  { href: "/portfolio", labels: { fr: "Portfolio", en: "Portfolio" } },
  { href: "/propos", labels: { fr: "À propos", en: "About" } },
  { href: "/contact", labels: { fr: "Contact", en: "Contact" } },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userInitial, setUserInitial] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const syncUser = (u: { email?: string; user_metadata?: { first_name?: string } } | null) => {
      if (u) {
        const name = u.user_metadata?.first_name ?? u.email?.split("@")[0] ?? "Moi";
        setUserName(name);
        setUserInitial(name[0]?.toUpperCase() ?? "?");
      } else {
        setUserName(null);
        setUserInitial(null);
      }
    };
    supabase.auth.getUser().then(({ data }) => syncUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => syncUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const linkClasses = (href: string) =>
    `text-[0.7rem] font-semibold uppercase tracking-widest transition-colors duration-200 ${
      pathname === href ? "text-white" : "text-slate-400 hover:text-white"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/95 shadow-lg shadow-black/30"
          : "bg-slate-950/50"
      } backdrop-blur-md`}
    >
      <div className="app-shell flex h-14 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-enov.png"
            alt="Enov CORP"
            width={38}
            height={38}
            className="rounded-xl border border-white/10 bg-white/5 p-1.5 shadow-md shadow-fuchsia-500/10"
            priority
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.labels[language]}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {userName ? (
            <Link
              href="/mon-espace"
              className="hidden md:inline-flex items-center gap-2 border border-fuchsia-500/40 hover:bg-fuchsia-500/10 rounded-full pl-1.5 pr-4 py-1 transition"
            >
              <span className="w-6 h-6 rounded-full bg-fuchsia-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {userInitial}
              </span>
              <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-fuchsia-400">
                {userName}
              </span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden md:inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest border border-fuchsia-500/40 text-fuchsia-400 hover:bg-fuchsia-500/10 rounded-full px-4 py-1.5 transition"
            >
              Mon espace
            </Link>
          )}
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={language === "fr" ? "Menu principal" : "Main menu"}
            aria-expanded={menuOpen}
            className="relative h-9 w-9 rounded-full border border-white/10 text-white transition hover:border-fuchsia-400 hover:text-fuchsia-200 md:hidden"
          >
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`grid transition-all duration-200 ease-out md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        aria-hidden={!menuOpen}
      >
        <div className="overflow-hidden">
          <div className="border-b border-white/10 bg-slate-950/98 px-4 py-3">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/5 ${
                    pathname === link.href ? "text-white" : "text-slate-400"
                  }`}
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.labels[language]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
