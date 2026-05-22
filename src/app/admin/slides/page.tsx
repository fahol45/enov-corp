import type { Metadata } from "next";
import { SlidesAdmin } from "@/components/admin/SlidesAdmin";

export const metadata: Metadata = { title: "Admin Slides", description: "Gestion du carousel d'accueil Enov CORP." };

export default function AdminSlidesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>
      <div className="app-shell section-flow relative">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 sm:p-10">
          <div className="space-y-2">
            <p className="kicker text-slate-400">ENOV CORP ADMIN</p>
            <h1 className="text-4xl font-bold">Slides d'accueil</h1>
            <p className="text-slate-300">Gérez les images du carousel animé sur la page d'accueil.</p>
          </div>
        </section>
        <SlidesAdmin />
      </div>
    </main>
  );
}
