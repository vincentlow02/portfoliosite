import Link from "next/link";
import { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-border p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h2>
          <p className="text-sm text-muted-foreground">{project.summary}</p>
        </div>
        <span className="text-sm text-muted-foreground">{project.year}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
