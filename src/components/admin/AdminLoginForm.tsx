"use client";

import { useState } from "react";

const inputClass =
  "rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-[#00a3ff]/60";

export function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        setError(payload?.message ?? "Connexion impossible.");
        return;
      }

      window.location.href = "/admin/academy";
    } catch {
      setError("Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Nom d'utilisateur
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={inputClass}
          autoComplete="username"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-slate-300">
        Mot de passe
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
          autoComplete="current-password"
        />
      </label>
      {error ? (
        <div className="rounded-2xl border border-[#ec008c]/40 bg-[#ec008c]/15 px-4 py-3 text-sm text-[#ffc2e6]">
          {error}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-full border px-4 py-3 text-sm font-semibold text-white transition ${
          loading
            ? "border-white/10 bg-white/5 text-slate-500"
            : "border-[#00a3ff]/60 bg-[#00a3ff]/15 hover:border-[#00a3ff]/80 hover:bg-[#00a3ff]/25"
        }`}
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
