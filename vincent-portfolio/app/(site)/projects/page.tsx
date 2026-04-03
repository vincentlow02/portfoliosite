import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/project-list";
import { PageIntro } from "@/components/ui/page-intro";
import { getProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description: "Project index powered by a typed data source.",
  pathname: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        title="Projects"
        description="A simple list view backed by typed data. Replace cards and layout later without changing the route contract."
      />
      <ProjectList projects={getProjects()} />
    </div>
  );
}
