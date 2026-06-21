import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/metadata";
import { AboutContent } from "./about-content";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "About Vincent Low Sik Ching, an Industrial Design student at Tokyo Zokei University.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <Suspense>
      <AboutContent />
    </Suspense>
  );
}
