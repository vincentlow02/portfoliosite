import { Project } from "@/types/project";

const projects: Project[] = [
  {
    slug: "project-alpha",
    name: "Project Alpha",
    summary: "Placeholder summary for a featured portfolio case study.",
    description:
      "Use this entry to describe the problem, process, decisions, and outcomes for a real project.",
    year: "2026",
    status: "planned",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Typed content source for index and detail pages.",
      "Static route generation through the App Router.",
      "Neutral placeholders you can restyle later.",
    ],
  },
  {
    slug: "project-beta",
    name: "Project Beta",
    summary: "Placeholder summary for a work sample with a different narrative.",
    description:
      "This starter keeps the project contract stable so content, components, and design can evolve independently.",
    year: "2025",
    status: "in-progress",
    stack: ["React", "Node.js", "PostgreSQL"],
    highlights: [
      "Reusable card and detail page scaffolding.",
      "Route-aware metadata generation.",
      "Separation between content, route logic, and components.",
    ],
  },
  {
    slug: "project-gamma",
    name: "Project Gamma",
    summary: "Placeholder summary for another case study or experiment.",
    description:
      "Store your portfolio entries here first, then replace the layout and styling when you are ready to design the site.",
    year: "2024",
    status: "completed",
    stack: ["Figma", "Next.js", "Vercel"],
    highlights: [
      "Simple data model that is easy to expand.",
      "Supports list and detail views from the same source.",
      "Keeps UI decisions deferred until later.",
    ],
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
