import { AcademyNav } from "@/components/academy/AcademyNav";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#080810] text-white flex flex-col">

      {/* ── Persistent animated aurora — GPU layers, never re-renders ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-20 w-[700px] h-[600px] rounded-full bg-violet-700/[0.07] blur-[140px]"
             style={{ animation: "aurora-1 28s ease-in-out infinite" }} />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[500px] rounded-full bg-fuchsia-700/[0.06] blur-[120px]"
             style={{ animation: "aurora-2 22s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-cyan-800/[0.04] blur-[100px]"
             style={{ animation: "aurora-3 34s ease-in-out infinite" }} />
      </div>

      <AcademyNav />
      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
}
