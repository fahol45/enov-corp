"use client";

import Link from "next/link";
import { learnerReturnPath } from "@/lib/auth-redirect";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";
import { AuthShell, authStyles as styles } from "@/components/AuthShell";

export default function RegisterPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("/mon-espace");
  useEffect(() => { setDestination(learnerReturnPath(new URLSearchParams(window.location.search).get("next"))); }, []);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const [emailSent, setEmailSent] = useState(false);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const { data, error } = await createSupabaseBrowserClient().auth.signUp({ email: form.email, password: form.password, options: { emailRedirectTo: window.location.origin + "/auth/confirm?next=" + encodeURIComponent(learnerReturnPath(new URLSearchParams(window.location.search).get("next"))), data: { first_name: form.firstName, last_name: form.lastName } } });
      if (error) {
        const known: Record<string, string> = { "User already registered": "Cette adresse email est déjà utilisée. Connectez-vous ou utilisez une autre adresse.", "Email rate limit exceeded": "Trop de tentatives. Réessayez dans quelques minutes.", "Password should be at least 6 characters": "Le mot de passe doit comporter au moins 6 caractères." };
        setError(known[error.message] ?? error.message); return;
      }
      if (!data.session) { setEmailSent(true); return; }
      router.push(learnerReturnPath(new URLSearchParams(window.location.search).get("next"))); router.refresh();
    } catch { setError("La création du compte a échoué. Veuillez réessayer."); } finally { setLoading(false); }
  }
  const set = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, [field]: event.target.value }));
  return <AuthShell title="Créer votre compte." description="Accédez aux sessions ENOV Academy.">{emailSent ? <div className={styles.success} role="status"><h2>Confirmez votre adresse email.</h2><p>Un lien de confirmation a été envoyé à <strong>{form.email}</strong>. Ouvrez ce lien pour activer votre compte.</p><Link href={"/auth/login?next=" + encodeURIComponent(destination)}>Retour à la connexion →</Link></div> : <form onSubmit={handleSubmit} className={styles.form}>
    {error && <p role="alert" className={styles.error}>{error}</p>}
    <div className={styles.nameFields}><label htmlFor="register-first">Prénom<input id="register-first" autoComplete="given-name" value={form.firstName} onChange={set("firstName")} required /></label><label htmlFor="register-last">Nom<input id="register-last" autoComplete="family-name" value={form.lastName} onChange={set("lastName")} required /></label></div>
    <label htmlFor="register-email">Adresse email<input id="register-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} required placeholder="vous@exemple.com" /></label>
    <label htmlFor="register-password">Mot de passe<input id="register-password" type="password" autoComplete="new-password" value={form.password} onChange={set("password")} required minLength={6} aria-describedby="password-help" /></label><p id="password-help" className={styles.formLinks}>6 caractères minimum.</p>
    <button type="submit" disabled={loading} className={styles.submit}>{loading ? "Création en cours…" : "Créer mon compte"}</button>
    <p className={styles.formLinks}>Déjà inscrit ? <Link href={"/auth/login?next=" + encodeURIComponent(destination)}>Se connecter</Link></p>
  </form>}</AuthShell>;
}
