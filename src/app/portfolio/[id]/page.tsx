import { PortfolioDetailView } from "./PortfolioDetailView";

type Props = { params: Promise<{ id: string }> };

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;
  return <PortfolioDetailView id={id} />;
}
