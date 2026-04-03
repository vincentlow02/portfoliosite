import type { Metadata } from "next";
import { CozyWindowShade } from "@/components/home/cozy-window-shade";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Cozy Window Shade",
  description: "A quiet homepage with a soft animated palm-shadow light study.",
  pathname: "/",
});

export default function HomePage() {
  return <CozyWindowShade />;
}
