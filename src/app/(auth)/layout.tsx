import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="brand-site auth-site min-h-screen flex flex-col"><Navbar /><div className="flex-1">{children}</div><Footer /></div>;
}
