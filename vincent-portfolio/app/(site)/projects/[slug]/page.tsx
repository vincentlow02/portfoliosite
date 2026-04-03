import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project",
      description: "Project detail page.",
      pathname: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: project.name,
    description: project.summary,
    pathname: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="rounded-full border border-border px-3 py-1">
            {project.year}
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            {project.status}
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
          <p className="max-w-3xl text-base text-muted-foreground">
            {project.summary}
          </p>
        </div>
      </header>

      <section className="rounded-lg border border-border bg-muted p-6">
        <h2 className="text-lg font-semibold">Overview</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          {project.description}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold">Highlights</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="border-l border-border pl-4">
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </article>
  );
}
