import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type BuildMetadataInput = {
  title: string;
  description: string;
  pathname: string;
};

export function buildMetadata({
  title,
  description,
  pathname,
}: BuildMetadataInput): Metadata {
  const url = new URL(pathname, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: "/images/site/opengraph-bamboo.png",
          width: 1200,
          height: 630,
          alt: "Vincent Low portfolio with bamboo shadows",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/site/opengraph-bamboo.png"],
    },
  };
}
