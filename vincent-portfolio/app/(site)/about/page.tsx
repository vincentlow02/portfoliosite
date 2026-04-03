import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Placeholder about page for personal profile content.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <PageIntro
      title="About"
      description="Use this page for your biography, background, experience, or values."
    >
      <div className="rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
        Placeholder content. Replace this with your own structured narrative later.
      </div>
    </PageIntro>
  );
}
