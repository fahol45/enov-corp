import { AcademyNav } from "@/components/academy/AcademyNav";
import { Footer } from "@/components/Footer";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="brand-site academy-site relative min-h-screen flex flex-col">
      <AcademyNav />
      <div className="relative flex-1">{children}</div>
      <Footer />
    </div>
  );
}
