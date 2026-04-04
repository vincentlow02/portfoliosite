import { Project } from "@/types/project";

const projects: Project[] = [
  {
    slug: "weave-ai",
    name: "Weave AI",
    category: "Seminar exhibition project",
    summary:
      "An exhibition-led design project exploring how AI can support more thoughtful learning experiences.",
    description:
      "Weave AI was developed as a seminar exhibition project. The work focused on shaping a clear interaction concept, tightening the narrative of the experience, and presenting the system in a way that felt approachable in a physical showcase setting.",
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
      "A product design case study focused on simplifying event discovery, participation, and coordination.",
    description:
      "GoEvent explored how a digital product could make event planning and participation feel easier to understand and act on. The project centered on product structure, interaction flows, and clearer decision points across the experience.",
    year: "2024",
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
