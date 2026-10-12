import { Navbar } from "@/components/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="brand-site"><Navbar /></div>
      {children}
    </div>
  );
}
