import type { Metadata } from "next";
import { Suspense } from "react";
import { HomeView } from "./HomeView";
import { HomeWork } from "./HomeWork";
import { defaultTitle, defaultDescription } from "@/lib/seo";
import { getPortfolio } from "@/lib/portfolio";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: { absolute: defaultTitle }, description: defaultDescription, alternates: { canonical: "/" } };
async function HomeReference(){const {items}=await getPortfolio();const reference=items.find(item=>item.client_name&&(item.description||item.results));return <HomeWork reference={reference}/>;}
export default function HomePage(){return <HomeView work={<Suspense fallback={<HomeWork/>}><HomeReference/></Suspense>}/>;}
