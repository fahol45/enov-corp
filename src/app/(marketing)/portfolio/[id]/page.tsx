import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioDetailView } from "./PortfolioDetailView";
import { getPortfolio } from "@/lib/portfolio";
import { PageHero } from "@/components/SiteSections";
type Props={params:Promise<{id:string}>};
export const dynamic="force-dynamic";
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const {items}=await getPortfolio();const item=items.find(item=>item.id===id);return {title:item?.title??"Fiche indisponible",description:item?.description||"Publication ENOV CORP : contexte, domaines et informations disponibles.",alternates:{canonical:`/portfolio/${id}`},...(!item?{robots:{index:false,follow:true}}:{})};}
export default async function Page({params}:Props){const {id}=await params;const {items,available}=await getPortfolio();if(!available)return <main id="main-content"><PageHero eyebrow="SOLUTIONS & RÉALISATIONS" title="Fiche indisponible." description="Les publications ne sont pas accessibles pour le moment." action={{href:"/portfolio",label:"Retour aux publications"}}/></main>;const item=items.find(item=>item.id===id);if(!item)notFound();return <PortfolioDetailView item={item}/>;}
