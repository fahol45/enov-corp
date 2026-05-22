import type { Metadata } from "next";
import { PortfolioAdmin } from "@/components/admin/PortfolioAdmin";

export const metadata: Metadata = { title: "Admin Portfolio", description: "Gestion des projets portfolio Enov CORP." };

export default function AdminPortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      </div>
      <div className="app-shell section-flow relative">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 sm:p-10">
          <div className="space-y-2">
            <p className="kicker text-slate-400">ENOV CORP ADMIN</p>
            <h1 className="text-4xl font-bold">Portfolio</h1>
            <p className="text-slate-300">Ajoutez, modifiez ou supprimez les projets affichés sur la page Portfolio.</p>
          </div>
        </section>
        <PortfolioAdmin />
      </div>
    </main>
  );
}
