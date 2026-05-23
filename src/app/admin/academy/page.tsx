import type { Metadata } from "next";
import Link from "next/link";
import { AdminTabs } from "@/components/admin/AdminTabs";

export const metadata: Metadata = {
  title: "Admin — Enov CORP",
  description: "Interface administration Enov CORP.",
  alternates: { canonical: "/admin/academy" },
};

export default function AdminAcademyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {/* Ambient blobs — fixed so they don't scroll */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/12 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/12 blur-[130px]" />
      </div>

      {/* Sticky top bar */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-linear-to-r from-fuchsia-500 to-sky-500 px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.2em] text-white">
              Admin
            </span>
            <span className="text-sm font-bold tracking-tight text-white">Enov CORP</span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-500 transition hover:text-white"
          >
            ← Voir le site
          </Link>
        </div>
      </header>

      <div className="app-shell section-flow">
        <div className="pt-2">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Tableau de bord</h1>
          <p className="mt-1 text-sm text-slate-500">
            Formations · Portfolio · Slides d&apos;accueil
          </p>
        </div>
        <AdminTabs />
      </div>
    </div>
  );
}
