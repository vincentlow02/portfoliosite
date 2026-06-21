import type { Metadata } from "next";
import { getProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { normalizeLocale, type Locale as SiteLocale } from "@/lib/site-locale";
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

const projectsPageCopy: Record<
  SiteLocale,
  {
    title: string;
    avatarAlt: string;
  }
> = {
  en: {
    title: "Work",
    avatarAlt: "Portrait of Vincent Low Sik Ching",
  },
  zh: {
    title: "项目",
    avatarAlt: "Vincent Low Sik Ching 的头像",
  },
  ja: {
    title: "制作",
    avatarAlt: "Vincent Low Sik Ching のポートレート",
  },
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const locale = normalizeLocale(resolvedSearchParams.lang);
  const copy = projectsPageCopy[locale];
  const projects = getProjects();

  return (
    <WorkContent
      locale={locale}
      title={copy.title}
      avatarAlt={copy.avatarAlt}
      projects={projects}
    />
  );
}
