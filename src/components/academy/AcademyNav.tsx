"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";

const links = [
  { href: "/hydroponie", label: "Hydroponie" }, { href: "/web-mobile", label: "Web & Mobile" },
  { href: "/academy", label: "Academy" }, { href: "/portfolio", label: "Portfolio" },
  { href: "/propos", label: "À propos" }, { href: "/contact", label: "Contact" },
];
export function AcademyNav() {
  const [name, setName] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const client = createSupabaseBrowserClient();
    const sync = (user: { email?: string; user_metadata?: { first_name?: string } } | null) => setName(user ? user.user_metadata?.first_name ?? user.email?.split("@")[0] ?? "Mon compte" : null);
    client.auth.getUser().then(({ data }) => sync(data.user));
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => sync(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);
  async function logout() {
    const { error } = await createSupabaseBrowserClient().auth.signOut();
    if (!error) { router.push("/academy"); router.refresh(); }
  }
  const navigation = links.map(link => <Link key={link.href} href={link.href} className="site-nav-link" aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}>{link.label}</Link>);
  return (
    <header className="site-header sticky top-0 z-50 w-full">
      <div className="app-shell site-header-row">
        <Link href="/" className="brand-logo flex shrink-0 items-center gap-2"><Image src="/icon-enov.png" alt="ENOV CORP" width={48} height={40} priority /><span><strong>ENOV</strong> CORP</span></Link>
        <nav className="site-desktop-nav" aria-label="Navigation principale">{navigation}</nav>
        <div className="site-header-tools">
          {name ? <details className="academy-account"><summary>{name} <span aria-hidden="true">⌄</span></summary><div><Link href="/mon-espace">Mon espace</Link><Link href="/profil">Mon profil</Link><button type="button" onClick={logout}>Déconnexion</button></div></details> : <Link href="/auth/login" className="academy-login">Se connecter <span aria-hidden="true">↗</span></Link>}
        </div>
      </div>
      <nav className="site-small-nav app-shell" aria-label="Navigation principale">{navigation}</nav>
    </header>
  );
}
