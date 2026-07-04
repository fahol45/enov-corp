"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { TrainingStatus } from "@/lib/trainings";

type Props = {
  title: string;
  price: string;
  status: TrainingStatus;
  isEnrolled: boolean;
  userLoggedIn: boolean;
  hasSessions: boolean;
  slug: string;
};

export function StickyHeader({ title, price, status, isEnrolled, userLoggedIn, hasSessions, slug }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("course-hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  if (!visible) return null;

  const ctaHref = isEnrolled
    ? "/mon-espace"
    : userLoggedIn && hasSessions
    ? "#sessions"
    : status === "available"
    ? userLoggedIn ? "#sessions" : "#inscription"
    : status === "soon"
    ? "#notification"
    : "/contact";

  const ctaLabel = isEnrolled
    ? "✓ Accéder à ma session"
    : status === "available"
    ? "S'inscrire maintenant"
    : status === "soon"
    ? "Être notifié"
    : "Contacter l'équipe";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#080d14]/95 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_4px_40px_rgba(0,0,0,0.6)] animate-in slide-in-from-top-2 duration-200">
      <div className="app-shell flex items-center gap-4 py-3">
        <p className="flex-1 text-sm font-bold text-white line-clamp-1 min-w-0">{title}</p>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm font-black text-white hidden sm:block">{price}</span>
          <Link
            href={ctaHref}
            className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold px-5 py-2 rounded-xl transition shadow-[0_0_20px_rgba(192,38,211,0.3)]"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/academy"
            className="text-slate-500 hover:text-white text-xs transition hidden sm:block"
          >
            ← Retour
          </Link>
        </div>
      </div>
    </div>
  );
}
