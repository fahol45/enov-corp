import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { PageHero } from "@/components/SiteSections";

export const metadata: Metadata = { title: "Administration — Connexion", robots: { index: false, follow: false } };
export default function AdminLoginPage() {
  return <main><PageHero eyebrow="ADMINISTRATION / ENOV CORP" title="Gestion du site." description="Connectez-vous avec votre compte administrateur pour gérer les contenus et les sessions." secondary={{ href: "/", label: "Retour au site" }} /><section className="app-shell admin-login-panel"><h2>Accès administrateur</h2><AdminLoginForm /></section></main>;
}
