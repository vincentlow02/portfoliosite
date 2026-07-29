import type { Metadata } from "next";
import { CozyWindowShade } from "@/components/home/cozy-window-shade";
import { buildMetadata } from "@/lib/metadata";
import { normalizeLocale } from "@/lib/site-locale";

export const metadata: Metadata = buildMetadata({
  title: "Vincent Low Sik Ching",
  description:
    "Product designer based in Japan. Focused on creating clear, intuitive experiences for everyday life.",
  pathname: "/",
});

type HomePageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  return (
    <CozyWindowShade
      variant="home"
      initialLocale={normalizeLocale(params.lang)}
    />
  );
}
