"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";
import { AuthShell, authStyles as styles } from "@/components/AuthShell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const { error } = await createSupabaseBrowserClient().auth.signInWithPassword({ email, password });
      if (error) { setError("Email ou mot de passe incorrect."); return; }
      router.push("/mon-espace"); router.refresh();
    } catch { setError("La connexion a échoué. Veuillez réessayer."); } finally { setLoading(false); }
  }
  return <AuthShell title="Bienvenue dans votre espace." description="Connectez-vous pour retrouver vos formations et vos sessions."><form onSubmit={handleSubmit} className={styles.form}>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <label htmlFor="login-email">Adresse email<input id="login-email" type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} required placeholder="vous@exemple.com" /></label>
    <label htmlFor="login-password">Mot de passe<input id="login-password" type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></label>
    <button type="submit" disabled={loading} className={styles.submit}>{loading ? "Connexion en cours…" : "Se connecter"}</button>
    <p className={styles.formLinks}>Pas encore de compte ? <Link href="/auth/register">Créer un compte</Link></p>
  </form></AuthShell>;
}
