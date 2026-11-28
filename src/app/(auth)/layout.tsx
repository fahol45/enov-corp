import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="brand-site auth-site min-h-screen flex flex-col"><Navbar /><div id="page-content" tabIndex={-1} className="flex-1">{children}</div><Footer /></div>;
}
