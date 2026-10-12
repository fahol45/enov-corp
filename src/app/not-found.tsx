import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/SiteSections";

export default function NotFound() {
  return <div className="brand-site"><Navbar /><main><PageHero eyebrow="404 / ENOV CORP" title="Cette page est introuvable." description="Son adresse a peut-être changé. Retrouvez nos solutions et nos formations depuis la page d’accueil." action={{ href: "/", label: "Retour à l’accueil" }} secondary={{ href: "/academy", label: "Explorer Academy" }} /></main><Footer /></div>;
}
