import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/SiteSections";

export default function NotFound() {
  return <div className="brand-site"><Navbar /><main id="page-content" tabIndex={-1}><PageHero eyebrow="404 / ENOV CORP" title="Cette page est introuvable." description="Son adresse a peut-être changé. Retrouvez nos expertises et nos formations depuis la page d’accueil." action={{ href: "/", label: "Retour à l’accueil" }} secondary={{ href: "/academy", label: "Explorer Academy" }} /></main><Footer /></div>;
}
