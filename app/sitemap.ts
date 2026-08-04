import type { MetadataRoute } from "next";
import { getRoutableProjects } from "@/content/projects";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/atmosphere", "/projects"];
  const projectPages = getRoutableProjects().map(
    (project) => `/projects/${project.slug}`,
  );

  return [...pages, ...projectPages].map((pathname) => ({
    url: `${siteConfig.url}${pathname}`,
    lastModified: new Date(),
  }));
}
