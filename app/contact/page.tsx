import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/metadata";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = buildMetadata({
  title: "Connect",
  description: "How to get in touch with Vincent Low Sik Ching.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
