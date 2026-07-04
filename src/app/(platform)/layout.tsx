import { AcademyNav } from "@/components/academy/AcademyNav";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <AcademyNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
