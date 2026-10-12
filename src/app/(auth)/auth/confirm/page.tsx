"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";
import { AuthShell, authStyles as styles } from "@/components/AuthShell";
import Link from "next/link";

export default function AuthConfirmPage() {
  const router = useRouter(); const [error, setError] = useState("");
  const confirmation = useRef<Promise<{ error: { message: string } | null } | null> | null>(null);
  useEffect(() => {
    let active = true;
    if (!confirmation.current) {
      confirmation.current = (async () => {
        const client = createSupabaseBrowserClient(); const hash = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hash.get("access_token"); const refreshToken = hash.get("refresh_token"); const code = new URLSearchParams(window.location.search).get("code");
        return accessToken && refreshToken ? client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }) : code ? client.auth.exchangeCodeForSession(code) : null;
      })();
    }
    confirmation.current.then(result => {
      if (!active) return;
      if (!result) { router.replace("/auth/login"); return; }
      if (result.error) { setError("Ce lien n’a pas permis de confirmer votre compte. Il est peut-être expiré."); return; }
      window.history.replaceState(null, "", window.location.pathname); router.replace("/mon-espace");
    }).catch(() => { if (active) setError("La confirmation a échoué. Veuillez réessayer depuis votre email."); });
    return () => { active = false; };
  }, [router]);
  return <AuthShell title={error ? "Vérifions votre accès." : "Confirmation du compte."} description="Nous préparons l’accès à votre espace personnel."><div className={styles.success} role="status">{error ? <><p>{error}</p><Link href="/auth/login">Retour à la connexion →</Link></> : <p>Vérification en cours…</p>}</div></AuthShell>;
}
