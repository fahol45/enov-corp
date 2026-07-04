"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/auth-browser";

export default function AuthConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    // Hash-based tokens (implicit flow — server-generated links)
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    // PKCE flow (code in query params — browser-initiated flows)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(() => router.replace("/mon-espace"));
    } else if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(() => router.replace("/mon-espace"));
    } else {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-slate-400 text-sm">Connexion en cours…</p>
    </main>
  );
}
