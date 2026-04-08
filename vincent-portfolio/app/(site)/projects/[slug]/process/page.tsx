import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/content/projects";
import { GoEventProcessContent } from "../goevent-process-content";

type GoEventProcessPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function GoEventProcessPage({
  params,
  searchParams,
}: GoEventProcessPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const project = getProjectBySlug(slug);

  if (!project || project.slug !== "goevent") {
    notFound();
  }

  return (
    <GoEventProcessContent
      project={project}
      initialLocale={resolvedSearchParams.lang}
    />
  );
}
