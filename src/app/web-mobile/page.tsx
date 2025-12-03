import type { Metadata } from "next";
import { WebMobileView } from "./WebMobileView";

export const metadata: Metadata = {
  title: "ENOV CORP | Developpement Web & Mobile",
  description:
    "Applications mobiles et sites web multi-secteurs : finance, e-commerce, operations, service client, sante et logistique.",
};

export default function WebMobilePage() {
  return <WebMobileView />;
}
