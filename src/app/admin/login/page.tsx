import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Connexion securisee Enov Admin.",
  alternates: {
    canonical: "/admin/login",
  },
};

export default function AdminLoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-[#ec008c]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#00a3ff]/25 blur-3xl" />
      </div>

      <div className="app-shell section-flow relative">
        <section className="mx-auto w-full max-w-lg space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.4)] sm:p-10">
          <div className="space-y-3 text-center">
            <p className="kicker text-slate-400">ENOV ADMIN</p>
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-sm text-slate-300 text-pretty">
              Entrez vos identifiants pour acceder a l'administration Enov
              Academy.
            </p>
          </div>
          <AdminLoginForm />
        </section>
      </div>
    </main>
  );
}
