import type { Metadata } from "next";
import { HydroponieView } from "./HydroponieView";

export const metadata: Metadata = {
  title: "ENOV CORP | Hydroponie x IoT & Edge",
  description:
    "Hydroponie intelligente augmentee par l'IoT et l'edge computing pour booster la production et economiser l'eau avec ENOV CORP.",
};

export default function HydroponiePage() {
  return <HydroponieView />;
}
