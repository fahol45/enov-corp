"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";
export function AcademyNav() {
  const [name, setName] = useState<string | null>(null); const router = useRouter();
  useEffect(() => { const client=createSupabaseBrowserClient(); const sync=(user:{email?:string;user_metadata?:{first_name?:string}}|null)=>setName(user ? user.user_metadata?.first_name ?? user.email?.split("@")[0] ?? "Mon compte" : null); client.auth.getUser().then(({data})=>sync(data.user)); const {data:{subscription}}=client.auth.onAuthStateChange((_event,session)=>sync(session?.user ?? null)); return ()=>subscription.unsubscribe(); },[]);
  async function logout() { const {error}=await createSupabaseBrowserClient().auth.signOut(); if(!error){router.push("/academy");router.refresh();} }
  const account=name ? <details className="academy-account"><summary>{name}</summary><div><Link href="/mon-espace">Mon espace</Link><Link href="/profil">Mon profil</Link><button type="button" onClick={logout}>Déconnexion</button></div></details> : <Link href="/auth/login">Se connecter</Link>;
  return <Navbar account={account} />;
}
