"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  sessionId: string;
  trainingSlug: string;
};

export function EnrollButton({ sessionId, trainingSlug }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "full">("idle");
  const router = useRouter();

  const handleEnroll = async () => {
    setStatus("loading");
    try {
      const r = await fetch(`/api/sessions/${sessionId}/enroll`, { method: "POST" });
      if (r.status === 401) {
        window.location.href = `/auth/login?next=/session/${sessionId}`;
        return;
      }
      const d = await r.json() as { ok: boolean; message?: string };
      if (d.ok) {
        setStatus("done");
        setTimeout(() => router.refresh(), 1000);
      } else if (d.message?.toLowerCase().includes("complet")) {
        setStatus("full");
      } else {
        alert(d.message ?? "Erreur.");
        setStatus("idle");
      }
    } catch {
      alert("Erreur de connexion.");
      setStatus("idle");
    }
  };

  if (status === "done") {
    return (
      <div className="text-center space-y-2">
        <div className="text-2xl">✓</div>
        <p className="text-fuchsia-300 font-semibold text-sm">Inscription confirmée ! Redirection…</p>
      </div>
    );
  }

  if (status === "full") {
    return (
      <p className="text-center text-amber-400 text-sm font-semibold">Cette session est complète.</p>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleEnroll}
        disabled={status === "loading"}
        className="block w-full text-center bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl py-3 transition disabled:opacity-60"
      >
        {status === "loading" ? "Inscription en cours…" : "S'inscrire à cette session"}
      </button>
      <p className="text-xs text-slate-500 text-center">
        Tu devras être connecté pour t'inscrire.
      </p>
    </div>
  );
}
