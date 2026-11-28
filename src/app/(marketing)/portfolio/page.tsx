import { pageMetadata } from "@/lib/seo";
import { PortfolioView } from "./PortfolioView";
import { getPortfolio } from "@/lib/portfolio";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata("Solutions & réalisations", "Références clients, exemples de solutions et programmes de formation ENOV CORP, présentés selon leur nature.", "/portfolio");
export default async function PortfolioPage() { const result = await getPortfolio(); return <PortfolioView {...result} />; }
