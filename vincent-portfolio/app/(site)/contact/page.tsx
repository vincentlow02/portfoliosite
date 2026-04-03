import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/page-intro";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Placeholder contact page for future outreach details.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <PageIntro
      title="Contact"
      description="Keep this route for your future contact form, social links, or booking details."
    >
      <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-muted p-4">
          <p className="font-medium text-foreground">Email</p>
          <p>your-email@example.com</p>
        </div>
        <div className="rounded-lg border border-border bg-muted p-4">
          <p className="font-medium text-foreground">Location</p>
          <p>City, Country</p>
        </div>
      </div>
    </PageIntro>
  );
}
