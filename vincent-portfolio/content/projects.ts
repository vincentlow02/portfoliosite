import { Project } from "@/types/project";

const projects: Project[] = [
  {
    slug: "weave-ai",
    name: "Weave AI",
    category: "Seminar exhibition project",
    summary:
      "Weave AI is a speculative concept for a 2045 seminar exhibition, exploring how AI agents could guide future travel discovery and decision-making.",
    description:
      "Weave AI is a speculative concept for a 2045 seminar exhibition, exploring how AI agents could guide future travel discovery and decision-making.",
    year: "2025",
    status: "completed",
    stack: ["Product Design", "Interaction Design", "Exhibition Design"],
    highlights: [
      "Defined the product concept and overall interaction direction.",
      "Balanced clarity, storytelling, and physical presentation constraints.",
      "Created a case study structure that can expand with deeper process notes later.",
    ],
  },
  {
    slug: "goevent",
    name: "GoEvent",
    category: "Product and interaction design case study",
    summary:
      "GoEvent is a concept mobile app that helps people discover and join nearby events whenever inspiration strikes.",
    description:
      "GoEvent is a concept mobile app focused on making nearby event discovery feel immediate, approachable, and easy to act on. The project explored how mobile interactions, interface clarity, and brand cues could work together to support spontaneous participation.",
    year: "2025",
    status: "completed",
    stack: ["Product Design", "UX Strategy", "Visual Design"],
    highlights: [
      "Mapped the user journey around browsing, choosing, and joining events.",
      "Reduced friction in key interactions through a tighter information hierarchy.",
      "Packaged the work as a concise portfolio-ready case study.",
    ],
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
