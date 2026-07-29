import type { Metadata } from "next";
import { getRoutableProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { normalizeLocale } from "@/lib/site-locale";
import { WorkContent } from "./work-content";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: "Selected portfolio work by Vincent Low Sik Ching.",
  pathname: "/projects",
});

type ProjectsPageProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const locale = normalizeLocale(resolvedSearchParams.lang);
  const projects = getRoutableProjects();

  return (
    <WorkContent
      locale={locale}
      projects={projects}
    />
  );
}
