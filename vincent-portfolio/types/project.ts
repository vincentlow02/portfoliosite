export type ProjectStatus = "planned" | "in-progress" | "completed";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  year: string;
  status: ProjectStatus;
  stack: string[];
  highlights: string[];
};
