import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Enov CORP",
  description: "Tableau de bord administration Enov CORP.",
};

export default function AdminDashboard() {
  redirect("/admin/academy");
}
