import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { normalizeLocale } from "@/lib/site-locale";
import { AboutContent } from "./about-content";

export const metadata: Metadata = buildMetadata({
  title: "Notes",
  description: "Selected writing and notes by Vincent Low Sik Ching.",
  pathname: "/about",
});

type AboutPageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const params = await searchParams;
  return <AboutContent locale={normalizeLocale(params.lang)} />;
}
