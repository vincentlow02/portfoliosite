import type { Metadata } from "next";
import { CozyWindowShade } from "@/components/home/cozy-window-shade";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Atmosphere",
  description:
    "An atmospheric mode with shade, sunny, and rain scenes plus ambient sound.",
  pathname: "/atmosphere",
});

export default function AtmospherePage() {
  return <CozyWindowShade />;
}
