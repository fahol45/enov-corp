import type { Metadata } from "next";
import { AdminTabs } from "@/components/admin/AdminTabs";

export const metadata: Metadata = {
  title: "Admin — Enov CORP",
  description: "Interface administration Enov CORP.",
  alternates: { canonical: "/admin/academy" },
};

export default function AdminAcademyPage() {
  return <AdminTabs />;
}
