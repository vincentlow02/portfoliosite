import type { Metadata } from "next";
import { CozyWindowShade } from "@/components/home/cozy-window-shade";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Vincent Low Sik Ching",
  description:
    "Product designer based in Japan. Focused on creating clear, intuitive experiences for everyday life.",
  pathname: "/",
});

export default function HomePage() {
  return <CozyWindowShade />;
}
