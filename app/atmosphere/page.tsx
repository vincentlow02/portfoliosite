import type { Metadata } from "next";
import { CozyWindowShade } from "@/components/home/cozy-window-shade";
import { buildMetadata } from "@/lib/metadata";
import { normalizeLocale } from "@/lib/site-locale";

export const metadata: Metadata = buildMetadata({
  title: "Product Lab",
  description:
    "Exploring AI products through design, prototyping, and implementation.",
  pathname: "/atmosphere",
});

type AtmospherePageProps = {
  searchParams: Promise<{ lang?: string }>;
};

export default async function AtmospherePage({
  searchParams,
}: AtmospherePageProps) {
  const params = await searchParams;
  return (
    <CozyWindowShade
      variant="atmosphere"
      initialLocale={normalizeLocale(params.lang)}
    />
  );
}
